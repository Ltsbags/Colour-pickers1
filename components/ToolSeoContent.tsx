import React from 'react';
import { HelpCircle, Sparkles, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SeoFaqItem {
  question: string;
  answer: string;
}

interface SeoFeatureItem {
  title: string;
  description: string;
}

interface ToolSeoContentProps {
  toolTitle: string;
  toolSlug: string;
  category: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  howToSteps: { step: string; description: string }[];
  features: SeoFeatureItem[];
  formulaTitle?: string;
  formulaContent?: React.ReactNode;
  comparisonTable?: {
    headers: string[];
    rows: (string | React.ReactNode)[][];
  };
  faqs: SeoFaqItem[];
  relatedTools: { name: string; href: string; desc: string }[];
}

export function ToolSeoContent({
  toolTitle,
  toolSlug,
  category,
  overviewTitle,
  overviewParagraphs,
  howToSteps,
  features,
  formulaTitle,
  formulaContent,
  comparisonTable,
  faqs,
  relatedTools,
}: ToolSeoContentProps) {
  // Schema.org FAQ JSON-LD Structured Data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolTitle,
    url: `https://colorpickers.app/tools/${toolSlug}`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: overviewParagraphs[0],
  };

  return (
    <article className="mt-16 space-y-12 text-slate-800 dark:text-slate-200">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      {/* 1. Deep Overview Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
          <BookOpen className="w-4 h-4" />
          <span>In-Depth Guide & Technical Manual</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          {overviewTitle}
        </h2>
        <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
          {overviewParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>

      {/* 2. Step-by-Step How To Guide */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800/80">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
          <span>How to Use {toolTitle}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {howToSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex gap-4"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-black text-sm flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                  {step.step}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Features & Capabilities */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <span>Key Capabilities & Advantages</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {feat.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Formulas / Mathematical Logic (If applicable) */}
      {formulaTitle && formulaContent && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {formulaTitle}
          </h2>
          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
            {formulaContent}
          </div>
        </section>
      )}

      {/* 5. Comparison Table (If applicable) */}
      {comparisonTable && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Format Specifications & Value Ranges
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  {comparisonTable.headers.map((h, idx) => (
                    <th
                      key={idx}
                      className="py-3.5 px-4 font-bold text-slate-900 dark:text-white"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {comparisonTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-4 text-slate-600 dark:text-slate-400 font-mono text-xs sm:text-sm">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 6. Frequently Asked Questions (FAQ Section + SEO Schema) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
          Frequently Asked Questions About {toolTitle}
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Interlinked Related Color Tools */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
        <h2 className="text-2xl font-extrabold tracking-tight mb-2">
          Explore Related Design & Color Tools
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Speed up your workflow with our full suite of free developer and designer color utilities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map(rel => (
            <Link
              key={rel.href}
              href={rel.href}
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between text-sm mb-1">
                  <span>{rel.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {rel.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
