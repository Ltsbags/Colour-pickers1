'use client';

import React, { useEffect, useRef, useSyncExternalStore, Component, ErrorInfo, ReactNode } from 'react';
import { ADSENSE_ENABLED, ADSENSE_CLIENT_ID } from '@/lib/adsense-config';

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/**
 * Error boundary specifically for third-party AdSense units
 * Prevents ad network script errors from crashing the page
 */
interface AdErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface AdErrorBoundaryState {
  hasError: boolean;
}

class AdErrorBoundary extends Component<AdErrorBoundaryProps, AdErrorBoundaryState> {
  constructor(props: AdErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): AdErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('AdSense boundary handled exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export type AdSlotType =
  | 'header'          // 728x90 (Desktop Leaderboard) / 320x50 or 320x100 (Mobile)
  | 'in-content'      // 728x90, 336x280, or responsive in-article banner
  | 'sidebar'         // 300x250 Medium Rectangle or 300x600 Half Page Skyscraper
  | 'footer'          // 728x90 Leaderboard above footer
  | 'hero-bottom';    // Wide responsive horizontal banner below interactive tools

export interface AdSenseSlotProps {
  /** The position/type of advertisement slot */
  type?: AdSlotType;
  /** Google AdSense Ad Slot ID (e.g., '2312411481') */
  slotId?: string;
  /** Ad layout format */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  /** Whether the ad should be full-width responsive on mobile */
  fullWidthResponsive?: boolean;
  /** Whether to render the standardized 'Advertisement' policy label */
  showLabel?: boolean;
  /** Additional custom Tailwind CSS classes */
  className?: string;
}

interface SlotDimensionConfig {
  heightClass: string;
  maxWidthClass: string;
  defaultFormat: string;
  label: string;
}

const SLOT_CONFIGS: Record<AdSlotType, SlotDimensionConfig> = {
  header: {
    heightClass: 'min-h-[90px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'horizontal',
    label: 'Header Leaderboard',
  },
  'in-content': {
    heightClass: 'min-h-[140px] sm:min-h-[160px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'auto',
    label: 'In-Content Banner',
  },
  sidebar: {
    heightClass: 'min-h-[250px]',
    maxWidthClass: 'w-full max-w-[340px]',
    defaultFormat: 'rectangle',
    label: 'Sidebar Display',
  },
  footer: {
    heightClass: 'min-h-[90px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'horizontal',
    label: 'Footer Leaderboard',
  },
  'hero-bottom': {
    heightClass: 'min-h-[100px]',
    maxWidthClass: 'max-w-5xl',
    defaultFormat: 'auto',
    label: 'Hero Bottom Banner',
  },
};

function AdSenseSlotInner({
  type = 'in-content',
  slotId = '',
  format,
  fullWidthResponsive = true,
  showLabel = true,
  className = '',
}: AdSenseSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsClient();
  const config = SLOT_CONFIGS[type] || SLOT_CONFIGS['in-content'];
  const adFormat = format || config.defaultFormat;

  useEffect(() => {
    if (!ADSENSE_ENABLED || !ADSENSE_CLIENT_ID || !isMounted || !slotId || typeof window === 'undefined') {
      return;
    }

    const timer = setTimeout(() => {
      try {
        if (containerRef.current) {
          const ins = containerRef.current.querySelector('ins.adsbygoogle');
          if (ins && !ins.getAttribute('data-adsbygoogle-status') && !ins.getAttribute('data-ad-status')) {
            ins.setAttribute('data-adsbygoogle-status', 'pending');
            const win = window as unknown as { adsbygoogle?: unknown[] };
            win.adsbygoogle = win.adsbygoogle || [];
            try {
              win.adsbygoogle.push({});
            } catch (pushErr) {
              console.warn('AdSense push error:', pushErr);
            }
          }
        }
      } catch (err) {
        console.warn('AdSense container notice:', err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [isMounted, slotId]);

  // When AdSense is not actively enabled, render nothing to maintain a clean, non-deceptive UI
  if (!ADSENSE_ENABLED || !ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full my-6 flex flex-col items-center justify-center clear-both select-none ${className}`}
    >
      {showLabel && (
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 self-center">
          Advertisement
        </span>
      )}

      <div
        ref={containerRef}
        suppressHydrationWarning
        className={`w-full ${config.maxWidthClass} ${config.heightClass} rounded-2xl bg-transparent flex flex-col items-center justify-center text-center transition-colors relative overflow-hidden`}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
        />
      </div>
    </aside>
  );
}

export function AdSenseSlot(props: AdSenseSlotProps) {
  if (!ADSENSE_ENABLED || !ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <AdErrorBoundary>
      <AdSenseSlotInner {...props} />
    </AdErrorBoundary>
  );
}

export const AdSlot = AdSenseSlot;
export default AdSenseSlot;
