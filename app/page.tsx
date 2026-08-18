'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { ColorCard } from '@/components/ColorCard';
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
  ShieldCheck,
  HelpCircle,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentHex, setCurrentHex] = useState('3B82F6');
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
      title: 'Universal Converter',
      desc: 'Instant HEX, RGB, HSL, HSV, and CMYK transformations with zero delay',
      href: '/tools/converter',
      icon: ArrowRightLeft,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Gradient Generator',
      desc: 'Create multi-stop linear & radial CSS and Tailwind gradients',
      href: '/tools/gradient-generator',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Palette Generator',
      desc: 'Spacebar randomizer, locks, and harmonious 5-color palettes',
      href: '/tools/palette-generator',
      icon: Layers,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Image Color Picker',
      desc: 'Extract pixel colors & dominant palettes from uploaded photos locally',
      href: '/tools/image-color-picker',
      icon: ImageIcon,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Color Contrast Checker',
      desc: 'Verify WCAG 2.1 AA & AAA compliance for readable web typography',
      href: '/tools/color-contrast-checker',
      icon: ShieldCheck,
      color: 'from-rose-500 to-red-600',
    },
    {
      title: 'Color Mixer & Blender',
      desc: 'Mix two colors across precise percentage ratios and step spectrums',
      href: '/tools/color-mixer',
      icon: Sliders,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Shades & Tints Generator',
      desc: 'Generate 8-step lighter tints, darker shades, and muted tones',
      href: '/tools/shades-generator',
      icon: Layers,
      color: 'from-violet-500 to-purple-600',
    },
    {
      title: 'Color Harmonies Suite',
      desc: 'Complementary, analogous, triadic, and tetradic color wheels',
      href: '/tools/color-harmonies',
      icon: Pipette,
      color: 'from-pink-500 to-rose-600',
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* AdSlot Header */}
        <AdSlot type="header" />

        {/* Hero Section */}
        <section className="relative pt-4 pb-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline, Description & Quick Search */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>The Premier Color Toolkit</span>
              </div>

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

              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Pick colors, generate palettes, convert between HEX, RGB, HSL, HSV, CMYK, test WCAG contrast, and copy CSS codes instantly with zero server lag.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Zero Server Latency</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-900/60 text-pink-600 dark:text-pink-300 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>WCAG 2.1 AAA Contrast</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-300 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>100% Free & Private</span>
                </div>
              </div>

              {/* Quick Search & Convert Bar */}
              <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-2 pt-2 max-w-xl">
                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Enter color hex (#3B82F6), name, or rgb..."
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
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Get Color Info
                </button>
              </form>
            </div>

            {/* Right Column: Interactive Color Picker Card */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
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

        {/* Recent History Section */}
        <RecentHistorySection />

        {/* Hero Bottom Advertisement */}
        <AdSlot type="hero-bottom" />

        {/* Live Color Converter Widget */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Instant Color Space Converter
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transform between HEX, RGB, HSL, HSV, CMYK, CSS custom properties, and Tailwind tokens
              </p>
            </div>
            <Link
              href="/converters"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>All Converters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ColorConverterComponent initialHex={currentHex} />
        </section>

        {/* Featured Tools Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Complete Color Tools Suite
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Zero-latency color processing tools executing directly inside your browser
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
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
                  className="group p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-xs hover:shadow-lg hover:border-blue-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Open Tool</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Latest Palettes Section */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Curated Color Palettes
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aesthetic combinations for branding, landing pages, and UI components
              </p>
            </div>
            <Link
              href="/palettes"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All Palettes</span>
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
                  className="group p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl hover:shadow-md hover:border-blue-500 transition-all cursor-pointer flex flex-col gap-3"
                >
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
                      <span className="text-[10px] text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-mono">
                        Copy
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AdSlot In Content */}
        <AdSlot type="in-content" />

        {/* Trending Colors */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Trending Modern Colors
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Handpicked aesthetic shades popular in modern web apps
              </p>
            </div>
            <button
              type="button"
              onClick={handleRandomClick}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
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
                Core color codes with full HEX, RGB, HSL, CMYK specifications
              </p>
            </div>
            <Link
              href="/colors"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse Full Color Directory →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {POPULAR_COLORS.map(c => (
              <ColorCard key={c.hex} hex={c.hex} name={c.name} />
            ))}
          </div>
        </section>

        {/* Rich Educational Section (Authority SEO Architecture) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xs space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Educational Color Reference</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Everything You Need to Know About Digital Colors
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Color is the cornerstone of visual communication, user interface usability, and digital brand perception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                What is a Color Picker?
              </h3>
              <p className="text-xs leading-relaxed">
                A digital color picker is a graphical tool that lets users select, adjust, and inspect color values. It translates the physics of screen-emitted light into exact numerical codes like HEX, RGB, and HSL. Our tool executes all math locally in WebAssembly and TypeScript with sub-millisecond precision.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                How Color Space Conversion Works
              </h3>
              <p className="text-xs leading-relaxed">
                Converting from HEX to RGB involves decoding base-16 digit pairs into integers from 0 to 255. Converting RGB to cylindrical HSL maps RGB light values onto a 360° circular hue coordinate, calculating fractional saturation and lightness percentages.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                The 60-30-10 UI Palette Rule
              </h3>
              <p className="text-xs leading-relaxed">
                To create visual harmony on websites, designers apply 60% dominant neutral background (slate/white), 30% structural secondary color (cards, sidebars, typography), and 10% high-contrast accent color for buttons and links.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                WCAG Contrast & Accessibility
              </h3>
              <p className="text-xs leading-relaxed">
                The Web Content Accessibility Guidelines (WCAG 2.1) require a minimum contrast ratio of 4.5:1 for standard body text (Level AA) and 7.0:1 (Level AAA). Always test foreground text against backgrounds to ensure readable experiences for all users.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-500">
              Want to dive deeper into color theory and design systems?
            </span>
            <Link
              href="/guides"
              className="px-4 py-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <span>Explore All Guides & Tutorials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-white">
                Are these color tools free to use for commercial projects?
              </h3>
              <p className="text-xs leading-relaxed">
                Yes! All Color Pickers tools, conversions, gradient exports, and color palettes are 100% free with no account or subscription required. You can use generated palettes and CSS code in any commercial or personal project.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-white">
                How does the eyedropper work?
              </h3>
              <p className="text-xs leading-relaxed">
                In supported Chromium desktop browsers (Chrome, Edge, Opera), our color picker leverages the native EyeDropper API to sample pixels from any open window. On other browsers or devices, you can use our Image Color Picker or fine-tuning wheel.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-white">
                What is the difference between HEX and RGB?
              </h3>
              <p className="text-xs leading-relaxed">
                HEX and RGB represent the exact same sRGB color space. HEX expresses values in base-16 notation (#3B82F6), whereas RGB uses standard decimal integers (rgb(59, 130, 246)).
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-white">
                Are my uploaded images stored or sent to a server?
              </h3>
              <p className="text-xs leading-relaxed">
                Never. Image sampling and dominant palette extraction run entirely within your web browser using HTML5 Canvas. Your files never leave your device.
              </p>
            </div>
          </div>
        </section>

        {/* AdSlot Footer */}
        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
