import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
  ArrowRightLeft,
  Sliders,
  Sparkles,
  Layers,
  Pipette,
  Shuffle,
  Eye,
  Sun,
  BookOpen,
  Code,
  Palette,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color Tools Directory | Color Pickers',
  description: 'Explore our full suite of professional color tools: HEX Color Picker, RGB Converter, HSL Converter, HSV Converter, CMYK Converter, Gradient Generator, Palette Generator, Contrast Checker, Shades Generator, Color Names, and CSS Color Converter.',
};

export default function ToolsDirectoryPage() {
  const tools = [
    {
      title: 'Universal Color Converter',
      href: '/tools/converter',
      icon: ArrowRightLeft,
      color: 'bg-blue-500',
      description: 'Multi-matrix conversion between HEX, RGB, HSL, HSV, CMYK, CSS variables, and Tailwind tokens.',
    },
    {
      title: 'HEX Color Picker & Eyedropper',
      href: '/tools/color-picker',
      icon: Pipette,
      color: 'bg-rose-500',
      description: 'Pick colors visually with eyedropper screen support, interactive color wheel, and one-click copy.',
    },
    {
      title: 'Image Color Picker',
      href: '/tools/image-color-picker',
      icon: Pipette,
      color: 'bg-amber-500',
      description: 'Extract pixel colors, dominant palette swatches, and color harmonies from uploaded images locally.',
    },
    {
      title: 'RGB Converter',
      href: '/tools/hex-to-rgb',
      icon: Sliders,
      color: 'bg-indigo-500',
      description: 'Convert HEX color codes to Red, Green, Blue component channels with interactive sliders.',
    },
    {
      title: 'HSL Converter',
      href: '/tools/hex-to-hsl',
      icon: Sliders,
      color: 'bg-emerald-500',
      description: 'Transform colors into Hue, Saturation, and Lightness representation for fluid styling.',
    },
    {
      title: 'HSV Converter',
      href: '/tools/hex-to-hsv',
      icon: Sliders,
      color: 'bg-amber-600',
      description: 'Calculate Hue, Saturation, and Value model coordinates for graphic design software.',
    },
    {
      title: 'CMYK Converter',
      href: '/tools/hex-to-cmyk',
      icon: Sliders,
      color: 'bg-pink-500',
      description: 'Prepare digital colors for physical printing by converting to Cyan, Magenta, Yellow, Key percentages.',
    },
    {
      title: 'Gradient Generator',
      href: '/tools/gradient-generator',
      icon: Sparkles,
      color: 'bg-purple-500',
      description: 'Design multi-stop linear, radial, and conic CSS gradients with CSS & Tailwind code output.',
    },
    {
      title: 'Color Palette Generator',
      href: '/tools/palette-generator',
      icon: Layers,
      color: 'bg-teal-500',
      description: 'Generate 5-color aesthetic palettes with spacebar locking, color harmony rules, and shareable URLs.',
    },
    {
      title: 'Color Mixer & Blender',
      href: '/tools/color-mixer',
      icon: Sliders,
      color: 'bg-cyan-500',
      description: 'Blend two colors together across customizable ratio percentages and step spectrum scales.',
    },
    {
      title: 'Color Harmonies Suite',
      href: '/tools/color-harmonies',
      icon: Palette,
      color: 'bg-pink-600',
      description: 'Explore complementary, analogous, triadic, tetradic, and split-complementary color wheel schemes.',
    },
    {
      title: 'Color Contrast Checker (WCAG)',
      href: '/tools/color-contrast-checker',
      icon: Eye,
      color: 'bg-blue-600',
      description: 'Check accessibility contrast ratios (WCAG 2.1 AA & AAA compliance) with live UI text preview.',
    },
    {
      title: 'Color Shades Generator',
      href: '/tools/color-shades-generator',
      icon: Sun,
      color: 'bg-orange-500',
      description: 'Generate complete scales of monochromatic tints (white mix), shades (black mix), and tones (gray mix).',
    },
    {
      title: 'Color Names Dictionary',
      href: '/tools/color-names',
      icon: BookOpen,
      color: 'bg-cyan-600',
      description: 'Browse hundreds of curated named shades, official CSS / HTML color names, and search by hex.',
    },
    {
      title: 'CSS Color Converter',
      href: '/tools/css-converter',
      icon: Code,
      color: 'bg-violet-600',
      description: 'Convert colors into modern CSS4, RGBA, HSLA, CSS Variables, Tailwind, Flutter, and Android XML.',
    },
    {
      title: 'Random Color Generator',
      href: '/tools/random-color',
      icon: Shuffle,
      color: 'bg-slate-700',
      description: 'Discover unexpected color inspirations with one-click random generation and history logging.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Color Tools Directory' }]} />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Professional Color Tools Suite
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Fast client-side color utility tools designed for web designers, developers, and digital artists.
          </p>
        </div>

        <AdSlot type="header" />

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => {
            const IconComponent = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xs hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <div className={`w-full h-full rounded-xl ${tool.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Open Tool</span>
                  <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
