'use client';

import React from 'react';
import Link from 'next/link';
import { CopyButton } from './CopyButton';
import { getClosestColorName } from '@/lib/color-names';
import { hexToRgb, isLightColor } from '@/lib/color-utils';
import { addToColorHistory } from '@/lib/color-history';

interface ColorCardProps {
  hex: string;
  name?: string;
  showDetailsLink?: boolean;
}

export function ColorCard({ hex, name, showDetailsLink = true }: ColorCardProps) {
  const cleanHex = hex.replace('#', '').toUpperCase();
  const colorName = name || getClosestColorName(cleanHex).name;
  const rgb = hexToRgb(cleanHex);
  const isLight = isLightColor(rgb);

  return (
    <div
      id={`color-card-${cleanHex}`}
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
    >
      {/* Color Swatch Area */}
      <div
        className="relative h-28 sm:h-32 w-full p-3 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundColor: `#${cleanHex}` }}
      >
        <div className="flex justify-between items-start">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-md ${
              isLight
                ? 'bg-black/10 border-black/10 text-slate-900'
                : 'bg-white/20 border-white/20 text-white'
            }`}
          >
            {isLight ? 'Light' : 'Dark'}
          </span>
        </div>

        {/* Quick Overlay Action */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-end">
          <CopyButton
            textToCopy={`#${cleanHex}`}
            label=""
            variant="badge"
            size="sm"
          />
        </div>
      </div>

      {/* Info Footer */}
      <div className="p-3.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Link
            href={`/hex/${cleanHex}`}
            onClick={() => addToColorHistory(cleanHex, colorName)}
            className="font-bold text-slate-900 dark:text-white text-base hover:text-blue-600 dark:hover:text-blue-400 truncate"
          >
            #{cleanHex}
          </Link>
          <CopyButton
            textToCopy={`#${cleanHex}`}
            label={`#${cleanHex}`}
            variant="ghost"
            size="sm"
            className="font-mono text-xs"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="truncate">{colorName}</span>
          <span className="font-mono text-[11px] opacity-80">
            {rgb.r},{rgb.g},{rgb.b}
          </span>
        </div>

        {showDetailsLink && (
          <Link
            href={`/hex/${cleanHex}`}
            onClick={() => addToColorHistory(cleanHex, colorName)}
            className="mt-1 text-center text-xs font-semibold py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Explore Color Details
          </Link>
        )}
      </div>
    </div>
  );
}
