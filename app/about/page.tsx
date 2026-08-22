import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Palette, Zap, ShieldCheck, Eye, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Color Pickers | Modern Color Tools & Converters',
  description: 'Learn about Color Pickers, the modern color toolkit built for designers, developers, and digital creators.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        <div className="my-8 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About Color Pickers
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Color Pickers was built to provide a fast, focused experience for color conversions and palette design. Built on Next.js App Router and TypeScript, Color Pickers executes color calculations directly in your browser without requiring server roundtrips.
          </p>

          <AdSlot type="header" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                Client-Side Processing
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                All HEX, RGB, HSL, HSV, and CMYK transformations run client-side in your browser.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                WCAG Accessibility Standards
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Integrated WCAG 2.1 relative luminance and contrast ratio calculators ensure your text passes AA and AAA standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                Comprehensive Palette & Harmonies
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Discover complementary, triadic, split-complementary, and monochromatic harmonies alongside 8-step shades, tints, and tones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                Developer Ready Export
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Export clean CSS custom variables, inline styles, or Tailwind CSS v4 arbitrary utility classes with a single click.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-blue-950 dark:text-blue-100">
                Transparent Mathematical Formulas
              </h3>
              <p className="text-xs text-blue-800 dark:text-blue-300 mt-0.5">
                Learn how we calculate relative luminance, WCAG 2.1 contrast ratios, and color geometry.
              </p>
            </div>
            <a
              href="/methodology"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0"
            >
              Read Color Methodology →
            </a>
          </div>
        </div>

        <AdSlot type="in-content" />
      </main>

      <Footer />
    </div>
  );
}
