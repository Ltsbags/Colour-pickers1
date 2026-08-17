'use client';

import React, { useEffect, useRef } from 'react';

/**
 * AdSenseSlot / AdSlot Component
 *
 * Designed for Google AdSense monetization with:
 * 1. Zero Cumulative Layout Shift (CLS) via fixed/reserved dimensions for each slot type
 * 2. Full compliance with Google AdSense Policies (strict "Advertisement" label, high contrast separation)
 * 3. Clear developer placeholders in development / staging
 * 4. Production-ready activation when NEXT_PUBLIC_ADSENSE_CLIENT and slotId are provided
 *
 * ==============================================================================
 * HOW TO INSERT YOUR ACTUAL GOOGLE ADSENSE CODE AFTER APPROVAL:
 * ==============================================================================
 * 1. Define your AdSense Publisher ID in `.env.local` or platform settings:
 *    NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 *
 * 2. Add your AdSense ad slot IDs to respective page placements:
 *    <AdSenseSlot type="header" slotId="1234567890" />
 *    <AdSenseSlot type="in-content" slotId="0987654321" />
 *    <AdSenseSlot type="sidebar" slotId="1122334455" />
 *    <AdSenseSlot type="footer" slotId="5566778899" />
 *
 * 3. Ensure `/public/ads.txt` is updated with your Publisher ID.
 * ==============================================================================
 */

export type AdSlotType =
  | 'header'          // 728x90 (Desktop Leaderboard) / 320x50 or 320x100 (Mobile)
  | 'in-content'      // 728x90, 336x280, or responsive in-article banner
  | 'sidebar'         // 300x250 Medium Rectangle or 300x600 Half Page Skyscraper
  | 'footer'          // 728x90 Leaderboard above footer
  | 'hero-bottom';    // Wide responsive horizontal banner below interactive tools

export interface AdSenseSlotProps {
  /** The position/type of advertisement slot */
  type?: AdSlotType;
  /** Google AdSense Ad Slot ID (e.g., '1234567890') */
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
    // 728x90 Leaderboard on desktop, responsive container on mobile
    heightClass: 'min-h-[90px] h-[90px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'horizontal',
    label: 'Header Leaderboard',
    dimensionsText: '728×90 / Responsive Mobile Banner',
  },
  'in-content': {
    // Standard in-article responsive banner
    heightClass: 'min-h-[140px] sm:min-h-[160px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'auto',
    label: 'In-Content Banner',
    dimensionsText: 'Responsive Display (In-Article)',
  },
  sidebar: {
    // 300x250 Rectangle or 300x600 Vertical Skyscraper
    heightClass: 'min-h-[250px] sm:min-h-[280px]',
    maxWidthClass: 'w-full max-w-[340px]',
    defaultFormat: 'rectangle',
    label: 'Sidebar Display',
    dimensionsText: '300×250 / 300×600 Rectangle',
  },
  footer: {
    // 728x90 Leaderboard above site footer
    heightClass: 'min-h-[90px] h-[90px]',
    maxWidthClass: 'max-w-4xl',
    defaultFormat: 'horizontal',
    label: 'Footer Leaderboard',
    dimensionsText: '728×90 / Responsive Footer Banner',
  },
  'hero-bottom': {
    // Responsive wide horizontal banner below primary color tools
    heightClass: 'min-h-[100px] sm:min-h-[120px]',
    maxWidthClass: 'max-w-5xl',
    defaultFormat: 'auto',
    label: 'Hero Bottom Banner',
    dimensionsText: 'Responsive Wide Display',
  },
};

export function AdSenseSlot({
  type = 'in-content',
  slotId,
  format,
  fullWidthResponsive = true,
  showLabel = true,
  className = '',
}: AdSenseSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const config = SLOT_CONFIGS[type] || SLOT_CONFIGS['in-content'];
  const adFormat = format || config.defaultFormat;

  useEffect(() => {
    // Trigger Google AdSense script push only when valid client and slot are active
    if (client && typeof window !== 'undefined') {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (err) {
        console.warn('AdSense notice:', err);
      }
    }
  }, [client, slotId]);

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
        ref={adRef}
        className={`w-full ${config.maxWidthClass} ${config.heightClass} rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-dashed border-slate-300/80 dark:border-slate-800 p-3 flex flex-col items-center justify-center text-center transition-colors relative overflow-hidden`}
      >
        {client && slotId ? (
          /* ====================================================================
             LIVE GOOGLE ADSENSE CODE TAG
             Rendered when NEXT_PUBLIC_ADSENSE_CLIENT and slotId are present
             ==================================================================== */
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={client}
            data-ad-slot={slotId}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
          />
        ) : (
          /* ====================================================================
             DEV / STAGING PLACEHOLDER
             Clean, responsive placeholder container preserving CLS layout space
             ==================================================================== */
          <div className="flex flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500 py-3 px-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>{config.label}</span>
            </div>
            <p className="text-[11px] text-slate-400/80 dark:text-slate-500 max-w-sm">
              {config.dimensionsText}
            </p>
            {slotId ? (
              <span className="font-mono text-[9px] text-slate-400 bg-slate-200/60 dark:bg-slate-800/80 px-2 py-0.5 rounded mt-0.5">
                Slot ID: {slotId}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400/60 italic mt-0.5">
                Google AdSense Placeholder (CLS Protected)
              </span>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

// Export aliases for backward compatibility and direct import
export const AdSlot = AdSenseSlot;
export default AdSenseSlot;
