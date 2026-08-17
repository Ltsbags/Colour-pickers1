'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CopyButton } from './CopyButton';
import {
  normalizeHex,
  isValidHex,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToCmyk,
  cmykToRgb,
  isLightColor,
} from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { addToColorHistory } from '@/lib/color-history';
import { RefreshCw, ArrowRightLeft, Sparkles, Check } from 'lucide-react';

interface ColorConverterProps {
  initialHex?: string;
  defaultMode?: 'all' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';
}

export function ColorConverterComponent({
  initialHex = '3B82F6',
  defaultMode = 'all',
}: ColorConverterProps) {
  const [hexInput, setHexInput] = useState(normalizeHex(initialHex));
  const [rgbState, setRgbState] = useState(hexToRgb(initialHex));

  const cleanHex = rgbToHex(rgbState);
  const hslState = rgbToHsl(rgbState);
  const hsvState = rgbToHsv(rgbState);
  const cmykState = rgbToCmyk(rgbState);
  const closestName = getClosestColorName(cleanHex);
  const isLight = isLightColor(rgbState);

  // Update from HEX input
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace('#', '').toUpperCase();
    setHexInput(val);
    if (isValidHex(val)) {
      setRgbState(hexToRgb(val));
    }
  };

  // Update RGB
  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const clamped = Math.max(0, Math.min(255, value || 0));
    const newRgb = { ...rgbState, [channel]: clamped };
    setRgbState(newRgb);
    setHexInput(rgbToHex(newRgb));
  };

  // Update HSL
  const handleHslChange = (channel: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hslState, [channel]: value };
    const newRgb = hslToRgb(newHsl);
    setRgbState(newRgb);
    setHexInput(rgbToHex(newRgb));
  };

  // Update CMYK
  const handleCmykChange = (channel: 'c' | 'm' | 'y' | 'k', value: number) => {
    const newCmyk = { ...cmykState, [channel]: value };
    const newRgb = cmykToRgb(newCmyk);
    setRgbState(newRgb);
    setHexInput(rgbToHex(newRgb));
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-md transition-all">
      {/* Live Preview Header Banner */}
      <div
        className="w-full h-32 sm:h-40 rounded-xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-inner mb-6 relative overflow-hidden"
        style={{ backgroundColor: `#${cleanHex}` }}
      >
        <div className="flex justify-between items-start z-10">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border shadow-xs backdrop-blur-md ${
              isLight
                ? 'bg-black/10 border-black/10 text-slate-900'
                : 'bg-white/20 border-white/20 text-white'
            }`}
          >
            {closestName.name}
          </span>
          <CopyButton
            textToCopy={`#${cleanHex}`}
            label={`#${cleanHex}`}
            variant="badge"
            size="sm"
          />
        </div>

        <div className="flex items-end justify-between z-10">
          <div>
            <div
              className={`font-mono text-2xl sm:text-3xl font-extrabold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              #{cleanHex}
            </div>
            <div
              className={`text-xs font-medium opacity-90 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              rgb({rgbState.r}, {rgbState.g}, {rgbState.b})
            </div>
          </div>
          <Link
            href={`/hex/${cleanHex}`}
            onClick={() => addToColorHistory(cleanHex, closestName.name)}
            className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 shadow-sm transition-all"
          >
            Detailed Color Page →
          </Link>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HEX Input */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            HEX Color Code
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-slate-400 font-mono font-bold">
                #
              </span>
              <input
                type="text"
                value={hexInput}
                onChange={handleHexChange}
                maxLength={6}
                className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-bold uppercase text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <CopyButton textToCopy={`#${cleanHex}`} label="Copy" variant="solid" />
          </div>
        </div>

        {/* RGB Controls */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              RGB (Red, Green, Blue)
            </label>
            <CopyButton
              textToCopy={`rgb(${rgbState.r}, ${rgbState.g}, ${rgbState.b})`}
              label="Copy RGB"
              variant="ghost"
              size="sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['r', 'g', 'b'] as const).map(channel => (
              <div key={channel} className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  {channel}
                </span>
                <input
                  type="number"
                  min={0}
                  max={255}
                  value={rgbState[channel]}
                  onChange={e => handleRgbChange(channel, parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* HSL Controls */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              HSL (Hue, Saturation, Lightness)
            </label>
            <CopyButton
              textToCopy={`hsl(${hslState.h}, ${hslState.s}%, ${hslState.l}%)`}
              label="Copy HSL"
              variant="ghost"
              size="sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Hue (°)</span>
              <input
                type="number"
                min={0}
                max={360}
                value={hslState.h}
                onChange={e => handleHslChange('h', parseInt(e.target.value, 10))}
                className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Sat (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={hslState.s}
                onChange={e => handleHslChange('s', parseInt(e.target.value, 10))}
                className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Light (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={hslState.l}
                onChange={e => handleHslChange('l', parseInt(e.target.value, 10))}
                className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* CMYK Controls */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              CMYK (Cyan, Magenta, Yellow, Key)
            </label>
            <CopyButton
              textToCopy={`cmyk(${cmykState.c}%, ${cmykState.m}%, ${cmykState.y}%, ${cmykState.k}%)`}
              label="Copy CMYK"
              variant="ghost"
              size="sm"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(['c', 'm', 'y', 'k'] as const).map(ch => (
              <div key={ch} className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  {ch} (%)
                </span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={cmykState[ch]}
                  onChange={e => handleCmykChange(ch, parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Snippets Export Footer */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          CSS Snippet: <code className="font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">color: #{cleanHex};</code>
        </div>
        <div className="flex gap-2">
          <CopyButton
            textToCopy={`color: #${cleanHex}; background-color: #${cleanHex};`}
            label="Copy CSS Code"
            variant="badge"
            size="sm"
          />
          <CopyButton
            textToCopy={`bg-[#${cleanHex}] text-[#${cleanHex}]`}
            label="Copy Tailwind"
            variant="badge"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
