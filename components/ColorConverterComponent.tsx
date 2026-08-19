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
  rgbToOklab,
  rgbToOklch,
  oklchToRgb,
  isLightColor,
} from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { addToColorHistory } from '@/lib/color-history';
import { RefreshCw, ArrowRightLeft, Sparkles, Check, Code, Sliders } from 'lucide-react';

interface ColorConverterProps {
  initialHex?: string;
  defaultMode?: 'all' | 'rgb' | 'hsl' | 'hsv' | 'cmyk' | 'oklch';
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
  const oklabState = rgbToOklab(rgbState);
  const oklchState = rgbToOklch(rgbState);
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
    const clamped = Math.max(0, Math.min(255, isNaN(value) ? 0 : value));
    const newRgb = { ...rgbState, [channel]: clamped };
    setRgbState(newRgb);
    setHexInput(rgbToHex(newRgb));
  };

  // Update HSL
  const handleHslChange = (channel: 'h' | 's' | 'l', value: number) => {
    const maxVal = channel === 'h' ? 360 : 100;
    const clamped = Math.max(0, Math.min(maxVal, isNaN(value) ? 0 : value));
    const newHsl = { ...hslState, [channel]: clamped };
    const newRgb = hslToRgb(newHsl);
    setRgbState(newRgb);
    setHexInput(rgbToHex(newRgb));
  };

  // Update CMYK
  const handleCmykChange = (channel: 'c' | 'm' | 'y' | 'k', value: number) => {
    const clamped = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    const newCmyk = { ...cmykState, [channel]: clamped };
    const newRgb = cmykToRgb(newCmyk);
    setRgbState(newRgb);
    setHexInput(rgbToHex(newRgb));
  };

  // Update OKLCH
  const handleOklchChange = (channel: 'l' | 'c' | 'h', value: number) => {
    const newOklch = { ...oklchState, [channel]: isNaN(value) ? 0 : value };
    const newRgb = oklchToRgb(newOklch);
    setRgbState(newRgb);
    setHexInput(rgbToHex(newRgb));
  };

  const oklchCss = `oklch(${oklchState.l} ${oklchState.c} ${oklchState.h})`;
  const oklabCss = `oklab(${oklabState.l} ${oklabState.a} ${oklabState.b})`;
  const colorMixCss = `color-mix(in srgb, #${cleanHex} 80%, white)`;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* HEX Input */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              HEX Code
            </label>
            <CopyButton textToCopy={`#${cleanHex}`} label="Copy" variant="ghost" size="sm" />
          </div>
          <div className="relative">
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
        </div>

        {/* RGB Controls */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              RGB (Red, Green, Blue)
            </label>
            <CopyButton
              textToCopy={`rgb(${rgbState.r}, ${rgbState.g}, ${rgbState.b})`}
              label="Copy"
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
              HSL (Hue, Sat, Light)
            </label>
            <CopyButton
              textToCopy={`hsl(${hslState.h}, ${hslState.s}%, ${hslState.l}%)`}
              label="Copy"
              variant="ghost"
              size="sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">H (°)</span>
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
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">S (%)</span>
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
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">L (%)</span>
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
              CMYK (Print Color)
            </label>
            <CopyButton
              textToCopy={`cmyk(${cmykState.c}%, ${cmykState.m}%, ${cmykState.y}%, ${cmykState.k}%)`}
              label="Copy"
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

        {/* OKLCH Modern Color Space (CSS Color Level 4) */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>OKLCH (Perceptual)</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded font-semibold">CSS4</span>
            </label>
            <CopyButton
              textToCopy={oklchCss}
              label="Copy"
              variant="ghost"
              size="sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">L</span>
              <input
                type="number"
                step="0.01"
                min={0}
                max={1}
                value={oklchState.l}
                onChange={e => handleOklchChange('l', parseFloat(e.target.value))}
                className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">C</span>
              <input
                type="number"
                step="0.01"
                min={0}
                max={0.4}
                value={oklchState.c}
                onChange={e => handleOklchChange('c', parseFloat(e.target.value))}
                className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">H (°)</span>
              <input
                type="number"
                step="1"
                min={0}
                max={360}
                value={oklchState.h}
                onChange={e => handleOklchChange('h', parseFloat(e.target.value))}
                className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* OKLab Modern Color Space */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              OKLab Coordinates
            </label>
            <CopyButton
              textToCopy={oklabCss}
              label="Copy"
              variant="ghost"
              size="sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">L: {oklabState.l}</span>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 py-1.5 bg-white dark:bg-slate-800 px-2 rounded-lg border border-slate-200 dark:border-slate-700">
                {oklabState.l}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">a: {oklabState.a}</span>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 py-1.5 bg-white dark:bg-slate-800 px-2 rounded-lg border border-slate-200 dark:border-slate-700">
                {oklabState.a}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">b: {oklabState.b}</span>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 py-1.5 bg-white dark:bg-slate-800 px-2 rounded-lg border border-slate-200 dark:border-slate-700">
                {oklabState.b}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippets & Modern CSS Functions */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400">CSS Level 4:</span>
          <code className="font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
            {oklchCss}
          </code>
          <code className="font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
            {colorMixCss}
          </code>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton
            textToCopy={`--color-${closestName.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}: #${cleanHex};`}
            label="Copy CSS Var"
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
