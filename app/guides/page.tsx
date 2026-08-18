import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GUIDES } from '@/lib/guides-data';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, Sliders } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color Guides, Tutorials & Color Theory Reference | Color Pickers',
  description:
    'Comprehensive guides to HEX codes, RGB vs HSL vs CMYK, web accessibility (WCAG 2.1), color psychology, design systems, and modern CSS color functions.',
  alternates: {
    canonical: 'https://color-pickers.com/guides',
  },
  openGraph: {
    title: 'Color Guides, Tutorials & Color Theory Reference | Color Pickers',
    description:
      'Comprehensive guides to HEX codes, RGB vs HSL vs CMYK, WCAG accessibility, color psychology, and CSS color functions.',
    url: 'https://color-pickers.com/guides',
    type: 'website',
  },
};

export default function GuidesIndexPage() {
  const featured = GUIDES[0];
  const rest = GUIDES.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Guides & Education' }]} />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Educational Color Knowledgebase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Color Guides & Design Theory
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            In-depth technical articles, color mathematics breakdowns, WCAG accessibility standards, and practical UI/UX palettes written for modern engineers and designers.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Featured Guide Banner */}
        {featured && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs hover:border-blue-500 transition-all group">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
                  Featured Article
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {featured.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                <Link href={`/guides/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {featured.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  href={`/guides/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* All Guides Grid */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              All Tutorials & References ({GUIDES.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Browse by topic: Color spaces, accessibility, CSS properties, and conversion mathematics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(guide => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs hover:shadow-lg hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60">
                      {guide.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* Free Tool Integration Banner */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Put Color Theory Into Practice
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Test any concept from our guides using our free zero-latency browser suite: Palette Generator, Contrast Checker, Color Mixer, and HEX/RGB Converters.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/tools/palette-generator"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all"
            >
              Palette Generator
            </Link>
            <Link
              href="/tools/color-contrast-checker"
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              WCAG Contrast Checker
            </Link>
          </div>
        </section>

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
