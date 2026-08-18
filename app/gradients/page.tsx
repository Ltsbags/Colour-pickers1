import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { GRADIENT_PRESETS, generateGradientCss } from '@/lib/gradient-presets';
import { Sparkles, Sliders, ArrowRight, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSS Gradients Directory & Background Presets | Color Pickers',
  description:
    'Explore curated CSS gradients, linear and radial color transitions, and trending background presets. Copy pure CSS and Tailwind classes directly into your projects.',
  alternates: {
    canonical: 'https://color-pickers.com/gradients',
  },
  openGraph: {
    title: 'CSS Gradients Directory & Background Presets | Color Pickers',
    description:
      'Explore curated CSS gradients, linear and radial color transitions, and trending background presets.',
    url: 'https://color-pickers.com/gradients',
    type: 'website',
  },
};

export default function GradientsHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Gradients' }]} />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated CSS Gradient Library</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            CSS Gradients & Backgrounds
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Beautiful multi-color gradient presets for modern web backgrounds, hero sections, and card accents. Copy CSS background properties or customize stops in our live editor.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/tools/gradient-generator"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Open Gradient Generator Studio</span>
            </Link>
          </div>
        </div>

        <AdSlot type="header" />

        {/* Gradient Presets Library */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Trending Gradient Presets
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Optimized 2-stop and 3-stop blends ready for production websites
              </p>
            </div>
            <Link
              href="/tools/gradient-generator"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Custom Maker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GRADIENT_PRESETS.map(preset => {
              const css = generateGradientCss(preset);
              return (
                <div
                  key={preset.id}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs hover:border-purple-500 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Gradient Preview Canvas */}
                    <div
                      className="w-full h-40 rounded-2xl shadow-inner relative flex items-end p-3 transition-transform group-hover:scale-[1.01]"
                      style={{ background: css }}
                    >
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/40 backdrop-blur-md text-white border border-white/20">
                        {preset.type.toUpperCase()} ({preset.angle}°)
                      </span>
                    </div>

                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                          {preset.name}
                        </h3>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {preset.category}
                        </span>
                      </div>
                      <CopyButton
                        textToCopy={`background: ${css};`}
                        label="Copy CSS"
                        variant="secondary"
                        size="sm"
                      />
                    </div>

                    {/* Color Stop Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {preset.stops.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                        >
                          <span
                            className="w-2 h-2 rounded-full inline-block border border-black/10"
                            style={{ backgroundColor: s.color }}
                          />
                          {s.color} ({s.position}%)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* CSS Gradient Tips & Best Practices */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Best Practices for Modern CSS Gradients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">
                1. Avoid the &ldquo;Gray Dead Zone&rdquo;
              </h3>
              <p className="text-xs">
                When interpolating between two opposing colors on the color wheel in standard sRGB space, the browser blends through murky muddy grays. Use 3 color stops or intermediate analogous shades to maintain vibrancy.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">
                2. Contrast with Text Overlay
              </h3>
              <p className="text-xs">
                When placing typography on top of gradients, always verify that your text color satisfies the 4.5:1 WCAG contrast ratio across BOTH the lightest and darkest areas of the background.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">
                3. Lightweight & Asset-Free
              </h3>
              <p className="text-xs">
                CSS gradients are rendered client-side on the GPU. Replacing 500KB background hero photos with subtle CSS mesh gradients dramatically improves Core Web Vitals (LCP) and mobile battery life.
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
