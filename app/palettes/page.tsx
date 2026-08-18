import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { PALETTE_PRESETS } from '@/lib/palette-presets';
import { Layers, Sparkles, Shuffle, Palette, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color Palettes & Harmonies Directory | Color Pickers',
  description:
    'Discover curated color palettes, aesthetic 5-color combinations, and harmonious themes for websites, mobile applications, and brand identities.',
  alternates: {
    canonical: 'https://color-pickers.com/palettes',
  },
  openGraph: {
    title: 'Color Palettes & Harmonies Directory | Color Pickers',
    description:
      'Discover curated color palettes, aesthetic 5-color combinations, and harmonious themes.',
    url: 'https://color-pickers.com/palettes',
    type: 'website',
  },
};

export default function PalettesHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Palettes' }]} />

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Harmonies & Palettes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Color Palettes & Harmony Schemes
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Curated color schemes organized by aesthetic style and mood. Generate custom 5-color combinations, lock key brand tokens, or copy ready-to-use palettes directly into Figma and CSS.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/tools/palette-generator"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Open Interactive Palette Generator</span>
            </Link>
          </div>
        </div>

        <AdSlot type="header" />

        {/* Curated Palettes Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Curated Design Palettes
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Handcrafted combinations built with balanced contrast and optical harmony
              </p>
            </div>
            <Link
              href="/tools/palette-generator"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Randomize Generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PALETTE_PRESETS.map(preset => {
              const formattedList = preset.colors.join(', ');
              return (
                <div
                  key={preset.id}
                  className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Visual Color Bar */}
                    <div className="flex h-20 w-full rounded-2xl overflow-hidden shadow-2xs border border-black/10">
                      {preset.colors.map((c, i) => (
                        <div
                          key={i}
                          className="flex-1 h-full relative group/item"
                          style={{ backgroundColor: c }}
                        >
                          <Link
                            href={`/hex/${c.replace('#', '')}`}
                            className="absolute inset-0 opacity-0 group-hover/item:opacity-100 bg-black/20 flex items-center justify-center text-[10px] text-white font-mono font-bold transition-opacity"
                            title={`Inspect ${c}`}
                          >
                            View
                          </Link>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {preset.name}
                        </h3>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {preset.category} Theme
                        </span>
                      </div>
                      <CopyButton
                        textToCopy={formattedList}
                        label="Copy All"
                        variant="secondary"
                        size="sm"
                      />
                    </div>

                    {/* Color Swatch Pill List */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {preset.colors.map(c => (
                        <Link
                          key={c}
                          href={`/hex/${c.replace('#', '')}`}
                          className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-lg text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors flex items-center gap-1.5"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                            style={{ backgroundColor: c }}
                          />
                          <span>{c}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* Educational Palette Guide */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The 60-30-10 Rule for Website Color Palettes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A classic design principle used by UI/UX professionals to create visually balanced interfaces is the <strong>60-30-10 rule</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-extrabold text-2xl text-blue-600 dark:text-blue-400">60%</span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Dominant Neutral</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                The primary canvas color for pages, card backgrounds, and spacious white space (e.g. Off-white, Slate-50, or Charcoal in dark mode).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">30%</span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Secondary Structural</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Supporting colors used on sidebars, table headers, borders, secondary buttons, and card containers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-extrabold text-2xl text-purple-600 dark:text-purple-400">10%</span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">High-Contrast Accent</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Focal call-to-action buttons, active badges, links, notifications, and important metric highlights.
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
