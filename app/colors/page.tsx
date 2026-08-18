import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorCard } from '@/components/ColorCard';
import { COLOR_NAMES } from '@/lib/color-names';
import { POPULAR_COLORS, TRENDING_COLORS, PASTEL_COLORS } from '@/lib/popular-colors';
import { Palette, Sparkles, Filter, Sliders } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Colors Directory & Named Color Shades | Color Pickers',
  description:
    'Browse thousands of color codes, standard HTML/CSS color names, trending palettes, pastels, and tonal families with HEX, RGB, and HSL specifications.',
  alternates: {
    canonical: 'https://color-pickers.com/colors',
  },
  openGraph: {
    title: 'Colors Directory & Named Color Shades | Color Pickers',
    description:
      'Browse thousands of color codes, standard HTML/CSS color names, trending palettes, and tonal families.',
    url: 'https://color-pickers.com/colors',
    type: 'website',
  },
};

const COLOR_FAMILIES = [
  {
    name: 'Red & Coral',
    desc: 'Passionate, energetic, and high-visibility hues',
    colors: [
      { name: 'Crimson', hex: 'DC143C' },
      { name: 'Scarlet', hex: 'FF2400' },
      { name: 'Ruby', hex: 'E0115F' },
      { name: 'Fire Engine', hex: 'CE2029' },
      { name: 'Coral Red', hex: 'FF4040' },
      { name: 'Rose Red', hex: 'C21E56' },
      { name: 'Persimmon', hex: 'FF5733' },
      { name: 'Cardinal', hex: 'C41E3A' },
    ],
  },
  {
    name: 'Blue & Azure',
    desc: 'Calming, trustworthy, and digital-first primaries',
    colors: [
      { name: 'Royal Blue', hex: '4169E1' },
      { name: 'Tailwind Blue', hex: '3B82F6' },
      { name: 'Sky Blue', hex: '0EA5E9' },
      { name: 'Navy Blue', hex: '000080' },
      { name: 'Cobalt', hex: '0047AB' },
      { name: 'Electric Azure', hex: '007FFF' },
      { name: 'Indigo Deep', hex: '4F46E5' },
      { name: 'Midnight Blue', hex: '191970' },
    ],
  },
  {
    name: 'Green & Emerald',
    desc: 'Natural, fresh, and high-conversion eco tones',
    colors: [
      { name: 'Emerald', hex: '10B981' },
      { name: 'Forest Green', hex: '228B22' },
      { name: 'Mint Green', hex: '98FF98' },
      { name: 'Jade', hex: '00A86B' },
      { name: 'Olive Green', hex: '808000' },
      { name: 'Teal Green', hex: '0D9488' },
      { name: 'Lime Green', hex: '84CC16' },
      { name: 'Seafoam', hex: '2E8B57' },
    ],
  },
  {
    name: 'Purple & Violet',
    desc: 'Creative, luxurious, and modern UI accent shades',
    colors: [
      { name: 'Purple Accent', hex: '8B5CF6' },
      { name: 'Deep Violet', hex: '7C3AED' },
      { name: 'Rebecca Purple', hex: '663399' },
      { name: 'Fuchsia', hex: 'D946EF' },
      { name: 'Amethyst', hex: '9966CC' },
      { name: 'Lavender', hex: 'E6E6FA' },
      { name: 'Grape', hex: '6F2DA8' },
      { name: 'Plum', hex: 'DDA0DD' },
    ],
  },
  {
    name: 'Yellow, Amber & Orange',
    desc: 'Optimistic, warning, and warm accent highlights',
    colors: [
      { name: 'Amber Gold', hex: 'F59E0B' },
      { name: 'Pure Gold', hex: 'FFD700' },
      { name: 'Tangerine', hex: 'F97316' },
      { name: 'Safety Orange', hex: 'FF7900' },
      { name: 'Sunflower', hex: 'FFC512' },
      { name: 'Bright Yellow', hex: 'EAB308' },
      { name: 'Peach', hex: 'FFDAB9' },
      { name: 'Burnt Orange', hex: 'CC5500' },
    ],
  },
  {
    name: 'Slate, Neutral & Dark',
    desc: 'Sophisticated typography, cards, and dark-mode foundations',
    colors: [
      { name: 'Dark Obsidian', hex: '0F172A' },
      { name: 'Slate Gray', hex: '64748B' },
      { name: 'Cool Gray', hex: '94A3B8' },
      { name: 'Charcoal', hex: '334155' },
      { name: 'Ghost White', hex: 'F8FAFC' },
      { name: 'Zinc Dark', hex: '18181B' },
      { name: 'Warm Stone', hex: '78716C' },
      { name: 'Pure Black', hex: '000000' },
    ],
  },
];

export default function ColorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Colors Directory' }]} />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Palette className="w-3.5 h-3.5" />
            <span>Curated Color Library</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Color Directory & Spectrum Guide
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Explore popular color codes, named HTML/CSS shades, trending pastel palettes, and design-system foundations. Click any color for full RGB, HSL, CMYK, shades, and WCAG accessibility analytics.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Popular Colors Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Most Popular Colors
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Core design tokens used across web interfaces and graphic design
              </p>
            </div>
            <Link
              href="/tools/palette-generator"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Generate Custom Palette →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {POPULAR_COLORS.map(color => (
              <ColorCard key={color.hex} hex={color.hex} name={color.name} />
            ))}
          </div>
        </section>

        {/* Trending Colors */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Trending Modern Colors
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aesthetic accent colors currently trending in UI/UX and SaaS applications
              </p>
            </div>
            <Link
              href="/tools/color-names"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Search 150+ Color Names →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TRENDING_COLORS.map(color => (
              <ColorCard key={color.hex} hex={color.hex} name={color.name} />
            ))}
          </div>
        </section>

        {/* Pastel Colors */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Soft Pastel Colors
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Low-saturation, high-lightness tones for soft backgrounds, illustrations, and calming layouts
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {PASTEL_COLORS.map(color => (
              <ColorCard key={color.hex} hex={color.hex} name={color.name} />
            ))}
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* Color Families Breakdown */}
        <section className="space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Colors by Tonal Family
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore shades grouped by chromatic temperature and emotional resonance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COLOR_FAMILIES.map(fam => (
              <div
                key={fam.name}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-4"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {fam.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {fam.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {fam.colors.map(c => (
                    <Link
                      key={c.hex}
                      href={`/hex/${c.hex}`}
                      className="group flex flex-col p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-all cursor-pointer"
                    >
                      <div
                        className="w-full h-12 rounded-lg mb-2 shadow-2xs border border-black/5 group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: `#${c.hex}` }}
                      />
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {c.name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        #{c.hex}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Section */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            How to Use Color Codes in Digital Design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">
                HEX Representation (#RRGGBB)
              </h3>
              <p className="text-xs">
                Hexadecimal values represent Red, Green, and Blue light intensities on a base-16 scale (00 to FF). It is the universal standard for HTML, CSS, Figma, and mobile application UI development.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">
                RGB & RGBA Models
              </h3>
              <p className="text-xs">
                RGB uses integer values from 0 to 255 for screen rendering. Adding an alpha transparency channel (RGBA) allows designers to build sleek glassmorphic overlays and semi-transparent dropdown menus.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">
                HSL & HSB/HSV Harmony
              </h3>
              <p className="text-xs">
                HSL maps colors to Hue (0°–360°), Saturation (0%–100%), and Lightness (0%–100%). This format is the easiest for programmatic theme generation and accessible contrast calculation.
              </p>
            </div>
          </div>
        </section>

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
