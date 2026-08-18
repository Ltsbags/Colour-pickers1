import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorCard } from '@/components/ColorCard';
import { CATEGORIES_MAP } from '@/lib/categories-data';
import {
  Palette,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Sliders,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES_MAP).map(cat => ({ category: cat }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const data = CATEGORIES_MAP[category.toLowerCase()];

  if (!data) {
    return {
      title: 'Category Not Found | Color Pickers',
      description: 'The requested color category could not be found.',
    };
  }

  return {
    title: `${data.title} | Color Pickers`,
    description: `${data.description} Browse curated hex codes, RGB coordinates, HSL specs, harmonies, and WCAG contrast ratings.`,
    alternates: {
      canonical: `https://color-pickers.com/colors/${data.slug}`,
    },
    openGraph: {
      title: `${data.title} | Color Pickers`,
      description: data.description,
      url: `https://color-pickers.com/colors/${data.slug}`,
      type: 'website',
    },
  };
}

export default async function ColorCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const data = CATEGORIES_MAP[category.toLowerCase()];

  if (!data) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.title,
    description: data.description,
    url: `https://color-pickers.com/colors/${data.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://color-pickers.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Colors Directory',
          item: 'https://color-pickers.com/colors',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${data.name} Colors`,
          item: `https://color-pickers.com/colors/${data.slug}`,
        },
      ],
    },
  };

  const otherCategories = Object.values(CATEGORIES_MAP).filter(
    c => c.slug !== data.slug
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Colors Directory', href: '/colors' },
            { label: `${data.name} Colors` },
          ]}
        />

        {/* Hero Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Palette className="w-3.5 h-3.5" />
            <span>Color Category Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {data.name} Color Shades & Hex Codes
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            {data.description}
          </p>
        </div>

        <AdSlot type="header" />

        {/* Curated Color Cards Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Popular {data.name} Color Swatches ({data.colors.length})
              </h2>
              <p className="text-xs text-slate-500">
                Click any shade to copy hex codes, view shades/tints, and check WCAG contrast ratings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.colors.map(c => (
              <ColorCard key={c.hex} hex={c.hex} name={c.name} />
            ))}
          </div>
        </section>

        {/* Category Insights: Psychology & UI Design */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {data.name} in UI/UX Design & Visual Psychology
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Color Psychology</span>
              </h3>
              <p className="text-xs leading-relaxed">{data.psychology}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Best UI/UX Practices</span>
              </h3>
              <p className="text-xs leading-relaxed">{data.uiUsage}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Accessibility & Contrast</span>
              </h3>
              <p className="text-xs leading-relaxed">{data.accessibilityNotes}</p>
            </div>
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* Explore Other Color Families */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Explore More Color Families
            </h2>
            <Link
              href="/colors"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              All Color Families →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {otherCategories.map(cat => (
              <Link
                key={cat.slug}
                href={`/colors/${cat.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {cat.name} Colors
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </section>

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
