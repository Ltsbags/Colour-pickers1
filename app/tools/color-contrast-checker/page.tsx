'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  getLuminance,
  normalizeHex,
  getContrastRatio,
  isLightColor,
} from '@/lib/color-utils';
import {
  CheckCircle2,
  XCircle,
  Shuffle,
  Type,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { ToolSeoContent } from '@/components/ToolSeoContent';

function getSuggestedAccessibleColor(fg: string, bg: string, targetRatio: number = 4.5): string {
  const bgRgb = hexToRgb(bg);
  const fgRgb = hexToRgb(fg);
  const currentRatio = getContrastRatio(fgRgb, bgRgb);
  if (currentRatio >= targetRatio) return fg;

  const bgLum = getLuminance(bgRgb);
  const isBgLight = bgLum > 0.5;

  const fgHsl = rgbToHsl(fgRgb);

  if (isBgLight) {
    for (let l = fgHsl.l; l >= 0; l -= 1) {
      const testRgb = hslToRgb({ ...fgHsl, l });
      if (getContrastRatio(testRgb, bgRgb) >= targetRatio) {
        return rgbToHex(testRgb);
      }
    }
    return '000000';
  } else {
    for (let l = fgHsl.l; l <= 100; l += 1) {
      const testRgb = hslToRgb({ ...fgHsl, l });
      if (getContrastRatio(testRgb, bgRgb) >= targetRatio) {
        return rgbToHex(testRgb);
      }
    }
    return 'FFFFFF';
  }
}

export default function ContrastCheckerPage() {
  const [fgHex, setFgHex] = useState('0F172A');
  const [bgHex, setBgHex] = useState('FFFFFF');
  const [customText, setCustomText] = useState('Sphinx of black quartz, judge my vow.');

  const cleanFg = normalizeHex(fgHex);
  const cleanBg = normalizeHex(bgHex);

  const fgRgb = hexToRgb(cleanFg);
  const bgRgb = hexToRgb(cleanBg);

  const ratio = getContrastRatio(fgRgb, bgRgb);

  const compliance = {
    normalAA: ratio >= 4.5,
    largeAA: ratio >= 3.0,
    normalAAA: ratio >= 7.0,
    largeAAA: ratio >= 4.5,
    uiComponents: ratio >= 3.0,
  };

  const suggestedAA = !compliance.normalAA
    ? getSuggestedAccessibleColor(cleanFg, cleanBg, 4.5)
    : null;
  const suggestedAAA = !compliance.normalAAA
    ? getSuggestedAccessibleColor(cleanFg, cleanBg, 7.0)
    : null;

  const swapColors = () => {
    setFgHex(cleanBg);
    setBgHex(cleanFg);
  };

  const presetPairs = [
    { name: 'Dark on Light (High Contrast)', fg: '0F172A', bg: 'FFFFFF' },
    { name: 'Light on Dark (Dark Mode)', fg: 'F8FAFC', bg: '0F172A' },
    { name: 'Brand Indigo on Slate', fg: '4F46E5', bg: 'F8FAFC' },
    { name: 'Amber on Dark Navy', fg: 'F59E0B', bg: '0F172A' },
    { name: 'Emerald on Mint Soft', fg: '065F46', bg: 'D1FAE5' },
    { name: 'Low Contrast Sample', fg: '94A3B8', bg: 'FFFFFF' },
  ];

  const handleRandomFg = () => {
    const random = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    setFgHex(random);
  };

  const handleRandomBg = () => {
    const random = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    setBgHex(random);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'Color Contrast Checker' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            WCAG Color Contrast Checker
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Test foreground and background color combinations according to Web Content Accessibility Guidelines (WCAG 2.1) Level AA & AAA specifications.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Live Preview & Score Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                <span>Color Inputs</span>
                <button
                  type="button"
                  onClick={swapColors}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Swap Colors ⇄
                </button>
              </h2>

              {/* Text / Foreground Color Input */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between mb-1.5">
                    <span>Text (Foreground) Color</span>
                    <button
                      type="button"
                      onClick={handleRandomFg}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer font-normal"
                    >
                      <Shuffle className="w-3 h-3" /> Random
                    </button>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={`#${cleanFg}`}
                      onChange={e => setFgHex(e.target.value.replace('#', ''))}
                      className="w-12 h-12 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer shrink-0 bg-transparent p-0.5"
                    />
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400 font-bold">#</span>
                      <input
                        type="text"
                        value={fgHex}
                        onChange={e => setFgHex(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm uppercase font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        maxLength={7}
                      />
                    </div>
                    <CopyButton textToCopy={`#${cleanFg}`} label="Copy" variant="ghost" size="sm" />
                  </div>
                </div>

                {/* Background Color Input */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between mb-1.5">
                    <span>Background Color</span>
                    <button
                      type="button"
                      onClick={handleRandomBg}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer font-normal"
                    >
                      <Shuffle className="w-3 h-3" /> Random
                    </button>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={`#${cleanBg}`}
                      onChange={e => setBgHex(e.target.value.replace('#', ''))}
                      className="w-12 h-12 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer shrink-0 bg-transparent p-0.5"
                    />
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400 font-bold">#</span>
                      <input
                        type="text"
                        value={bgHex}
                        onChange={e => setBgHex(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm uppercase font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        maxLength={7}
                      />
                    </div>
                    <CopyButton textToCopy={`#${cleanBg}`} label="Copy" variant="ghost" size="sm" />
                  </div>
                </div>
              </div>

              {/* Suggested Accessible Color Card (if failing) */}
              {(suggestedAA || suggestedAAA) && (
                <div className="mt-5 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>Suggested Accessible Foreground</span>
                  </div>
                  {suggestedAA && (
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded-md border border-black/10 shrink-0"
                          style={{ backgroundColor: `#${suggestedAA}` }}
                        />
                        <span className="font-mono font-bold text-slate-900 dark:text-white">#{suggestedAA}</span>
                        <span className="text-[10px] text-slate-500">(Passes 4.5:1 AA)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFgHex(suggestedAA)}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                      >
                        Apply AA
                      </button>
                    </div>
                  )}
                  {suggestedAAA && (
                    <div className="flex items-center justify-between gap-2 text-xs pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded-md border border-black/10 shrink-0"
                          style={{ backgroundColor: `#${suggestedAAA}` }}
                        />
                        <span className="font-mono font-bold text-slate-900 dark:text-white">#{suggestedAAA}</span>
                        <span className="text-[10px] text-slate-500">(Passes 7.0:1 AAA)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFgHex(suggestedAAA)}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                      >
                        Apply AAA
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Sample Preset Pairs */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
                  Quick Sample Presets
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {presetPairs.map(preset => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setFgHex(preset.fg);
                        setBgHex(preset.bg);
                      }}
                      className="p-2 text-left rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors flex items-center gap-2 cursor-pointer bg-slate-50/50 dark:bg-slate-800/40"
                    >
                      <div className="flex -space-x-1 shrink-0">
                        <span
                          className="w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-2xs"
                          style={{ backgroundColor: `#${preset.fg}` }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-2xs"
                          style={{ backgroundColor: `#${preset.bg}` }}
                        />
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results, WCAG Badges & Live Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Score Banner */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Contrast Ratio
                </span>
                <div className="text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                  {ratio.toFixed(2)} : 1
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {ratio >= 7
                    ? 'Excellent — Passes strict WCAG AAA guidelines for all sizes'
                    : ratio >= 4.5
                    ? 'Good — Passes standard WCAG AA body text requirements'
                    : ratio >= 3
                    ? 'Fair — Passes WCAG AA for large text & UI elements only'
                    : 'Poor — Fails WCAG accessibility guidelines. Hard to read.'}
                </p>
              </div>

              {/* Compliance Matrix Grid */}
              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                <div
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center ${
                    compliance.normalAA
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase">Small Text (AA)</span>
                  <span className="text-base font-extrabold mt-0.5 flex items-center gap-1">
                    {compliance.normalAA ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {compliance.normalAA ? 'Pass (4.5:1)' : 'Fail'}
                  </span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center ${
                    compliance.largeAA
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase">Large Text (AA)</span>
                  <span className="text-base font-extrabold mt-0.5 flex items-center gap-1">
                    {compliance.largeAA ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {compliance.largeAA ? 'Pass (3.0:1)' : 'Fail'}
                  </span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center ${
                    compliance.normalAAA
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase">Small Text (AAA)</span>
                  <span className="text-base font-extrabold mt-0.5 flex items-center gap-1">
                    {compliance.normalAAA ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {compliance.normalAAA ? 'Pass (7.0:1)' : 'Fail'}
                  </span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center ${
                    compliance.largeAAA
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase">Large Text (AAA)</span>
                  <span className="text-base font-extrabold mt-0.5 flex items-center gap-1">
                    {compliance.largeAAA ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {compliance.largeAAA ? 'Pass (4.5:1)' : 'Fail'}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Interactive UI Test Preview Box */}
            <div
              className="rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-md transition-colors flex flex-col justify-between min-h-[300px]"
              style={{
                backgroundColor: `#${cleanBg}`,
                color: `#${cleanFg}`,
              }}
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                  Live Visual Rendering Preview
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  Design for Everyone, Everywhere.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed font-medium">
                  {customText}
                </p>
                <p className="text-xs opacity-80 leading-normal">
                  Body text sample: High contrast ensures that people with low vision, color blindness, or users viewing screens under direct bright sunlight can read your content without eye fatigue.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t flex flex-wrap items-center gap-3" style={{ borderColor: `#${cleanFg}25` }}>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-sm"
                  style={{
                    backgroundColor: `#${cleanFg}`,
                    color: `#${cleanBg}`,
                  }}
                >
                  Interactive Button
                </button>
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                  style={{ borderColor: `#${cleanFg}60` }}
                >
                  Secondary Pill
                </div>
              </div>
            </div>

            {/* Custom Text Sample Input */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Type className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                placeholder="Type custom preview text here..."
                className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-200 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        <AdSlot type="in-content" />

        {/* In-Depth SEO Landing Page Content */}
        <ToolSeoContent
          toolTitle="WCAG Color Contrast Checker (AA / AAA Compliance)"
          toolSlug="color-contrast-checker"
          category="Web Accessibility & Standards"
          overviewTitle="Understanding WCAG 2.1 Color Contrast Standards"
          overviewParagraphs={[
            'Web Content Accessibility Guidelines (WCAG 2.1 / 2.2) require adequate visual contrast between text characters and their background colors so that individuals with low vision, color blindness, or age-related vision loss can read content effortlessly.',
            'Color contrast ratio is expressed on a scale from 1:1 (lowest contrast, e.g., white text on white background) to 21:1 (highest contrast, e.g., black text on white background). The mathematical formula evaluates the relative luminance of both colors.',
            'Our Color Contrast Checker evaluates real-time ratios against both WCAG AA (minimum baseline) and WCAG AAA (enhanced criteria) for small body text, large display headings, and graphical interface elements.',
          ]}
          howToSteps={[
            {
              step: 'Enter Foreground (Text) Color',
              description: 'Type or paste a 6-digit hex code or choose a color from the native color picker.',
            },
            {
              step: 'Enter Background Color',
              description: 'Select your card, surface, or page background color to test the pair.',
            },
            {
              step: 'Inspect Contrast Ratio & WCAG Score',
              description: 'Review the calculated ratio score (e.g. 4.5:1, 7.0:1) and the pass/fail indicators for Level AA and AAA.',
            },
            {
              step: 'Live Preview Custom Text',
              description: 'Type custom headings and paragraphs into the live typography preview to verify legibility before exporting.',
            },
          ]}
          features={[
            {
              title: 'Precise WCAG 2.1 Formula Engine',
              description: 'Calculates exact relative luminance using sRGB gamma-expanded luminance coefficients.',
            },
            {
              title: 'AA and AAA Tier Breakdowns',
              description: 'Validates normal text (16px), large text (18pt / 24px), and graphical user interface components.',
            },
            {
              title: 'Quick Swap & Color Inversion',
              description: 'Swap foreground and background colors with a single click to test dark mode parity.',
            },
            {
              title: 'Interactive Typography Sandbox',
              description: 'Preview realistic body copy, subheaders, and button elements in real time.',
            },
            {
              title: 'Curated Accessible Presets',
              description: 'Test accessible color pairings designed for modern digital user interfaces.',
            },
          ]}
          comparisonTable={{
            headers: ['Standard Level', 'Small / Normal Text', 'Large Text (18pt+ / 14pt bold)', 'UI Elements & Icons'],
            rows: [
              ['WCAG AA (Minimum)', '4.5 : 1', '3.0 : 1', '3.0 : 1'],
              ['WCAG AAA (Enhanced)', '7.0 : 1', '4.5 : 1', 'N/A (3.0:1 recommended)'],
              ['Failing / Inaccessible', 'Below 4.5 : 1', 'Below 3.0 : 1', 'Below 3.0 : 1'],
            ],
          }}
          faqs={[
            {
              question: 'What is the difference between WCAG AA and AAA?',
              answer: 'Level AA is the globally accepted legal benchmark for most websites, public sector portals, and commercial software. Level AAA is the gold standard offering optimal legibility for users with severe visual impairments.',
            },
            {
              question: 'Does color contrast affect Google Search rankings?',
              answer: 'Yes. Google includes accessibility, tap target legibility, and usability signals in Page Experience evaluations and Lighthouse performance audits.',
            },
            {
              question: 'What counts as "Large Text" under WCAG?',
              answer: 'Large text is defined as text that is at least 18 point (typically 24px) regular weight, or 14 point (typically 18.66px) bold weight.',
            },
          ]}
          relatedTools={[
            {
              name: 'Color Palette Generator',
              href: '/tools/palette-generator',
              desc: 'Generate accessible 5-color schemes with built-in contrast safety.',
            },
            {
              name: 'Color Shades Generator',
              href: '/tools/color-shades-generator',
              desc: 'Find darker or lighter variations of your brand color to meet 4.5:1 ratios.',
            },
            {
              name: 'CSS Color Converter',
              href: '/tools/css-converter',
              desc: 'Convert verified color pairs to standard CSS variables and Tailwind tokens.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
