'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import {
  normalizeHex,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToCmyk,
  isLightColor,
} from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { addToColorHistory } from '@/lib/color-history';
import { Pipette, Palette, Copy, Check } from 'lucide-react';

export default function ColorPickerPage() {
  const [selectedHex, setSelectedHex] = useState('3B82F6');
  const [browserNotice, setBrowserNotice] = useState<string | null>(null);

  const cleanHex = normalizeHex(selectedHex);
  const rgb = hexToRgb(cleanHex);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const cmyk = rgbToCmyk(rgb);
  const name = getClosestColorName(cleanHex).name;
  const isLight = isLightColor(rgb);

  const handleEyeDropper = async () => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      try {
        // @ts-ignore
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result.sRGBHex) {
          const hex = normalizeHex(result.sRGBHex);
          setSelectedHex(hex);
          addToColorHistory(hex);
          setBrowserNotice(null);
        }
      } catch {
        // User cancelled eyedropper
      }
    } else {
      setBrowserNotice('The Eyedropper API is supported in Chrome, Edge, and Opera browsers.');
      setTimeout(() => setBrowserNotice(null), 4000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Color Picker & Eyedropper' },
          ]}
        />

        <div className="my-6 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interactive Color Picker & Eyedropper
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Pick colors directly from your screen or fine-tune using color wheels and sliders.
          </p>
        </div>

        <AdSlot type="header" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Eyedropper & Wheel Stage */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-between gap-6">
            <div
              className="w-full h-64 rounded-2xl p-6 flex flex-col justify-between shadow-inner border border-black/10 transition-all duration-300"
              style={{ backgroundColor: `#${cleanHex}` }}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md ${
                    isLight
                      ? 'bg-black/10 border-black/10 text-slate-900'
                      : 'bg-white/20 border-white/20 text-white'
                  }`}
                >
                  {name}
                </span>
                <CopyButton textToCopy={`#${cleanHex}`} label={`#${cleanHex}`} variant="badge" size="sm" />
              </div>

              <div className={`font-mono text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                #{cleanHex}
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleEyeDropper}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Pipette className="w-4 h-4" />
                <span>Screen Eyedropper</span>
              </button>

              <div className="flex-1 relative flex items-center justify-center py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl cursor-pointer">
                <Palette className="w-4 h-4 mr-2" />
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  Open Native Picker
                </span>
                <input
                  type="color"
                  value={`#${cleanHex}`}
                  onChange={e => {
                    const hex = normalizeHex(e.target.value);
                    setSelectedHex(hex);
                    addToColorHistory(hex);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>

            {browserNotice && (
              <div className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300">
                {browserNotice}
              </div>
            )}
          </div>

          {/* Color Values Output Card */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Color Coordinates & Values
            </h2>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">HEX</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-base">
                    #{cleanHex}
                  </div>
                </div>
                <CopyButton textToCopy={`#${cleanHex}`} label="Copy" variant="ghost" size="sm" />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">RGB</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                </div>
                <CopyButton textToCopy={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} label="Copy" variant="ghost" size="sm" />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">HSL</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </div>
                </div>
                <CopyButton textToCopy={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} label="Copy" variant="ghost" size="sm" />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">CMYK</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
                  </div>
                </div>
                <CopyButton textToCopy={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} label="Copy" variant="ghost" size="sm" />
              </div>
            </div>

            <Link
              href={`/hex/${cleanHex}`}
              className="w-full text-center py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Explore Full Color Page →
            </Link>
          </div>
        </div>

        <AdSlot type="in-content" />
      </main>

      <Footer />
    </div>
  );
}
