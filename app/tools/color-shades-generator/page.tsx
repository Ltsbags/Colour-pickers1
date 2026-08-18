'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import {
  hexToRgb,
  normalizeHex,
  getShades,
  getTints,
  getTones,
} from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import {
  Shuffle,
  Sun,
  Moon,
  Layers,
} from 'lucide-react';
import Link from 'next/link';
import { ToolSeoContent } from '@/components/ToolSeoContent';

export default function ColorShadesGeneratorPage() {
  const [baseHex, setBaseHex] = useState('3B82F6');
  const [stepsCount, setStepsCount] = useState<number>(10);

  const cleanHex = normalizeHex(baseHex);
  const colorName = getClosestColorName(cleanHex).name;

  const shades = getShades(cleanHex, stepsCount);
  const tints = getTints(cleanHex, stepsCount);
  const tones = getTones(cleanHex, stepsCount);

  const handleRandom = () => {
    const random = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    setBaseHex(random);
  };

  const presetColors = [
    { name: 'Bright Blue', hex: '3B82F6' },
    { name: 'Emerald Green', hex: '10B981' },
    { name: 'Persimmon Red', hex: 'EF4444' },
    { name: 'Amber Gold', hex: 'F59E0B' },
    { name: 'Purple Violet', hex: '8B5CF6' },
    { name: 'Rose Pink', hex: 'F43F5E' },
    { name: 'Cyan Aqua', hex: '06B6D4' },
    { name: 'Slate Gray', hex: '64748B' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'Color Shades Generator' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Color Shades, Tints & Tones Generator
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Generate monochromatic color scales, lighter tints (mixed with white), darker shades (mixed with black), and muted tones (mixed with gray) for your design system.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Input Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs my-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <input
                type="color"
                value={`#${cleanHex}`}
                onChange={e => setBaseHex(e.target.value.replace('#', ''))}
                className="w-14 h-14 rounded-2xl border border-slate-300 dark:border-slate-700 cursor-pointer shrink-0 bg-transparent p-1 shadow-xs"
              />
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Base Color Hex
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400 font-bold">#</span>
                  <input
                    type="text"
                    value={baseHex}
                    onChange={e => setBaseHex(e.target.value)}
                    className="pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base uppercase font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-36"
                    maxLength={7}
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Name</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{colorName}</span>
              </div>
            </div>

            {/* Quick Actions & Step Slider */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Steps:</span>
                {[5, 10, 15].map(step => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setStepsCount(step)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      stepsCount === step
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleRandom}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" /> Random
              </button>
            </div>
          </div>

          {/* Preset Swatches */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Popular Bases:</span>
            {presetColors.map(preset => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => setBaseHex(preset.hex)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-500 transition-colors text-xs font-medium cursor-pointer"
              >
                <span className="w-3 h-3 rounded-full shadow-2xs" style={{ backgroundColor: `#${preset.hex}` }} />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 1. TINTS (Mixed with White) */}
        <section className="my-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <span>Tints (Lighter Scales — Mixed with White)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ideal for soft backgrounds, surface overlays, and hover states
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-11 gap-3">
            {tints.map(item => {
              const hexVal = item.hex.replace('#', '');
              return (
                <div
                  key={`tint-${item.hex}-${item.percent}`}
                  className="group flex flex-col rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xs transition-all hover:scale-105"
                >
                  <div
                    className="h-20 w-full flex items-center justify-center relative transition-colors"
                    style={{ backgroundColor: item.hex }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton textToCopy={item.hex} />
                    </div>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 text-center">
                    <Link
                      href={`/hex/${hexVal}`}
                      className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-500 transition-colors block"
                    >
                      {item.hex}
                    </Link>
                    <span className="text-[10px] text-slate-400">
                      {item.percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. SHADES (Mixed with Black) */}
        <section className="my-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-500" />
                <span>Shades (Darker Scales — Mixed with Black)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ideal for dark mode surfaces, text accents, active buttons, and shadows
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-11 gap-3">
            {shades.map(item => {
              const hexVal = item.hex.replace('#', '');
              return (
                <div
                  key={`shade-${item.hex}-${item.percent}`}
                  className="group flex flex-col rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xs transition-all hover:scale-105"
                >
                  <div
                    className="h-20 w-full flex items-center justify-center relative transition-colors"
                    style={{ backgroundColor: item.hex }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton textToCopy={item.hex} />
                    </div>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 text-center">
                    <Link
                      href={`/hex/${hexVal}`}
                      className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-500 transition-colors block"
                    >
                      {item.hex}
                    </Link>
                    <span className="text-[10px] text-slate-400">
                      {item.percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. TONES (Mixed with Neutral Gray) */}
        <section className="my-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-slate-500" />
                <span>Tones (Desaturated Scales — Mixed with Gray)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ideal for subtle muted borders, inactive components, and atmospheric depth
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-11 gap-3">
            {tones.map(item => {
              const hexVal = item.hex.replace('#', '');
              return (
                <div
                  key={`tone-${item.hex}-${item.percent}`}
                  className="group flex flex-col rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xs transition-all hover:scale-105"
                >
                  <div
                    className="h-20 w-full flex items-center justify-center relative transition-colors"
                    style={{ backgroundColor: item.hex }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton textToCopy={item.hex} />
                    </div>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 text-center">
                    <Link
                      href={`/hex/${hexVal}`}
                      className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-500 transition-colors block"
                    >
                      {item.hex}
                    </Link>
                    <span className="text-[10px] text-slate-400">
                      {item.percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* In-Depth SEO Landing Page Content */}
        <ToolSeoContent
          toolTitle="Color Shades, Tints & Tones Generator"
          toolSlug="color-shades-generator"
          category="Color Theory & Scales"
          overviewTitle="The Difference Between Tints, Shades, and Tones in Design Systems"
          overviewParagraphs={[
            'In classical color theory and modern design system engineering (like Tailwind CSS and Material Design), a single base color is expanded into a complete mathematical color scale comprising Tints, Shades, and Tones.',
            'A **Tint** is produced by adding pure white to a base hue, increasing its lightness without altering its hue angle. A **Shade** is produced by adding pure black to a base hue, reducing its lightness. A **Tone** is produced by adding neutral gray (equal parts black and white), reducing the color saturation and vibrance.',
            'Generating systematic shades and tints allows product teams to build accessible hover states, subtle background card fills, active borders, and harmonious dark-mode palettes from any single brand color.',
          ]}
          howToSteps={[
            {
              step: 'Enter Your Base Brand Color',
              description: 'Type a 6-digit hex code or pick a color using the interactive visual color picker.',
            },
            {
              step: 'Select Step Resolution',
              description: 'Choose your desired scale granularity (5 steps for rapid prototypes, 10 steps for 50–900 design tokens, or 20 steps for granular gradients).',
            },
            {
              step: 'Explore Tints, Shades & Tones',
              description: 'Review the generated monochromatic ramps categorized into pure tints, rich dark shades, and muted desaturated tones.',
            },
            {
              step: 'Copy Hex Tokens or Navigate Details',
              description: 'Hover over any color swatch to copy its hex value or click to explore deep color analytics.',
            },
          ]}
          features={[
            {
              title: 'Mathematical Lightness Interpolation',
              description: 'Generates step-by-step increments with linear RGB color mixing without color clipping.',
            },
            {
              title: 'Complete Three-Way Matrix',
              description: 'Simultaneously generates Tints (White mix), Shades (Black mix), and Tones (Gray mix).',
            },
            {
              title: 'Adjustable Granularity (5, 10, 20 Steps)',
              description: 'Matches standard 50 to 950 design system steps used by Tailwind CSS and Radix UI.',
            },
            {
              title: 'One-Click Swatch Copying',
              description: 'Easily grab specific hex codes directly to your clipboard for rapid development.',
            },
            {
              title: 'Instant Deep-Linking',
              description: 'Each generated swatch links directly to its full contrast and conversion profile page.',
            },
          ]}
          comparisonTable={{
            headers: ['Term', 'Mixing Agent', 'Visual Effect', 'Common UI Use Case'],
            rows: [
              ['Tint', '+ Pure White (#FFFFFF)', 'Lighter, softer pastel', 'Hover states, subtle card fills, badges'],
              ['Shade', '+ Pure Black (#000000)', 'Darker, deeper, richer', 'Active/pressed states, dark mode surfaces, text'],
              ['Tone', '+ Neutral Gray (#808080)', 'Muted, desaturated, softer', 'Disabled buttons, inactive borders, secondary text'],
            ],
          }}
          faqs={[
            {
              question: 'How do I use these shades in Tailwind CSS?',
              answer: 'You can map these 10 generated tints and shades directly into your `tailwind.config.ts` under `theme.colors[brand]` ranging from 50 (lightest tint) to 950 (darkest shade).',
            },
            {
              question: 'Why not just use CSS opacity instead of tints?',
              answer: 'CSS opacity causes the underlying background elements to bleed through, which often fails WCAG contrast requirements. True mathematical tints create opaque, solid surfaces that render consistently across all layers.',
            },
            {
              question: 'How are tones created mathematically?',
              answer: 'Tones are created by linearly blending the RGB values of the base color with a medium neutral gray (RGB: 128, 128, 128) across varying percentage increments.',
            },
          ]}
          relatedTools={[
            {
              name: 'Color Contrast Checker',
              href: '/tools/color-contrast-checker',
              desc: 'Test whether your generated shades provide sufficient contrast against white or black.',
            },
            {
              name: 'CSS Color Converter',
              href: '/tools/css-converter',
              desc: 'Convert any shade into HSL, OKLCH, or CSS variable formats.',
            },
            {
              name: 'Gradient Generator',
              href: '/tools/gradient-generator',
              desc: 'Blend two generated shades into a smooth linear or radial CSS gradient.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
