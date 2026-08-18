'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CopyButton } from '@/components/CopyButton';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorCard } from '@/components/ColorCard';
import { TrackColorView } from '@/components/TrackColorView';
import { POPULAR_COLORS } from '@/lib/popular-colors';
import {
  Check,
  X,
  ArrowRight,
  Palette,
  Sliders,
  Sparkles,
  Layers,
  ShieldCheck,
  ArrowRightLeft,
  Info,
  Code,
} from 'lucide-react';

interface HexColorViewProps {
  hex: string;
  colorName: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  cmyk: { c: number; m: number; y: number; k: number };
  isLight: boolean;
  contrastWhite: number;
  contrastBlack: number;
  shades: string[];
  tints: string[];
  tones: string[];
  harmonies: {
    complementary: string;
    analogous: [string, string];
    triadic: [string, string];
    splitComplementary: [string, string];
    tetradic: [string, string, string];
    monochromatic: string[];
  };
}

export function HexColorView({
  hex,
  colorName,
  rgb,
  hsl,
  hsv,
  cmyk,
  isLight,
  contrastWhite,
  contrastBlack,
  shades,
  tints,
  tones,
  harmonies,
}: HexColorViewProps) {
  const passesAAWhite = contrastWhite >= 4.5;
  const passesAAAWhite = contrastWhite >= 7.0;
  const passesAABlack = contrastBlack >= 4.5;
  const passesAAABlack = contrastBlack >= 7.0;

  const hexString = `#${hex}`;
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hsvString = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
  const cssVarString = `--color-primary: #${hex};`;
  const tailwindBg = `bg-[#${hex}]`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <TrackColorView hex={hex} name={colorName} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Colors', href: '/colors' },
            { label: `#${hex} (${colorName})` },
          ]}
        />

        {/* Hero Color Header */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Color Swatch Display Banner */}
            <div className="lg:col-span-5">
              <div
                className="w-full h-64 sm:h-80 rounded-3xl shadow-inner border border-black/10 flex flex-col justify-between p-6 transition-all relative overflow-hidden"
                style={{ backgroundColor: hexString }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      isLight ? 'bg-black/20 text-slate-900' : 'bg-white/20 text-white'
                    }`}
                  >
                    {isLight ? 'Light Color' : 'Dark Color'}
                  </span>
                  <CopyButton
                    textToCopy={hexString}
                    label="Copy HEX"
                    variant={isLight ? 'secondary' : 'default'}
                    size="sm"
                  />
                </div>

                <div>
                  <h1
                    className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    #{hex}
                  </h1>
                  <p
                    className={`text-base font-semibold mt-1 ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {colorName}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Format Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Color Space Coordinates
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant copyable codes for development, CSS styling, and print
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* HEX */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">HEX</span>
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {hexString}
                    </span>
                  </div>
                  <CopyButton textToCopy={hexString} size="sm" variant="ghost" />
                </div>

                {/* RGB */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">RGB</span>
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {rgbString}
                    </span>
                  </div>
                  <CopyButton textToCopy={rgbString} size="sm" variant="ghost" />
                </div>

                {/* HSL */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">HSL</span>
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {hslString}
                    </span>
                  </div>
                  <CopyButton textToCopy={hslString} size="sm" variant="ghost" />
                </div>

                {/* HSV */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">HSV / HSB</span>
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {hsvString}
                    </span>
                  </div>
                  <CopyButton textToCopy={hsvString} size="sm" variant="ghost" />
                </div>

                {/* CMYK */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">CMYK (Print)</span>
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {cmykString}
                    </span>
                  </div>
                  <CopyButton textToCopy={cmykString} size="sm" variant="ghost" />
                </div>

                {/* Tailwind */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Tailwind CSS</span>
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {tailwindBg}
                    </span>
                  </div>
                  <CopyButton textToCopy={tailwindBg} size="sm" variant="ghost" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href={`/tools/color-contrast-checker?color1=${hex}&color2=FFFFFF`}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Check WCAG Contrast</span>
                </Link>

                <Link
                  href={`/tools/shades-generator?hex=${hex}`}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Generate Shades & Tints</span>
                </Link>

                <Link
                  href={`/tools/palette-generator`}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Build Palette</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <AdSlot type="header" />

        {/* WCAG Accessibility & Contrast Section */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              WCAG 2.1 Contrast & Accessibility Audit
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluates readability standards for normal body text (4.5:1 AA / 7.0:1 AAA) and large headings (3.0:1 AA / 4.5:1 AAA)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contrast against White */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-400">Against Pure White (#FFFFFF)</span>
                <span className="text-lg font-mono font-bold text-slate-900">
                  {contrastWhite.toFixed(2)}:1
                </span>
              </div>

              {/* Visual Preview Box */}
              <div
                className="p-4 rounded-xl border border-black/10 flex items-center justify-center text-center"
                style={{ backgroundColor: hexString, color: '#FFFFFF' }}
              >
                <span className="font-bold text-sm">White Text on #{hex}</span>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`p-2.5 rounded-xl flex items-center justify-between ${
                    passesAAWhite
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <span className="font-bold">AA Normal Text</span>
                  {passesAAWhite ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-rose-600" />}
                </div>

                <div
                  className={`p-2.5 rounded-xl flex items-center justify-between ${
                    passesAAAWhite
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <span className="font-bold">AAA Normal Text</span>
                  {passesAAAWhite ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-rose-600" />}
                </div>
              </div>
            </div>

            {/* Contrast against Black */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-400">Against Pure Black (#000000)</span>
                <span className="text-lg font-mono font-bold text-white">
                  {contrastBlack.toFixed(2)}:1
                </span>
              </div>

              {/* Visual Preview Box */}
              <div
                className="p-4 rounded-xl border border-white/10 flex items-center justify-center text-center"
                style={{ backgroundColor: hexString, color: '#000000' }}
              >
                <span className="font-bold text-sm">Black Text on #{hex}</span>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`p-2.5 rounded-xl flex items-center justify-between ${
                    passesAABlack
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                  }`}
                >
                  <span className="font-bold">AA Normal Text</span>
                  {passesAABlack ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                </div>

                <div
                  className={`p-2.5 rounded-xl flex items-center justify-between ${
                    passesAAABlack
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                  }`}
                >
                  <span className="font-bold">AAA Normal Text</span>
                  {passesAAABlack ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tints, Shades & Tones Section */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Tonal Variations (Shades, Tints & Tones)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calibrated step variations created by adding black (shades), white (tints), and gray (tones)
            </p>
          </div>

          {/* Shades */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Shades (Darker with Black)</span>
              <CopyButton textToCopy={shades.map(s => `#${s}`).join(', ')} label="Copy Shades" size="sm" variant="ghost" />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {shades.map((s, idx) => (
                <Link
                  key={idx}
                  href={`/hex/${s}`}
                  className="group flex flex-col p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all text-center"
                >
                  <div
                    className="w-full h-12 rounded-lg mb-1 shadow-2xs border border-black/5"
                    style={{ backgroundColor: `#${s}` }}
                  />
                  <span className="font-mono text-[10px] text-slate-500 truncate">#{s}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tints */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Tints (Lighter with White)</span>
              <CopyButton textToCopy={tints.map(s => `#${s}`).join(', ')} label="Copy Tints" size="sm" variant="ghost" />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {tints.map((s, idx) => (
                <Link
                  key={idx}
                  href={`/hex/${s}`}
                  className="group flex flex-col p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all text-center"
                >
                  <div
                    className="w-full h-12 rounded-lg mb-1 shadow-2xs border border-black/5"
                    style={{ backgroundColor: `#${s}` }}
                  />
                  <span className="font-mono text-[10px] text-slate-500 truncate">#{s}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tones */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Tones (Muted with Gray)</span>
              <CopyButton textToCopy={tones.map(s => `#${s}`).join(', ')} label="Copy Tones" size="sm" variant="ghost" />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {tones.map((s, idx) => (
                <Link
                  key={idx}
                  href={`/hex/${s}`}
                  className="group flex flex-col p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all text-center"
                >
                  <div
                    className="w-full h-12 rounded-lg mb-1 shadow-2xs border border-black/5"
                    style={{ backgroundColor: `#${s}` }}
                  />
                  <span className="font-mono text-[10px] text-slate-500 truncate">#{s}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* Color Harmonies & Palettes */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Harmonies for #{hex} ({colorName})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Classical color wheel pairings calculated from 360-degree rotational angles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complementary */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Complementary (180°)</h3>
                <span className="text-[10px] text-slate-400 font-mono">Opposite</span>
              </div>
              <div className="flex h-16 rounded-xl overflow-hidden shadow-2xs border border-black/10">
                <div className="flex-1 h-full" style={{ backgroundColor: hexString }} />
                <div className="flex-1 h-full" style={{ backgroundColor: `#${harmonies.complementary}` }} />
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <Link href={`/hex/${hex}`} className="font-bold text-blue-600 dark:text-blue-400">#{hex}</Link>
                <Link href={`/hex/${harmonies.complementary}`} className="font-bold text-purple-600 dark:text-purple-400">#{harmonies.complementary}</Link>
              </div>
            </div>

            {/* Triadic */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Triadic (120° / 240°)</h3>
                <span className="text-[10px] text-slate-400 font-mono">Equidistant</span>
              </div>
              <div className="flex h-16 rounded-xl overflow-hidden shadow-2xs border border-black/10">
                <div className="flex-1 h-full" style={{ backgroundColor: hexString }} />
                <div className="flex-1 h-full" style={{ backgroundColor: `#${harmonies.triadic[0]}` }} />
                <div className="flex-1 h-full" style={{ backgroundColor: `#${harmonies.triadic[1]}` }} />
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <Link href={`/hex/${hex}`}>#{hex}</Link>
                <Link href={`/hex/${harmonies.triadic[0]}`}>#{harmonies.triadic[0]}</Link>
                <Link href={`/hex/${harmonies.triadic[1]}`}>#{harmonies.triadic[1]}</Link>
              </div>
            </div>

            {/* Analogous */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Analogous (±30°)</h3>
                <span className="text-[10px] text-slate-400 font-mono">Adjacent</span>
              </div>
              <div className="flex h-16 rounded-xl overflow-hidden shadow-2xs border border-black/10">
                <div className="flex-1 h-full" style={{ backgroundColor: `#${harmonies.analogous[0]}` }} />
                <div className="flex-1 h-full" style={{ backgroundColor: hexString }} />
                <div className="flex-1 h-full" style={{ backgroundColor: `#${harmonies.analogous[1]}` }} />
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <Link href={`/hex/${harmonies.analogous[0]}`}>#{harmonies.analogous[0]}</Link>
                <Link href={`/hex/${hex}`}>#{hex}</Link>
                <Link href={`/hex/${harmonies.analogous[1]}`}>#{harmonies.analogous[1]}</Link>
              </div>
            </div>

            {/* Split-Complementary */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Split-Complementary (150° / 210°)</h3>
                <span className="text-[10px] text-slate-400 font-mono">Soft Contrast</span>
              </div>
              <div className="flex h-16 rounded-xl overflow-hidden shadow-2xs border border-black/10">
                <div className="flex-1 h-full" style={{ backgroundColor: hexString }} />
                <div className="flex-1 h-full" style={{ backgroundColor: `#${harmonies.splitComplementary[0]}` }} />
                <div className="flex-1 h-full" style={{ backgroundColor: `#${harmonies.splitComplementary[1]}` }} />
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <Link href={`/hex/${hex}`}>#{hex}</Link>
                <Link href={`/hex/${harmonies.splitComplementary[0]}`}>#{harmonies.splitComplementary[0]}</Link>
                <Link href={`/hex/${harmonies.splitComplementary[1]}`}>#{harmonies.splitComplementary[1]}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Practical UI Design Recommendations */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Practical UI/UX Design Usage for #{hex}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">Primary Buttons & Focus Rings</h3>
              <p className="text-xs">
                With an RGB luminance of {rgb.r}, {rgb.g}, {rgb.b}, this shade works {passesAAWhite ? 'excellently with white text (#FFFFFF)' : 'best with dark text (#0F172A)'} for call-to-action buttons and form focus states.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">Background Containers</h3>
              <p className="text-xs">
                To use #{hex} as a card background or subtle surface tint, apply an opacity of 5% to 15% (<code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">bg-[#{hex}]/10</code> in Tailwind) to maintain high typography readability.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">Data Visualization & Badges</h3>
              <p className="text-xs">
                Pair with its complementary accent #{harmonies.complementary} or triadic partner #{harmonies.triadic[0]} to distinguish distinct categories in charts and tables.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Related Colors */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Explore More Popular Colors
            </h2>
            <Link href="/colors" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              View All Colors Directory →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {POPULAR_COLORS.slice(0, 6).map(c => (
              <ColorCard key={c.hex} hex={c.hex} name={c.name} />
            ))}
          </div>
        </section>

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
