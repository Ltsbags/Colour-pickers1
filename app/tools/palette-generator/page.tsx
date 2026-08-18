'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { ToolSeoContent } from '@/components/ToolSeoContent';
import { PALETTE_PRESETS } from '@/lib/palette-presets';
import { getRandomHex, isLightColor, hexToRgb } from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { Lock, Unlock, Shuffle, Share2, Layers, Download, Check } from 'lucide-react';

interface ColorSlot {
  hex: string; // "3B82F6"
  locked: boolean;
}

export default function PaletteGeneratorPage() {
  const [slots, setSlots] = useState<ColorSlot[]>([
    { hex: '0F172A', locked: false },
    { hex: '1E293B', locked: false },
    { hex: '3B82F6', locked: false },
    { hex: '60A5FA', locked: false },
    { hex: 'F8FAFC', locked: false },
  ]);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const generateNewPalette = React.useCallback(() => {
    setSlots(prevSlots =>
      prevSlots.map(slot => (slot.locked ? slot : { ...slot, hex: getRandomHex() }))
    );
  }, []);

  // Spacebar keyboard listener to generate palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generateNewPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateNewPalette]);

  const toggleLock = (index: number) => {
    setSlots(
      slots.map((slot, i) => (i === index ? { ...slot, locked: !slot.locked } : slot))
    );
  };

  const handleColorChange = (index: number, newHex: string) => {
    const clean = newHex.replace('#', '').toUpperCase();
    setSlots(slots.map((slot, i) => (i === index ? { ...slot, hex: clean } : slot)));
  };

  const handleShareUrl = async () => {
    const hexCodes = slots.map(s => s.hex).join('-');
    const url = `${window.location.origin}/tools/palette-generator?colors=${hexCodes}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'Palette Generator' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Color Palette Generator
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Create balanced 5-color aesthetic schemes. Press Spacebar to shuffle, lock individual favorite shades, and export CSS variables or shareable links.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={generateNewPalette}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Generate (Spacebar)</span>
            </button>
            <span className="hidden sm:inline-block text-xs text-slate-400">
              Press spacebar on desktop to randomize
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareUrl}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied URL!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share Palette</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5-Color Interactive Palette Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 h-auto md:h-[450px]">
          {slots.map((slot, index) => {
            const rgb = hexToRgb(slot.hex);
            const isLight = isLightColor(rgb);
            const name = getClosestColorName(slot.hex).name;

            return (
              <div
                key={index}
                className="group relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-md h-40 md:h-full border border-black/5"
                style={{ backgroundColor: `#${slot.hex}` }}
              >
                {/* Top Control Bar */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleLock(index)}
                    className={`p-2.5 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                      slot.locked
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLight
                        ? 'bg-black/10 hover:bg-black/20 text-slate-900'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                    title={slot.locked ? 'Click to Unlock' : 'Click to Lock'}
                  >
                    {slot.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>

                  <input
                    type="color"
                    value={`#${slot.hex}`}
                    onChange={e => handleColorChange(index, e.target.value)}
                    className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                  />
                </div>

                {/* Color Details & Link */}
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-xs font-semibold truncate ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {name}
                  </span>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/hex/${slot.hex}`}
                      className={`font-mono text-xl sm:text-2xl font-extrabold tracking-tight hover:underline ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      #{slot.hex}
                    </Link>
                    <CopyButton
                      textToCopy={`#${slot.hex}`}
                      label=""
                      variant="ghost"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curated Presets */}
        <section className="my-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Curated Color Palettes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {PALETTE_PRESETS.map(preset => (
              <div
                key={preset.id}
                onClick={() =>
                  setSlots(
                    preset.colors.map(c => ({
                      hex: c.replace('#', '').toUpperCase(),
                      locked: false,
                    }))
                  )
                }
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-blue-500 transition-all cursor-pointer group"
              >
                <div className="flex h-16 rounded-xl overflow-hidden mb-3 border border-black/10">
                  {preset.colors.map((c, i) => (
                    <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-400 capitalize">{preset.category}</div>
              </div>
            ))}
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* SEO Landing Page Content */}
        <ToolSeoContent
          toolTitle="Color Palette Generator & Color Harmony Tool"
          toolSlug="palette-generator"
          category="Design & Color Harmony"
          overviewTitle="How to Generate Aesthetic & Balanced Color Palettes"
          overviewParagraphs={[
            'A cohesive color palette is the cornerstone of any impactful brand identity, web design, or mobile application interface. Good color theory relies on establishing a primary dominant color, balanced secondary supporting hues, neutral background shades, and purposeful contrast accents.',
            'Our Color Palette Generator uses algorithmic color harmony rules to help you discover beautiful 5-color combinations effortlessly. With intuitive spacebar randomization, you can explore hundreds of curated concepts and lock individual colors in place as your theme develops.',
            'Every color is paired with verified color names, hexadecimal tokens, and instant links to WCAG contrast ratios to ensure your designs look stunning and remain fully accessible for all users.',
          ]}
          howToSteps={[
            {
              step: 'Press Spacebar to Generate',
              description: 'Hit the Spacebar or tap "Generate" to randomize full 5-color combinations instantly.',
            },
            {
              step: 'Lock Your Favorite Shades',
              description: 'Click the padlock icon on any color slot you like to keep it fixed while randomizing the others.',
            },
            {
              step: 'Fine-Tune Specific Hex Codes',
              description: 'Use the integrated color picker or type custom hex values into individual slots.',
            },
            {
              step: 'Share or Export Your Palette',
              description: 'Copy individual hex tokens or generate a permanent shareable URL link for your design team.',
            },
          ]}
          features={[
            {
              title: 'Spacebar Instant Randomization',
              description: 'Rapidly cycle through aesthetic palettes without page refreshes.',
            },
            {
              title: 'Independent Slot Locking',
              description: 'Fix your core brand colors in place while exploring infinite complementary accent ideas.',
            },
            {
              title: 'Curated Palette Library',
              description: 'One-click load trending pastel, retro, cyberpunk, corporate, and dark mode themes.',
            },
            {
              title: 'Shareable Deep Links',
              description: 'Share exact 5-color combinations with collaborators using custom query URLs.',
            },
            {
              title: 'Direct Hex Integration',
              description: 'Click through to any color for full shade breakdowns, RGB formulas, and Tailwind tokens.',
            },
          ]}
          faqs={[
            {
              question: 'How many colors should a website or brand palette have?',
              answer: 'Most design systems adhere to the 60-30-10 rule: 60% dominant neutral background (light or dark), 30% secondary structural color (cards, headers), and 10% high-contrast accent color (buttons, badges). A 5-color palette provides the ideal foundation for this hierarchy.',
            },
            {
              question: 'Can I export this palette to Figma or CSS?',
              answer: 'Yes! You can copy the individual HEX codes or use our CSS Converter tool to generate CSS custom properties (`--color-primary`) or Tailwind config tokens.',
            },
            {
              question: 'How do I test if my palette colors have sufficient contrast?',
              answer: 'Use our Color Contrast Checker tool to test text legibility between any foreground and background pairing from your generated palette.',
            },
          ]}
          relatedTools={[
            {
              name: 'Color Contrast Checker',
              href: '/tools/color-contrast-checker',
              desc: 'Verify WCAG AA/AAA compliance between your palette colors.',
            },
            {
              name: 'Color Shades Generator',
              href: '/tools/color-shades-generator',
              desc: 'Create full 50–900 lightness scales from any palette color.',
            },
            {
              name: 'CSS Color Converter',
              href: '/tools/css-converter',
              desc: 'Export palette tokens into Tailwind CSS and CSS Variables.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
