'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CopyButton } from '@/components/CopyButton';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorCard } from '@/components/ColorCard';
import { TrackColorView } from '@/components/TrackColorView';
import {
  normalizeHex,
  isValidHex,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToCmyk,
  isLightColor,
  getContrastRatio,
  getShades,
  getTints,
  getTones,
  getHarmonies,
} from '@/lib/color-utils';
import { getClosestColorName, COLOR_NAMES } from '@/lib/color-names';
import { POPULAR_COLORS } from '@/lib/popular-colors';
import { Check, X, ArrowRight, Palette, Sliders, ExternalLink, Info } from 'lucide-react';

interface PageProps {
  params: Promise<{ code: string }>;
}

export default function HexColorPage({ params }: PageProps) {
  const { code } = use(params);
  let rawCode = (code || '').replace(/%23/g, '').replace(/#/g, '');

  // Handle color name route e.g. /hex/coral
  const matchedByName = COLOR_NAMES.find(
    c => c.name.toLowerCase() === rawCode.toLowerCase()
  );
  if (matchedByName) {
    rawCode = matchedByName.hex;
  }

  if (!isValidHex(rawCode)) {
    notFound();
  }

  const hex = normalizeHex(rawCode);
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const cmyk = rgbToCmyk(rgb);
  const closest = getClosestColorName(hex);
  const isLight = isLightColor(rgb);

  // WCAG Contrast against White and Black
  const contrastWhite = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
  const contrastBlack = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });

  const passesAAWhite = contrastWhite >= 4.5;
  const passesAAAWhite = contrastWhite >= 7.0;
  const passesAABlack = contrastBlack >= 4.5;
  const passesAAABlack = contrastBlack >= 7.0;

  // Shades, Tints, Tones, Harmonies
  const shades = getShades(hex, 8);
  const tints = getTints(hex, 8);
  const tones = getTones(hex, 8);
  const harmonies = getHarmonies(hex);

  // Structured Data (JSON-LD Schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `#${hex} Color Code - ${closest.name}`,
    description: `Complete color information for #${hex}, including RGB, HSL, CMYK values, color harmonies, shades, tints, and CSS codes.`,
    mainEntity: {
      '@type': 'Thing',
      name: `#${hex} ${closest.name}`,
      alternateName: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <TrackColorView hex={hex} name={closest.name} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'HEX Colors', href: '/' },
            { label: `#${hex} (${closest.name})` },
          ]}
        />

        {/* AdSlot Header */}
        <AdSlot type="header" />

        {/* Hero Banner Swatch */}
        <section className="my-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Swatch Box */}
            <div className="lg:col-span-5 flex flex-col">
              <div
                className="w-full h-64 sm:h-80 rounded-2xl p-6 flex flex-col justify-between shadow-inner relative overflow-hidden transition-all duration-300"
                style={{ backgroundColor: `#${hex}` }}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs backdrop-blur-md ${
                      isLight
                        ? 'bg-black/10 border-black/10 text-slate-900'
                        : 'bg-white/20 border-white/20 text-white'
                    }`}
                  >
                    {closest.name} ({closest.category || 'Custom'})
                  </span>
                  <CopyButton
                    textToCopy={`#${hex}`}
                    label={`#${hex}`}
                    variant="badge"
                    size="md"
                  />
                </div>

                <div>
                  <div
                    className={`font-mono text-4xl sm:text-5xl font-extrabold tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    #{hex}
                  </div>
                  <div
                    className={`text-sm font-semibold opacity-90 mt-1 ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    RGB: {rgb.r}, {rgb.g}, {rgb.b}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Specs Overview */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 uppercase">
                    Color Overview
                  </span>
                  <span className="text-xs text-slate-400">HEX #{hex}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  #{hex} Color Code Information
                </h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  In the RGB color space, <strong className="text-slate-900 dark:text-white">#{hex}</strong> is composed of{' '}
                  <span className="font-mono">{Math.round((rgb.r / 255) * 100)}% red</span>,{' '}
                  <span className="font-mono">{Math.round((rgb.g / 255) * 100)}% green</span>, and{' '}
                  <span className="font-mono">{Math.round((rgb.b / 255) * 100)}% blue</span>. In the HSL color space, it has a hue of{' '}
                  <span className="font-mono">{hsl.h}°</span>, saturation of{' '}
                  <span className="font-mono">{hsl.s}%</span>, and lightness of{' '}
                  <span className="font-mono">{hsl.l}%</span>.
                </p>
              </div>

              {/* Conversion Value Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[10px] font-bold uppercase text-slate-400">HEX</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-base">
                    #{hex}
                  </div>
                  <CopyButton textToCopy={`#${hex}`} label="Copy" variant="ghost" size="sm" className="mt-1" />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[10px] font-bold uppercase text-slate-400">RGB</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm truncate">
                    {rgb.r}, {rgb.g}, {rgb.b}
                  </div>
                  <CopyButton textToCopy={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} label="Copy" variant="ghost" size="sm" className="mt-1" />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[10px] font-bold uppercase text-slate-400">HSL</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm truncate">
                    {hsl.h}°, {hsl.s}%, {hsl.l}%
                  </div>
                  <CopyButton textToCopy={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} label="Copy" variant="ghost" size="sm" className="mt-1" />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[10px] font-bold uppercase text-slate-400">HSV</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm truncate">
                    {hsv.h}°, {hsv.s}%, {hsv.v}%
                  </div>
                  <CopyButton textToCopy={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`} label="Copy" variant="ghost" size="sm" className="mt-1" />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[10px] font-bold uppercase text-slate-400">CMYK</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm truncate">
                    {cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%
                  </div>
                  <CopyButton textToCopy={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} label="Copy" variant="ghost" size="sm" className="mt-1" />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Name Match</div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                    {closest.name}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Closest Standard</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSlot In Content */}
        <AdSlot type="in-content" />

        {/* Content Section with Desktop Sidebar Ad */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* CSS Code Snippets & Tailwind Preview */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                CSS Code & Tailwind Declarations
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Ready-to-use style sheets and arbitrary classes for web development.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CSS Variables */}
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-400">
                    <span>CSS Variables</span>
                    <CopyButton
                      textToCopy={`--color-primary: #${hex};\ncolor: var(--color-primary);\nbackground-color: #${hex};`}
                      label="Copy CSS"
                      variant="ghost"
                      size="sm"
                    />
                  </div>
                  <pre className="overflow-x-auto leading-relaxed">
{`:root {
  --color-brand: #${hex};
}

.element {
  color: #${hex};
  background: #${hex};
}`}
                  </pre>
                </div>

                {/* Tailwind CSS Classes */}
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-400">
                    <span>Tailwind v4 Classes</span>
                    <CopyButton
                      textToCopy={`bg-[#${hex}] text-[#${hex}] border-[#${hex}]`}
                      label="Copy Tailwind"
                      variant="ghost"
                      size="sm"
                    />
                  </div>
                  <pre className="overflow-x-auto leading-relaxed">
{`<!-- Tailwind Arbitrary -->
<div className="bg-[#${hex}]
  text-[#${hex}]
  border-[#${hex}]">
  #${hex}
</div>`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Shades */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Shades of #{hex} (Darker Variations)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Progressively mixed with black for depth, borders, and shadows.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {shades.map(s => (
                  <Link
                    key={s.hex}
                    href={`/hex/${s.hex.replace('#', '')}`}
                    className="group flex flex-col gap-1 text-center"
                  >
                    <div
                      className="w-full h-14 rounded-xl border border-black/10 shadow-inner transition-transform group-hover:scale-105"
                      style={{ backgroundColor: s.hex }}
                    />
                    <span className="font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">
                      {s.hex}
                    </span>
                    <span className="text-[10px] text-slate-400">{s.percent}%</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Tints */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Tints of #{hex} (Lighter Variations)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Progressively mixed with pure white for subtle backgrounds and badges.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {tints.map(t => (
                  <Link
                    key={t.hex}
                    href={`/hex/${t.hex.replace('#', '')}`}
                    className="group flex flex-col gap-1 text-center"
                  >
                    <div
                      className="w-full h-14 rounded-xl border border-black/10 shadow-inner transition-transform group-hover:scale-105"
                      style={{ backgroundColor: t.hex }}
                    />
                    <span className="font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">
                      {t.hex}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.percent}%</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Tones */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Tones of #{hex} (Muted Variations)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Mixed with neutral gray to create soft, low-contrast variants.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {tones.map(t => (
                  <Link
                    key={t.hex}
                    href={`/hex/${t.hex.replace('#', '')}`}
                    className="group flex flex-col gap-1 text-center"
                  >
                    <div
                      className="w-full h-14 rounded-xl border border-black/10 shadow-inner transition-transform group-hover:scale-105"
                      style={{ backgroundColor: t.hex }}
                    />
                    <span className="font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">
                      {t.hex}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.percent}%</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column: Responsive Desktop Sidebar Ad + Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Specs Sidebar Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                Color Summary
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Color Name</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{closest.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Luminance</span>
                  <span className="font-mono text-slate-900 dark:text-white">{isLight ? 'Light (Bright)' : 'Dark (Deep)'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Hue Angle</span>
                  <span className="font-mono text-slate-900 dark:text-white">{hsl.h}° ({hsl.h < 60 ? 'Warm' : hsl.h < 180 ? 'Green' : hsl.h < 260 ? 'Cool/Blue' : 'Purple/Pink'})</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Print Ink (K)</span>
                  <span className="font-mono text-slate-900 dark:text-white">{cmyk.k}% Key Black</span>
                </div>
              </div>
            </div>

            {/* Desktop Sidebar AdSlot (Responsive on Mobile below content) */}
            <div className="sticky top-20">
              <AdSlot type="sidebar" />
            </div>
          </div>
        </div>

        {/* Color Harmonies */}
        <section className="my-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Harmonious Color Palettes for #{hex}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Calculated color schemes based on classic geometric color wheel angles for graphic and web design.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(harmonies).map(harmony => (
              <div
                key={harmony.name}
                className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/50"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {harmony.name}
                  </span>
                  <CopyButton
                    textToCopy={harmony.colors.map(c => c.hex).join(', ')}
                    label="Copy Scheme"
                    variant="ghost"
                    size="sm"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {harmony.colors.map(col => (
                    <Link
                      key={col.hex + col.label}
                      href={`/hex/${col.hex.replace('#', '')}`}
                      className="group flex flex-col rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                      <div
                        className="h-16 w-full"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div className="p-2 bg-white dark:bg-slate-900 text-center">
                        <div className="font-mono text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                          {col.hex}
                        </div>
                        <div className="text-[10px] text-slate-400">{col.label}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WCAG Contrast & Accessibility Test */}
        <section className="my-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            WCAG Accessibility Contrast Ratios
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Verification against Web Content Accessibility Guidelines (WCAG 2.1) standards for web text readability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Against White */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              <div
                className="w-full h-24 rounded-xl p-4 flex items-center justify-center font-bold text-lg border border-black/10"
                style={{ backgroundColor: `#${hex}`, color: '#FFFFFF' }}
              >
                Sample Text on #{hex} Background
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-600 dark:text-slate-400">
                  Contrast Ratio against Pure White (#FFFFFF):
                </span>
                <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                  {contrastWhite} : 1
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`p-2.5 rounded-lg flex items-center justify-between font-semibold ${
                    passesAAWhite
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  <span>WCAG AA (4.5:1)</span>
                  {passesAAWhite ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
                <div
                  className={`p-2.5 rounded-lg flex items-center justify-between font-semibold ${
                    passesAAAWhite
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  <span>WCAG AAA (7.0:1)</span>
                  {passesAAAWhite ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
              </div>
            </div>

            {/* Against Black */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              <div
                className="w-full h-24 rounded-xl p-4 flex items-center justify-center font-bold text-lg border border-black/10"
                style={{ backgroundColor: `#${hex}`, color: '#000000' }}
              >
                Sample Text on #{hex} Background
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-600 dark:text-slate-400">
                  Contrast Ratio against Pure Black (#000000):
                </span>
                <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                  {contrastBlack} : 1
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`p-2.5 rounded-lg flex items-center justify-between font-semibold ${
                    passesAABlack
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  <span>WCAG AA (4.5:1)</span>
                  {passesAABlack ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
                <div
                  className={`p-2.5 rounded-lg flex items-center justify-between font-semibold ${
                    passesAAABlack
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  <span>WCAG AAA (7.0:1)</span>
                  {passesAAABlack ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar & Trending Colors Section */}
        <section className="my-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Related Popular Colors
            </h2>
            <Link
              href="/"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Explore more colors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {POPULAR_COLORS.slice(0, 6).map(c => (
              <ColorCard key={c.hex} hex={c.hex} name={c.name} />
            ))}
          </div>
        </section>

        {/* Footer AdSlot */}
        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
