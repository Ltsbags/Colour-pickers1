'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { ColorCard } from '@/components/ColorCard';
import { CopyButton } from '@/components/CopyButton';
import { HeroColorPickerCard } from '@/components/HeroColorPickerCard';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';
import { RecentHistorySection } from '@/components/RecentHistorySection';
import { POPULAR_COLORS, TRENDING_COLORS, PASTEL_COLORS, RECENT_COLORS_DEFAULT } from '@/lib/popular-colors';
import { normalizeHex, isValidHex, getRandomHex, hexToRgb } from '@/lib/color-utils';
import { searchColorNames } from '@/lib/color-names';
import { addToColorHistory } from '@/lib/color-history';
import {
  Search,
  Sparkles,
  ArrowRight,
  Sliders,
  Layers,
  Pipette,
  ArrowRightLeft,
  Shuffle,
  Check,
  ChevronDown,
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentHex, setCurrentHex] = useState('3B82F6');
  const [recentColors, setRecentColors] = useState<string[]>(RECENT_COLORS_DEFAULT);
  const [copiedPaletteName, setCopiedPaletteName] = useState<string | null>(null);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim() || currentHex;
    const raw = query.replace(/^#/, '');

    if (isValidHex(raw)) {
      const clean = normalizeHex(raw);
      addToColorHistory(clean);
      router.push(`/hex/${clean}`);
    } else {
      const nameMatches = searchColorNames(query, 1);
      if (nameMatches.length > 0) {
        addToColorHistory(nameMatches[0].hex, nameMatches[0].name);
        router.push(`/hex/${nameMatches[0].hex}`);
      } else {
        addToColorHistory(currentHex);
        router.push(`/hex/${currentHex}`);
      }
    }
  };

  const handleRandomClick = () => {
    const randomHex = getRandomHex();
    setCurrentHex(randomHex);
    addToColorHistory(randomHex);
  };

  const latestPalettes = [
    {
      name: 'Ocean Breeze',
      colors: ['00C9A7', '00587A', '0088B2', '4FB5D6'],
    },
    {
      name: 'Sunset Glow',
      colors: ['FF2A2A', 'FF6B00', 'FFA800', 'FFD000'],
    },
    {
      name: 'Forest Vibes',
      colors: ['1E824C', '2ECC71', '1B4D2E', '4B6B12'],
    },
    {
      name: 'Purple Dream',
      colors: ['3A0066', '8A2BE2', 'D946EF', 'FF66C4'],
    },
    {
      name: 'Pastel Love',
      colors: ['FF9EAA', 'FFD3E0', 'C0D6E4', '80E5FF'],
    },
    {
      name: 'Deep Ocean',
      colors: ['0A2540', '0066B2', '004080', '005F73'],
    },
  ];

  const toolsList = [
    {
      title: 'Color Converter',
      desc: 'Instant HEX, RGB, HSL, HSV, CMYK conversions',
      href: '/tools/converter',
      icon: ArrowRightLeft,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Gradient Generator',
      desc: 'Multi-stop CSS & Tailwind gradients',
      href: '/tools/gradient-generator',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Palette Generator',
      desc: 'Spacebar randomizer & color harmonies',
      href: '/tools/palette-generator',
      icon: Layers,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Color Picker',
      desc: 'Screen Eyedropper & fine-tuning wheel',
      href: '/tools/color-picker',
      icon: Pipette,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const handleCopyPalette = async (paletteName: string, colors: string[]) => {
    const formatted = colors.map(c => `#${c}`).join(', ');
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedPaletteName(paletteName);
      setTimeout(() => setCopiedPaletteName(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* AdSlot Header */}
        <AdSlot type="header" />

        {/* Hero Section */}
        <section className="relative pt-4 pb-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline, Description & Quick Search */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>The Ultimate Color Toolkit</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Explore. Create. <br />
                Convert{' '}
                <span className="inline-inline-flex">
                  <span className="text-purple-600">C</span>
                  <span className="text-pink-500">o</span>
                  <span className="text-amber-500">l</span>
                  <span className="text-lime-500">o</span>
                  <span className="text-blue-500">r</span>
                  <span className="text-indigo-500">s</span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Pick colors, generate palettes, convert formats and get beautiful combinations for your next project.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Color Picker</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-900/60 text-pink-600 dark:text-pink-300 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Palettes</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Converter</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-300 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>100% Free</span>
                </div>
              </div>

              {/* Quick Search & Convert Bar */}
              <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-2 pt-2 max-w-xl">
                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="color hex, name, rgb, hsl..."
                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                {/* Swatch dropdown indicator */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs">
                  <div
                    className="w-7 h-7 rounded-lg border border-black/10 shadow-2xs transition-colors"
                    style={{ backgroundColor: `#${currentHex}` }}
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>

                <button
                  type="submit"
                  className="px-5 py-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-sm rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
                >
                  Get Info
                </button>
              </form>
            </div>

            {/* Right Column: Hand-drawn annotation & Interactive Color Picker Card */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              {/* Playful Handwritten Annotation */}
              <div className="hidden sm:flex absolute -top-8 right-6 items-center gap-2 text-indigo-500 dark:text-indigo-400 font-serif italic text-sm select-none pointer-events-none z-10">
                <span>Pick your perfect color ✨</span>
                <svg
                  className="w-8 h-8 text-indigo-400 transform rotate-12"
                  viewBox="0 0 50 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M10 10 C 25 5, 35 25, 20 40" />
                  <path d="M12 35 L20 40 L22 30" />
                </svg>
              </div>

              {/* Interactive Color Picker Widget Card */}
              <HeroColorPickerCard
                currentHex={currentHex}
                onColorChange={hex => {
                  setCurrentHex(hex);
                  addToColorHistory(hex);
                }}
              />
            </div>
          </div>
        </section>

        {/* Recent History Section (Last 10 Colors) */}
        <RecentHistorySection />

        {/* Hero Bottom Advertisement */}
        <AdSlot type="hero-bottom" />

        {/* Latest Palettes Section */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Latest Palettes
            </h2>
            <Link
              href="/tools/palette-generator"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {latestPalettes.map(palette => {
              const isCopied = copiedPaletteName === palette.name;
              return (
                <div
                  key={palette.name}
                  onClick={() => handleCopyPalette(palette.name, palette.colors)}
                  className="group p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl hover:shadow-md hover:border-purple-500/50 transition-all cursor-pointer flex flex-col gap-3"
                >
                  {/* 4 Strip Color Palette Box */}
                  <div className="flex h-14 w-full rounded-xl overflow-hidden shadow-2xs border border-black/5">
                    {palette.colors.map((c, idx) => (
                      <div
                        key={idx}
                        className="flex-1 h-full transition-transform group-hover:scale-105"
                        style={{ backgroundColor: `#${c}` }}
                        title={`#${c}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">
                      {palette.name}
                    </span>
                    {isCopied ? (
                      <span className="text-[10px] text-emerald-500 font-bold">Copied!</span>
                    ) : (
                      <span className="text-[10px] text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 font-mono">
                        Copy
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Tools Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Featured Color Tools
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Zero-latency color processing tools built into your browser
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>View All Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolsList.map(tool => {
              const IconComp = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xs hover:shadow-lg hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${tool.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                    <span>Try Tool</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* AdSlot In Content */}
        <AdSlot type="in-content" />

        {/* Live Color Converter Widget */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Instant Color Converter
            </h2>
            <span className="text-xs font-semibold text-slate-400">Live Browser Engine</span>
          </div>
          <ColorConverterComponent initialHex={currentHex} />
        </section>

        {/* Trending Colors */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Trending Palette Colors
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Handpicked aesthetic shades popular among web designers & modern apps
              </p>
            </div>
            <button
              type="button"
              onClick={handleRandomClick}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Random Color</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TRENDING_COLORS.map(c => (
              <ColorCard key={c.hex} hex={c.hex} name={c.name} />
            ))}
          </div>
        </section>

        {/* Popular Colors Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Popular Base Colors
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Core color codes with full HEX, RGB, HSL, CMYK specs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {POPULAR_COLORS.map(c => (
              <ColorCard key={c.hex} hex={c.hex} name={c.name} />
            ))}
          </div>
        </section>

        {/* AdSlot Footer */}
        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
