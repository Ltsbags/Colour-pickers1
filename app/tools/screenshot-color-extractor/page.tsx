import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ScreenshotColorExtractorTool } from '@/components/ScreenshotColorExtractorTool';
import {
  Layout,
  Sparkles,
  Layers,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Website Screenshot Color Extractor - Detect UI Theme & Brand Colors',
  description:
    'Upload any website or app UI screenshot to automatically detect primary, secondary, background, typography, and accent colors. Free client-side extraction.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/screenshot-color-extractor',
  },
  openGraph: {
    title: 'Website Screenshot Color Extractor | Color Pickers',
    description:
      'Upload any website screenshot to detect primary, background, typography, and accent colors.',
    url: 'https://color-pickers.com/tools/screenshot-color-extractor',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Screenshot Color Extractor',
    description:
      'Upload any website screenshot to detect primary, background, typography, and accent colors.',
  },
};

export default function ScreenshotColorExtractorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Website Screenshot Color Extractor',
    url: 'https://color-pickers.com/tools/screenshot-color-extractor',
    description:
      'Extract and classify UI theme colors from website screenshots into primary, secondary, background, text, and accent tokens.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All modern browsers',
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Screenshot Color Extractor' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automated UI Role Classification</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Website Screenshot Color Extractor
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Upload a website or mobile app screenshot to automatically detect primary brand colors, background surfaces, typography, and accent tokens.
          </p>
        </div>

        <div className="my-8">
          <ScreenshotColorExtractorTool />
        </div>

        <AdSlot type="in-content" />

        {/* Educational Content */}
        <article className="my-16 space-y-12 max-w-4xl mx-auto">
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Reverse-Engineer UI Color Schemes
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              When analyzing competitor websites or designing new dashboards, understanding how visual hierarchy is structured across primary, secondary, background, and typography colors is vital. The <strong>Website Screenshot Color Extractor</strong> samples screenshot pixels and categorizes them into standard design system tokens.
            </p>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Disclaimer:</strong> Color classifications are automated approximations based on pixel distributions and contrast heuristics in the uploaded screenshot image.
              </span>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>How does the tool classify UI colors?</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The algorithm detects large neutral areas to identify background surfaces, searches for maximum-contrast dark/light elements to pinpoint typography, and clusters saturated hues to isolate primary brand and accent tokens.
                </p>
              </details>

              <details className="group border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>Can I export the extracted UI tokens into CSS variables?</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes, you can export the tokens as ready-to-use CSS custom properties, JSON objects, PNG swatch cards, or plain text.
                </p>
              </details>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
