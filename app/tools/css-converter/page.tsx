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
  rgbToHsv,
  rgbToCmyk,
  normalizeHex,
  isValidHex,
} from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import {
  Code,
  Sparkles,
  Shuffle,
  Copy,
  Check,
  FileCode,
  Layers,
  Palette,
} from 'lucide-react';
import Link from 'next/link';
import { ToolSeoContent } from '@/components/ToolSeoContent';

export default function CssColorConverterPage() {
  const [hexInput, setHexInput] = useState('3B82F6');
  const [alpha, setAlpha] = useState(1);

  const cleanHex = normalizeHex(hexInput);
  const rgb = hexToRgb(cleanHex);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const cmyk = rgbToCmyk(rgb);
  const colorName = getClosestColorName(cleanHex).name;

  const handleRandom = () => {
    const random = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    setHexInput(random);
  };

  const cssFormats = [
    {
      label: 'HEX (6-digit)',
      syntax: `#${cleanHex}`,
      desc: 'Standard web hexadecimal code',
    },
    {
      label: 'HEX with Alpha (8-digit)',
      syntax: `#${cleanHex}${Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase()}`,
      desc: 'Hexadecimal with opacity channel',
    },
    {
      label: 'CSS RGB',
      syntax: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      desc: 'CSS modern rgb function',
    },
    {
      label: 'CSS RGBA',
      syntax: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`,
      desc: 'RGB with alpha transparency',
    },
    {
      label: 'CSS HSL',
      syntax: `hsl(${hsl.h}deg, ${hsl.s}%, ${hsl.l}%)`,
      desc: 'Modern CSS hsl format',
    },
    {
      label: 'CSS HSLA',
      syntax: `hsla(${hsl.h}deg, ${hsl.s}%, ${hsl.l}%, ${alpha})`,
      desc: 'HSL with alpha transparency',
    },
    {
      label: 'CSS Color 4 (Modern Space-separated)',
      syntax: `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${Math.round(alpha * 100)}%)`,
      desc: 'CSS Color Module Level 4 syntax',
    },
    {
      label: 'CSS HSL Level 4',
      syntax: `hsl(${hsl.h} ${hsl.s}% ${hsl.l}% / ${Math.round(alpha * 100)}%)`,
      desc: 'Space-separated HSL with slash opacity',
    },
    {
      label: 'Tailwind CSS Arbitrary Value',
      syntax: `bg-[#${cleanHex}] text-[#${cleanHex}]`,
      desc: 'Tailwind CSS JIT utility format',
    },
    {
      label: 'CSS Custom Property (Variable)',
      syntax: `--color-primary: #${cleanHex};`,
      desc: 'Ready to paste in :root CSS block',
    },
    {
      label: 'Android XML Color',
      syntax: `<color name="${colorName.toLowerCase().replace(/\s+/g, '_')}">#FF${cleanHex}</color>`,
      desc: 'Android colors.xml resource format',
    },
    {
      label: 'Flutter / Dart Color',
      syntax: `Color(0xFF${cleanHex})`,
      desc: 'Flutter Color class instantiation',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'CSS Color Converter' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            CSS Color Code Converter & Formatter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Convert any color into production-ready CSS3, CSS Color Module Level 4, Tailwind CSS, Flutter, and Android syntax with custom alpha channel support.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Interactive Master Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs my-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Color Swatch & Alpha Controls */}
            <div className="md:col-span-5 flex flex-col items-center sm:items-start gap-5">
              <div className="flex items-center gap-4 w-full">
                <div
                  className="w-20 h-20 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner flex items-center justify-center shrink-0 relative overflow-hidden"
                  style={{
                    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`,
                  }}
                >
                  <input
                    type="color"
                    value={`#${cleanHex}`}
                    onChange={e => setHexInput(e.target.value.replace('#', ''))}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Input Color HEX
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400 font-bold">#</span>
                    <input
                      type="text"
                      value={hexInput}
                      onChange={e => setHexInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base uppercase font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      maxLength={7}
                    />
                  </div>
                </div>
              </div>

              {/* Opacity / Alpha Slider */}
              <div className="w-full">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  <span>Opacity / Alpha Channel:</span>
                  <span className="font-mono">{Math.round(alpha * 100)}% ({alpha.toFixed(2)})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={alpha}
                  onChange={e => setAlpha(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500">Color Name: <strong>{colorName}</strong></span>
                <button
                  type="button"
                  onClick={handleRandom}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Shuffle className="w-3 h-3" /> Random Color
                </button>
              </div>
            </div>

            {/* Quick Summary Preview in Live Container */}
            <div className="md:col-span-7 bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-100 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-2 font-sans font-bold text-xs text-white">
                  <FileCode className="w-4 h-4 text-blue-400" /> CSS Snippet Output
                </span>
                <span>CSS3 & Modern CSS4</span>
              </div>
              <pre className="overflow-x-auto text-emerald-400 leading-relaxed">
{`.my-color-box {
  /* Legacy CSS3 */
  background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha});
  color: #${cleanHex};

  /* Modern CSS Color Level 4 */
  border-color: hsl(${hsl.h} ${hsl.s}% ${hsl.l}% / ${Math.round(alpha * 100)}%);
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* All CSS Formats List Grid */}
        <div className="my-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Generated Code Formats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cssFormats.map(fmt => (
              <div
                key={fmt.label}
                className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {fmt.label}
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-900 dark:text-white mt-1 select-all truncate">
                    {fmt.syntax}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{fmt.desc}</p>
                </div>

                <div className="shrink-0">
                  <CopyButton textToCopy={fmt.syntax} label="Copy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdSlot type="in-content" />

        {/* In-Depth SEO Landing Page Content */}
        <ToolSeoContent
          toolTitle="CSS Color Code Converter (HEX, RGB, HSL, CSS Variables & Tailwind)"
          toolSlug="css-converter"
          category="Web Development & CSS"
          overviewTitle="The Complete Guide to CSS Color Formats and Syntax"
          overviewParagraphs={[
            'Modern CSS (Cascading Style Sheets) supports a rich variety of color notation formats. While 6-digit hexadecimal (#RRGGBB) remains the historical standard for quick copy-pasting, newer specifications such as CSS Color Module Level 4 introduce comma-less functional notation and dedicated alpha channels.',
            'Using CSS Custom Properties (`--color-primary`) and HSL or modern OKLCH models allows developers to build dynamic dark-mode toggles and thematic token architectures with effortless opacity multipliers.',
            'Our CSS Color Converter transforms any color input into 10+ standard frontend syntaxes including HEX, 8-digit HEXA, CSS3 rgb()/rgba(), CSS HSL, CSS Variables, and ready-to-use Tailwind CSS arbitrary classes.',
          ]}
          howToSteps={[
            {
              step: 'Enter or Randomize Color',
              description: 'Type a 6-digit hex code or pick any shade from the interactive color picker canvas.',
            },
            {
              step: 'Adjust Opacity (Alpha Channel)',
              description: 'Slide the transparency controller between 0.0 (fully transparent) and 1.0 (fully opaque).',
            },
            {
              step: 'Select Preferred CSS Format',
              description: 'Compare syntax styles across CSS Custom Properties, Tailwind CSS classes, RGBA, and HSL.',
            },
            {
              step: 'One-Click Clipboard Copy',
              description: 'Click the "Copy" button next to any generated code block to insert directly into your codebase.',
            },
          ]}
          features={[
            {
              title: '10+ CSS & Framework Formats',
              description: 'Includes HEX, 8-digit HEXA, RGB, RGBA, HSL, HSLA, CSS Variables, and Tailwind syntax.',
            },
            {
              title: 'Dynamic Alpha / Opacity Slider',
              description: 'Test transparent overlay values and export real-time 8-digit hex and fractional alpha percentages.',
            },
            {
              title: 'Ready-to-Paste CSS Snippets',
              description: 'Generates standard `.css` rule blocks with background, color, and border declarations.',
            },
            {
              title: 'Tailwind CSS V3 & V4 Compatibility',
              description: 'Provides exact arbitrary class strings for utility-first styling.',
            },
            {
              title: 'Zero Latency Client-Side Computation',
              description: 'Instant mathematical conversions with no server lag or data collection.',
            },
          ]}
          comparisonTable={{
            headers: ['CSS Notation', 'Example Syntax', 'Browser Support', 'Alpha Channel Support'],
            rows: [
              ['HEX (6-digit)', '#3B82F6', '100% (Universal)', 'No (requires 8-digit #3B82F6FF)'],
              ['CSS rgb()', 'rgb(59, 130, 246)', '100% (Universal)', 'Yes via rgb(59 130 246 / 0.8) in CSS4'],
              ['CSS rgba()', 'rgba(59, 130, 246, 0.85)', '100% (Universal)', 'Yes'],
              ['CSS hsl()', 'hsl(217deg, 91%, 60%)', '99.5% (Modern)', 'Yes via hsla() or CSS4 slash syntax'],
              ['CSS Custom Property', 'var(--color-primary)', '98.5% (Modern)', 'Inherits defined color model'],
            ],
          }}
          faqs={[
            {
              question: 'Why should I use HSL or CSS Variables instead of HEX in CSS?',
              answer: 'HSL separates hue, saturation, and lightness into human-readable numbers. This makes adjusting hover brightness, generating color ramps, and implementing dark themes mathematically straightforward without external design tools.',
            },
            {
              question: 'What is 8-digit Hexadecimal notation?',
              answer: 'An 8-digit HEX code (e.g., `#3B82F6CC`) adds two additional hexadecimal digits at the end to represent the alpha opacity channel from 00 (0% opacity) to FF (100% opacity).',
            },
            {
              question: 'How do I use this color in Tailwind CSS?',
              answer: 'You can use arbitrary class values such as `bg-[#3B82F6]` or `text-[#3B82F6]` in your HTML, or add the color token to your Tailwind theme configuration.',
            },
          ]}
          relatedTools={[
            {
              name: 'HEX to RGB Converter',
              href: '/tools/hex-to-rgb',
              desc: 'Convert hex strings to integer red, green, and blue values.',
            },
            {
              name: 'HEX to HSL Converter',
              href: '/tools/hex-to-hsl',
              desc: 'Convert hex strings to Hue, Saturation, and Lightness percentages.',
            },
            {
              name: 'Gradient Generator',
              href: '/tools/gradient-generator',
              desc: 'Combine CSS color values into multi-stop background gradients.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
