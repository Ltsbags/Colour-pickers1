'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { ToolSeoContent } from '@/components/ToolSeoContent';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  isValidHex,
  normalizeHex,
  getHarmonies,
  isLightColor,
} from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { Palette, Sparkles, Shuffle, Layers, Info } from 'lucide-react';

export default function ColorHarmoniesPage() {
  const [baseHex, setBaseHex] = useState('3B82F6');

  const cleanHex = isValidHex(baseHex) ? normalizeHex(baseHex) : '3B82F6';
  const rgb = hexToRgb(cleanHex);
  const hsl = rgbToHsl(rgb);
  const colorName = getClosestColorName(cleanHex).name;

  const rotateHue = (degrees: number) => (hsl.h + degrees + 360) % 360;

  const complementary = rgbToHex(hslToRgb({ ...hsl, h: rotateHue(180) }));
  const analogous = [
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(-30) })),
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(30) })),
  ];
  const triadic = [
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(120) })),
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(240) })),
  ];
  const splitComplementary = [
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(150) })),
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(210) })),
  ];
  const tetradic = [
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(90) })),
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(180) })),
    rgbToHex(hslToRgb({ ...hsl, h: rotateHue(270) })),
  ];
  const monochromatic = [
    rgbToHex(hslToRgb({ ...hsl, l: Math.max(10, hsl.l - 30) })),
    rgbToHex(hslToRgb({ ...hsl, l: Math.max(10, hsl.l - 15) })),
    cleanHex,
    rgbToHex(hslToRgb({ ...hsl, l: Math.min(90, hsl.l + 15) })),
    rgbToHex(hslToRgb({ ...hsl, l: Math.min(90, hsl.l + 30) })),
  ];

  const harmonyCategories = [
    {
      title: 'Complementary Color (180°)',
      desc: 'Opposite on the color wheel. Maximum dynamic contrast and visual excitement.',
      colors: [cleanHex, complementary],
    },
    {
      title: 'Analogous Palette (±30°)',
      desc: 'Adjacent on the color wheel. Serene, unified, and natural visual harmony.',
      colors: [analogous[0], cleanHex, analogous[1]],
    },
    {
      title: 'Triadic Scheme (120° / 240°)',
      desc: 'Equidistant triangle around the hue wheel. Vibrant balance with rich variety.',
      colors: [cleanHex, triadic[0], triadic[1]],
    },
    {
      title: 'Split-Complementary (150° / 210°)',
      desc: 'High contrast with less tension than pure complementary combinations.',
      colors: [cleanHex, splitComplementary[0], splitComplementary[1]],
    },
    {
      title: 'Tetradic / Rectangular (90° / 180° / 270°)',
      desc: 'Four colors arranged in two complementary pairs. Complex, rich palette.',
      colors: [cleanHex, tetradic[0], tetradic[1], tetradic[2]],
    },
    {
      title: 'Monochromatic Tonal Variations',
      desc: 'Same hue with calibrated saturation and lightness steps. Clean and elegant.',
      colors: monochromatic,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'Color Harmonies & Theory Suite' },
          ]}
        />

        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Color Theory Calculations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Color Harmonies & Palette Schemes
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Generate complementary, analogous, triadic, split-complementary, and tetradic color harmonies based on optical chromatic wheel geometry.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Base Color Selector Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={`#${cleanHex}`}
                onChange={e => setBaseHex(e.target.value.replace('#', ''))}
                className="w-12 h-12 rounded-2xl cursor-pointer bg-transparent border-0"
              />
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Base Color Code</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                    #{cleanHex}
                  </span>
                  <span className="text-xs text-slate-500">({colorName})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={baseHex}
                onChange={e => setBaseHex(e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6))}
                placeholder="3B82F6"
                className="font-mono uppercase px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setBaseHex(Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'))}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Random</span>
              </button>
            </div>
          </div>
        </div>

        {/* Harmony Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {harmonyCategories.map(cat => (
            <div
              key={cat.title}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="font-bold text-base text-slate-900 dark:text-white">
                  {cat.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cat.desc}
                </p>
              </div>

              {/* Color Strips */}
              <div className="flex h-20 w-full rounded-2xl overflow-hidden shadow-2xs border border-black/10">
                {cat.colors.map((hexCode, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-full relative group"
                    style={{ backgroundColor: `#${hexCode}` }}
                  >
                    <Link
                      href={`/hex/${hexCode}`}
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center text-[11px] font-mono font-bold text-white transition-opacity"
                    >
                      #{hexCode}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Swatch chips with copy buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {cat.colors.map((c, i) => (
                    <Link
                      key={i}
                      href={`/hex/${c}`}
                      className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:border-emerald-500 flex items-center gap-1.5"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                        style={{ backgroundColor: `#${c}` }}
                      />
                      <span>#{c}</span>
                    </Link>
                  ))}
                </div>

                <CopyButton
                  textToCopy={cat.colors.map(c => `#${c}`).join(', ')}
                  label="Copy Palette"
                  size="sm"
                  variant="secondary"
                />
              </div>
            </div>
          ))}
        </div>

        <AdSlot type="in-content" />

        {/* SEO Landing Content */}
        <ToolSeoContent
          toolTitle="Color Harmonies & Classical Palette Rules"
          toolSlug="color-harmonies"
          category="Color Theory & Harmony Schemes"
          overviewTitle="Understanding Classical Color Harmony Formulas"
          overviewParagraphs={[
            'Color harmony refers to the aesthetically pleasing arrangement of colors based on geometric relationships within the color wheel. Introduced by Sir Isaac Newton and refined by artists like Johannes Itten and Josef Albers, these geometric intervals create visual balance and evoke specific emotional responses.',
            'Our Color Harmonies tool automatically calculates angular hue rotations on the cylindrical 360-degree color wheel, giving you mathematically precise complementary, analogous, triadic, tetradic, and split-complementary schemes for any hex color.',
          ]}
          howToSteps={[
            {
              step: 'Enter or Pick Your Base Hue',
              description: 'Select your key brand color or enter its 6-digit hex code.',
            },
            {
              step: 'Explore Generated Schemes',
              description: 'Examine 6 distinct harmony models computed directly from your base hue.',
            },
            {
              step: 'Inspect Individual Colors',
              description: 'Hover any swatch to view its hex code or click through for WCAG accessibility testing.',
            },
            {
              step: 'Export for CSS & Figma',
              description: 'Copy individual hex tokens or export entire palette strings with one click.',
            },
          ]}
          features={[
            {
              title: '360° Color Wheel Mathematics',
              description: 'Computes exact degree offsets across the cylindrical HSL color spectrum.',
            },
            {
              title: '6 Classical Harmony Models',
              description: 'Complementary, Analogous, Triadic, Split-Complementary, Tetradic, and Monochromatic.',
            },
            {
              title: 'One-Click Palette Copy',
              description: 'Copy multi-stop hex strings directly into code or design systems.',
            },
            {
              title: 'Interactive Randomizer',
              description: 'Generate endless harmonious color sets with the spacebar or shuffle button.',
            },
          ]}
          faqs={[
            {
              question: 'What is a complementary color?',
              answer: 'A complementary color sits directly 180° opposite your base color on the color wheel. When placed side by side, they create maximum contrast and visual vibrancy.',
            },
            {
              question: 'When should I use an analogous color scheme?',
              answer: 'Analogous colors sit next to each other (usually within 30° to 60°). They are ideal for natural, tranquil, and cohesive user interfaces such as healthcare, editorial, or wellness apps.',
            },
            {
              question: 'What is the difference between Triadic and Tetradic?',
              answer: 'Triadic schemes use 3 equidistant colors (120° apart), while Tetradic schemes use 4 colors arranged in 2 complementary pairs (rectangles), offering richer variety at the cost of requiring more careful visual balance.',
            },
          ]}
          relatedTools={[
            {
              name: 'Palette Generator',
              href: '/tools/palette-generator',
              desc: 'Interactive 5-color palette generator with lock and spacebar controls.',
            },
            {
              name: 'Shades & Tints Generator',
              href: '/tools/shades-generator',
              desc: 'Generate light, dark, and desaturated steps for any color.',
            },
            {
              name: 'Contrast Checker',
              href: '/tools/color-contrast-checker',
              desc: 'Verify that your harmonious colors pass WCAG AA/AAA text readability.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
