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
import { Pipette, Palette, Copy, Check, Sparkles } from 'lucide-react';

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
      setBrowserNotice('The Eyedropper API is supported in Chrome, Edge, and Opera desktop browsers.');
      setTimeout(() => setBrowserNotice(null), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'Color Picker & Eyedropper' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            HEX Color Picker & Online Eyedropper
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Pick colors directly from your screen, inspect hexadecimal and RGB coordinates, adjust color channels interactively, and export design tokens in seconds.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Color Picker Interactive Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Main Picker Card */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs flex flex-col items-center gap-6">
            {/* Color Preview Block */}
            <div
              className="w-full h-48 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col items-center justify-center relative overflow-hidden transition-all shadow-inner"
              style={{ backgroundColor: `#${cleanHex}` }}
            >
              <div
                className={`text-center px-4 py-2 rounded-xl backdrop-blur-md transition-colors ${
                  isLight ? 'bg-black/10 text-slate-900' : 'bg-white/15 text-white'
                }`}
              >
                <div className="text-2xl font-black font-mono tracking-wider">#{cleanHex}</div>
                <div className="text-xs font-semibold opacity-90">{name}</div>
              </div>
            </div>

            {/* Quick Picker Controls */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleEyeDropper}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <Pipette className="w-4 h-4" /> Pick from Screen
              </button>

              <div className="relative flex items-center justify-center py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer">
                <Palette className="w-4 h-4 mr-2" /> Open Color Wheel
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
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between gap-6">
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
              className="w-full text-center py-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Explore Full Color Specs & Harmonies →
            </Link>
          </div>
        </div>

        <AdSlot type="in-content" />

        {/* Comprehensive SEO Content Section */}
        <ToolSeoContent
          toolTitle="HEX Color Picker & Online Eyedropper"
          toolSlug="color-picker"
          category="Color Utility"
          overviewTitle="How Does the Online Screen Eyedropper & Color Picker Work?"
          overviewParagraphs={[
            'Our online color picker combines native browser Eyedropper API technology with full-spectrum RGB/HSL color synthesis. Instead of taking a screenshot, opening an external graphics editor, and magnifying pixels, you can sample any pixel directly from your desktop screen, web pages, or photos with a single click.',
            'Once sampled, the color is analyzed across digital color models (Hexadecimal, RGB, HSL, HSV, CMYK) and matched with our comprehensive dictionary of named color pigments.',
            'Whether you are building a design system in CSS, inspecting website palettes, or selecting harmonious accents, this tool provides real-time conversions, WCAG accessibility ratios, and one-click clipboard copying.',
          ]}
          howToSteps={[
            {
              step: 'Click "Pick from Screen"',
              description: 'Activate the native browser magnifying glass eyedropper tool to sample any color pixel on your screen.',
            },
            {
              step: 'Or Use the Visual Color Wheel',
              description: 'Select colors visually with standard color sliders and saturation gradients.',
            },
            {
              step: 'View Converted Values',
              description: 'Review mathematical representations in HEX, RGB, HSL, HSV, and CMYK format.',
            },
            {
              step: 'Copy or Explore Further',
              description: 'Copy code snippets to your clipboard or navigate directly to the detailed deep-dive color page.',
            },
          ]}
          features={[
            {
              title: 'Native Eyedropper API',
              description: 'Sample colors from any window, document, or screen area in supported browsers.',
            },
            {
              title: 'Multi-Model Sync',
              description: 'Simultaneously generates HEX, RGB, HSL, and CMYK values without manual conversion.',
            },
            {
              title: 'Local History Logging',
              description: 'Automatically saves recently sampled colors in your browser session for easy retrieval.',
            },
            {
              title: 'Harmonies & Contrast Links',
              description: 'Direct deep-linking to color harmonies, complementary schemes, and contrast testing.',
            },
            {
              title: 'Fast Client-Side Processing',
              description: 'All color operations run locally in your browser without requiring server roundtrips.',
            },
          ]}
          faqs={[
            {
              question: 'Which browsers support the Screen Eyedropper tool?',
              answer: 'The Eyedropper API is supported natively on Chromium-based desktop browsers including Google Chrome, Microsoft Edge, Opera, and Brave. On other browsers, you can utilize the interactive color wheel.',
            },
            {
              question: 'Can I pick colors outside my browser window?',
              answer: 'Yes! When using supported desktop browsers, the Eyedropper tool can sample colors from any application running on your monitor.',
            },
            {
              question: 'How do I save a color palette I sampled?',
              answer: 'Sampled colors are saved into your session history, which you can easily export into the Color Palette Generator or copy as CSS variables.',
            },
          ]}
          relatedTools={[
            {
              name: 'Color Contrast Checker',
              href: '/tools/color-contrast-checker',
              desc: 'Check if your picked color meets WCAG AA/AAA legibility standards.',
            },
            {
              name: 'Color Palette Generator',
              href: '/tools/palette-generator',
              desc: 'Build 5-color aesthetic schemes around your picked color.',
            },
            {
              name: 'CSS Color Converter',
              href: '/tools/css-converter',
              desc: 'Convert picked colors into Tailwind, CSS variables, and Flutter code.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
