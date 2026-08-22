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
  isLightColor,
  getContrastRatio,
  isValidHex,
  normalizeHex,
} from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { Sliders, Sparkles, ArrowRightLeft, Shuffle, Check } from 'lucide-react';

export default function ColorMixerPage() {
  const [color1, setColor1] = useState('3B82F6'); // Blue
  const [color2, setColor2] = useState('EC4899'); // Pink
  const [ratio, setRatio] = useState(50); // 50% blend

  const clean1 = isValidHex(color1) ? normalizeHex(color1) : '3B82F6';
  const clean2 = isValidHex(color2) ? normalizeHex(color2) : 'EC4899';

  const rgb1 = hexToRgb(clean1);
  const rgb2 = hexToRgb(clean2);

  // Linear Interpolation
  const blendFactor = ratio / 100;
  const blendedRgb = {
    r: Math.round(rgb1.r * (1 - blendFactor) + rgb2.r * blendFactor),
    g: Math.round(rgb1.g * (1 - blendFactor) + rgb2.g * blendFactor),
    b: Math.round(rgb1.b * (1 - blendFactor) + rgb2.b * blendFactor),
  };

  const blendedHex = rgbToHex(blendedRgb);
  const blendedHsl = rgbToHsl(blendedRgb);
  const blendedName = getClosestColorName(blendedHex).name;
  const isLight = isLightColor(blendedRgb);

  // Generate 11-step blend gradient
  const steps = 11;
  const blendSteps = Array.from({ length: steps }).map((_, i) => {
    const factor = i / (steps - 1);
    const r = Math.round(rgb1.r * (1 - factor) + rgb2.r * factor);
    const g = Math.round(rgb1.g * (1 - factor) + rgb2.g * factor);
    const b = Math.round(rgb1.b * (1 - factor) + rgb2.b * factor);
    const hex = rgbToHex({ r, g, b });
    return {
      percent: Math.round(factor * 100),
      hex,
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'Color Mixer & Blender' },
          ]}
        />

        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
            <Sliders className="w-3.5 h-3.5" />
            <span>Linear Color Interpolation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Color Mixer & Blend Studio
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Mix two colors in any proportion to calculate precise intermediate color values, smooth step gradients, and CSS variables.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Main Mixer Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          {/* Dual Color Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Color 1 */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-slate-400">Color 1 ({100 - ratio}%)</label>
                <div
                  className="w-6 h-6 rounded-md shadow-2xs border border-black/10"
                  style={{ backgroundColor: `#${clean1}` }}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${clean1}`}
                  onChange={e => setColor1(e.target.value.replace('#', ''))}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={e => setColor1(e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6))}
                  placeholder="3B82F6"
                  className="flex-1 font-mono uppercase px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Mixer Ratio Slider in Center */}
            <div className="space-y-3 text-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Mixing Ratio: {ratio}% Color 2
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={ratio}
                onChange={e => setRatio(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 px-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Color 2 */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-slate-400">Color 2 ({ratio}%)</label>
                <div
                  className="w-6 h-6 rounded-md shadow-2xs border border-black/10"
                  style={{ backgroundColor: `#${clean2}` }}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${clean2}`}
                  onChange={e => setColor2(e.target.value.replace('#', ''))}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={e => setColor2(e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6))}
                  placeholder="EC4899"
                  className="flex-1 font-mono uppercase px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Result Blended Swatch Banner */}
          <div className="space-y-4">
            <div
              className="w-full h-32 sm:h-40 rounded-3xl shadow-inner border border-black/10 flex flex-col justify-between p-6 transition-colors"
              style={{ backgroundColor: `#${blendedHex}` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isLight ? 'bg-black/20 text-slate-900' : 'bg-white/20 text-white'
                  }`}
                >
                  Result: {blendedName}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                    isLight ? 'bg-black/20 text-slate-900' : 'bg-white/20 text-white'
                  }`}
                >
                  #{blendedHex}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Link
                  href={`/hex/${blendedHex}`}
                  className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all ${
                    isLight
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Inspect Color Details →
                </Link>
              </div>
            </div>

            {/* Formats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">HEX</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">#{blendedHex}</span>
                  <CopyButton textToCopy={`#${blendedHex}`} size="sm" variant="ghost" />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">RGB</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                    {blendedRgb.r}, {blendedRgb.g}, {blendedRgb.b}
                  </span>
                  <CopyButton
                    textToCopy={`rgb(${blendedRgb.r}, ${blendedRgb.g}, ${blendedRgb.b})`}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">HSL</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                    {blendedHsl.h}°, {blendedHsl.s}%, {blendedHsl.l}%
                  </span>
                  <CopyButton
                    textToCopy={`hsl(${blendedHsl.h}, ${blendedHsl.s}%, ${blendedHsl.l}%)`}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">CSS Variable</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">--blend</span>
                  <CopyButton textToCopy={`--color-blend: #${blendedHex};`} size="sm" variant="ghost" />
                </div>
              </div>
            </div>
          </div>

          {/* Stepped Blend Gradient Strip */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              11-Step Transition Spectrum
            </h3>
            <div className="grid grid-cols-11 gap-1 h-14 rounded-2xl overflow-hidden shadow-2xs border border-black/10">
              {blendSteps.map((st, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setRatio(st.percent)}
                  title={`${st.percent}% blend: #${st.hex}`}
                  className="h-full relative group transition-transform hover:scale-105 hover:z-10 cursor-pointer"
                  style={{ backgroundColor: `#${st.hex}` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/30 text-[9px] font-mono text-white flex items-center justify-center font-bold">
                    {st.percent}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <AdSlot type="in-content" />

        {/* SEO Landing Content */}
        <ToolSeoContent
          toolTitle="Color Mixer & Dual Spectrum Blend Tool"
          toolSlug="color-mixer"
          category="Color Mathematics & Blending"
          overviewTitle="How Color Mixing & Linear Interpolation Works"
          overviewParagraphs={[
            'Our online Color Mixer performs real-time mathematical interpolation between any two input colors. By calculating weighted averages across the Red, Green, and Blue light channels (or in perceptual HSL space), it produces flawless transition steps and harmonious midpoint values.',
            'This tool is essential for UI designers crafting smooth button hover states, interactive slider tracks, multi-stop CSS gradient stops, or data visualization color scales.',
          ]}
          howToSteps={[
            {
              step: 'Choose Base Color 1',
              description: 'Type a hex code or pick the starting color using the interactive color wheel.',
            },
            {
              step: 'Choose Target Color 2',
              description: 'Select the ending color to mix against.',
            },
            {
              step: 'Adjust Mixing Ratio',
              description: 'Drag the slider between 0% and 100% to control the exact proportion of both shades.',
            },
            {
              step: 'Copy Result & Inspect Steps',
              description: 'Copy the blended HEX, RGB, or CSS variables, or click any step along the 11-step spectrum.',
            },
          ]}
          features={[
            {
              title: 'Real-Time RGB Interpolation',
              description: 'Performs 24-bit linear RGB channel blending directly in your browser.',
            },
            {
              title: 'Interactive 11-Step Gradient',
              description: 'Visual spectrum showing the exact color steps between the two colors.',
            },
            {
              title: 'CSS Variable Export',
              description: 'Generate production-ready CSS variables and Tailwind arbitrary tokens.',
            },
            {
              title: 'One-Click Details',
              description: 'Navigate straight to deep accessibility reports for any resulting blend.',
            },
          ]}
          faqs={[
            {
              question: 'How is the color mix calculated?',
              answer: 'We compute a weighted linear interpolation across the RGB light channels: New_Channel = (Color1_Channel * (1 - ratio)) + (Color2_Channel * ratio).',
            },
            {
              question: 'Can I mix translucent or transparent colors?',
              answer: 'Yes! You can convert the mixed hex value to RGBA or HSLA using our CSS converter tool to apply alpha transparency.',
            },
          ]}
          relatedTools={[
            {
              name: 'CSS Gradient Generator',
              href: '/tools/gradient-generator',
              desc: 'Generate multi-color linear and radial CSS backgrounds.',
            },
            {
              name: 'Color Shades Generator',
              href: '/tools/shades-generator',
              desc: 'Create lighter and darker tonal variations of any single color.',
            },
            {
              name: 'Universal Color Converter',
              href: '/tools/converter',
              desc: 'Convert any color between HEX, RGB, HSL, HSV, and CMYK.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
