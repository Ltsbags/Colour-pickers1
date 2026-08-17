'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useColorHistory } from '@/hooks/use-color-history';
import { CopyButton } from './CopyButton';
import { hexToRgb, isLightColor } from '@/lib/color-utils';
import { History, Trash2, ArrowRight, Sparkles, Clock, X } from 'lucide-react';
import { RECENT_COLORS_DEFAULT } from '@/lib/popular-colors';

export function RecentHistorySection() {
  const { history, isLoaded, addColor, removeColor, clearHistory } = useColorHistory();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleRestoreDefaults = () => {
    RECENT_COLORS_DEFAULT.slice(0, 10).reverse().forEach(hex => {
      addColor(hex);
    });
  };

  return (
    <section
      id="recent-history-section"
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 transition-all"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-2xs">
              <History className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Recent History
            </h2>
            {isLoaded && history.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {history.length}/10
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last 10 colors you viewed, picked, or converted — saved locally in your browser
          </p>
        </div>

        {/* Action Buttons */}
        {isLoaded && history.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {showConfirmClear ? (
              <div className="flex items-center gap-1.5 animate-in fade-in duration-200">
                <button
                  type="button"
                  onClick={() => {
                    clearHistory();
                    setShowConfirmClear(false);
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  Confirm Clear
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmClear(false)}
                  className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirmClear(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all cursor-pointer"
                title="Clear recent color history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* History Content */}
      {!isLoaded ? (
        // Skeleton loader while reading localStorage
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-36 rounded-2xl bg-slate-100 dark:bg-slate-800/60 animate-pulse"
            />
          ))}
        </div>
      ) : history.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center text-center py-10 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No recent color history
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Colors you inspect, pick with the eyedropper, or generate will appear here automatically.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 text-xs font-semibold transition-colors cursor-pointer border border-purple-200 dark:border-purple-800"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Load Sample Palette History</span>
          </button>
        </div>
      ) : (
        // Grid of Recent Colors (up to 10)
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {history.map((item, index) => {
            const cleanHex = item.hex.toUpperCase();
            const rgb = hexToRgb(cleanHex);
            const isLight = isLightColor(rgb);

            return (
              <div
                key={`${cleanHex}-${index}`}
                id={`recent-color-${cleanHex}`}
                className="group relative flex flex-col bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-purple-500/60 dark:hover:border-purple-500/60 transition-all duration-200"
              >
                {/* Color Swatch Area */}
                <div
                  className="relative h-24 sm:h-28 w-full p-2.5 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: `#${cleanHex}` }}
                >
                  <div className="flex items-center justify-between">
                    {/* Index Badge */}
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-md shadow-2xs ${
                        isLight
                          ? 'bg-black/15 text-slate-900 border border-black/10'
                          : 'bg-white/20 text-white border border-white/20'
                      }`}
                    >
                      #{index + 1}
                    </span>

                    {/* Quick Remove Item Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeColor(cleanHex);
                      }}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md cursor-pointer ${
                        isLight
                          ? 'bg-black/20 hover:bg-black/40 text-slate-900'
                          : 'bg-white/20 hover:bg-white/40 text-white'
                      }`}
                      title="Remove from history"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Copy Button Overlay */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                    <CopyButton
                      textToCopy={`#${cleanHex}`}
                      label=""
                      variant="badge"
                      size="sm"
                    />
                  </div>
                </div>

                {/* Color Metadata Details */}
                <div className="p-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/hex/${cleanHex}`}
                      className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors truncate"
                      title={`View #${cleanHex} full specifications`}
                    >
                      #{cleanHex}
                    </Link>
                    <Link
                      href={`/hex/${cleanHex}`}
                      className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      title="View color details"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                    {item.name}
                  </p>

                  <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                    <span>RGB {rgb.r}, {rgb.g}, {rgb.b}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
