'use client';

import React, { useEffect, useRef, useSyncExternalStore, Component, ErrorInfo, ReactNode } from 'react';

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

// Fixed dimensional boundaries per slot type to prevent Cumulative Layout Shift (CLS)
interface SlotDimensionConfig {
  heightClass: string;
  maxWidthClass: string;
  defaultFormat: string;
  label: string;
  dimensionsText: string;
}

const SLOT_CONFIGS: Record<AdSlotType, SlotDimensionConfig> = {
  header: {
    heightClass: 'min-h-[90px] h-[90px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'horizontal',
    label: 'Header Leaderboard',
    dimensionsText: '728×90 / Responsive Mobile Banner',
  },
  'in-content': {
    heightClass: 'min-h-[140px] sm:min-h-[160px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'auto',
    label: 'In-Content Banner',
    dimensionsText: 'Responsive Display (In-Article)',
  },
  sidebar: {
    heightClass: 'min-h-[250px] sm:min-h-[280px]',
    maxWidthClass: 'w-full max-w-[340px]',
    defaultFormat: 'rectangle',
    label: 'Sidebar Display',
    dimensionsText: '300×250 / 300×600 Rectangle',
  },
  footer: {
    heightClass: 'min-h-[90px] h-[90px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'horizontal',
    label: 'Footer Leaderboard',
    dimensionsText: '728×90 / Responsive Footer Banner',
  },
  'hero-bottom': {
    heightClass: 'min-h-[100px] sm:min-h-[120px]',
    maxWidthClass: 'max-w-5xl',
    defaultFormat: 'auto',
    label: 'Hero Bottom Banner',
    dimensionsText: 'Responsive Wide Display',
  },
};

function AdSenseSlotInner({
  type = 'in-content',
  slotId = '2312411481',
  format,
  fullWidthResponsive = true,
  showLabel = true,
  className = '',
}: AdSenseSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsClient();
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-9745434299525119';
  const effectiveSlotId = slotId || '2312411481';
  const config = SLOT_CONFIGS[type] || SLOT_CONFIGS['in-content'];
  const adFormat = format || config.defaultFormat;

  useEffect(() => {
    if (!isMounted || !client || !effectiveSlotId || typeof window === 'undefined') {
      return;
    }

    // Delay push execution slightly to ensure DOM layout is calculated and prevent TagError width=0
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
              console.warn('AdSense push error suppressed:', pushErr);
            }
          }
        }
      } catch (err) {
        console.warn('AdSense container notice:', err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [isMounted, client, effectiveSlotId]);

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full my-6 flex flex-col items-center justify-center clear-both select-none ${className}`}
    >
      {/* Policy Required Disclosure Label ("Advertisement") */}
      {showLabel && (
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 self-center">
          Advertisement
        </span>
      )}

      {/* 
        Responsive Ad Container:
        Fixed / min-height styles prevent Cumulative Layout Shift (CLS) when ads load dynamically.
      */}
      <div
        ref={containerRef}
        suppressHydrationWarning
        className={`w-full ${config.maxWidthClass} ${config.heightClass} rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-dashed border-slate-300/80 dark:border-slate-800 p-2 flex flex-col items-center justify-center text-center transition-colors relative overflow-hidden`}
      >
        {isMounted && client && effectiveSlotId ? (
          /* 
            Render ins via dangerouslySetInnerHTML so React's virtual DOM reconciliation 
            never conflicts with AdSense's injected iframes / DOM modifications.
          */
          <div
            className="w-full h-full flex items-center justify-center"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `<ins class="adsbygoogle" style="display:block;width:100%;height:100%;" data-ad-client="${client}" data-ad-slot="${effectiveSlotId}" data-ad-format="${adFormat}" data-full-width-responsive="${fullWidthResponsive ? 'true' : 'false'}"></ins>`,
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500 py-3 px-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>{config.label}</span>
            </div>
            <p className="text-[11px] text-slate-400/80 dark:text-slate-500 max-w-sm">
              {config.dimensionsText}
            </p>
            <span className="text-[10px] text-slate-400/60 italic mt-0.5">
              Google AdSense Placement
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

export function AdSenseSlot(props: AdSenseSlotProps) {
  return (
    <AdErrorBoundary>
      <AdSenseSlotInner {...props} />
    </AdErrorBoundary>
  );
}

// Export aliases for backward compatibility and direct import
export const AdSlot = AdSenseSlot;
export default AdSenseSlot;

