import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { GuideArticle, GUIDES } from '@/lib/guides-data';
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Share2,
  CheckCircle2,
  Sparkles,
  Sliders,
  ShieldCheck,
  ArrowRightLeft,
} from 'lucide-react';

interface GuideArticleLayoutProps {
  article: GuideArticle;
  children: React.ReactNode;
  relatedTools?: { name: string; href: string; desc: string }[];
}

export function GuideArticleLayout({
  article,
  children,
  relatedTools,
}: GuideArticleLayoutProps) {
  // Schema.org Article Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: '2026-07-01T08:00:00+00:00',
    dateModified: '2026-08-18T00:00:00+00:00',
    author: {
      '@type': 'Organization',
      name: 'Color Pickers Editorial Team',
      url: 'https://color-pickers.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Color Pickers',
      url: 'https://color-pickers.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://color-pickers.com/icon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://color-pickers.com/guides/${article.slug}`,
    },
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
          name: 'Guides',
          item: 'https://color-pickers.com/guides',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: `https://color-pickers.com/guides/${article.slug}`,
        },
      ],
    },
  };

  const otherGuides = GUIDES.filter(g => g.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Guides & Education', href: '/guides' },
            { label: article.category, href: '/guides' },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated {article.publishedAt}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
              CP
            </div>
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">{article.author}</span>
              <span className="block text-[10px] text-slate-400">Reviewed for Technical Accuracy</span>
            </div>
          </div>
        </header>

        <AdSlot type="header" />

        {/* Article Body Content */}
        <article className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base leading-relaxed space-y-6">
          {children}
        </article>

        <AdSlot type="in-content" />

        {/* Contextual Interactive Tools Box */}
        {relatedTools && relatedTools.length > 0 && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Try Related Color Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-3 block group-hover:translate-x-1 transition-transform">
                    Launch Tool →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Read Next Guides */}
        <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Related Articles & Guides
            </h2>
            <Link
              href="/guides"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse All Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherGuides.map(guide => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    {guide.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-slate-400 mt-4 block">
                  {guide.readTime}
                </span>
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
