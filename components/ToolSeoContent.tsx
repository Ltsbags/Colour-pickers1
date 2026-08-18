import React from 'react';
import { HelpCircle, Sparkles, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoFeatureItem {
  title: string;
  description: string;
}

export interface SeoStepItem {
  step: string;
  description: string;
}

export interface ToolSeoContentProps {
  toolTitle?: string;
  toolName?: string;
  toolSlug?: string;
  category?: string;
  description?: string;
  overviewTitle?: string;
  overviewParagraphs?: string[];
  howToSteps?: (SeoStepItem | string)[];
  howToUse?: (SeoStepItem | string)[];
  features?: (SeoFeatureItem | string)[];
  formulaTitle?: string;
  formulaContent?: React.ReactNode;
  comparisonTable?: {
    headers: string[];
    rows: (string | React.ReactNode)[][];
  };
  faqs?: SeoFaqItem[];
  faqList?: SeoFaqItem[];
  relatedTools?: { name: string; href: string; desc: string }[];
}

const DEFAULT_RELATED_TOOLS = [
  { name: 'HEX to RGB Converter', href: '/tools/hex-to-rgb', desc: 'Convert hexadecimal web codes to RGB numerical channels.' },
  { name: 'Color Harmonies Suite', href: '/tools/color-harmonies', desc: 'Calculate complementary, triadic, and analogous palettes.' },
  { name: 'Color Contrast Checker', href: '/tools/color-contrast-checker', desc: 'Verify WCAG AA and AAA accessibility ratios for typography.' },
  { name: 'Palette Generator', href: '/tools/palette-generator', desc: 'Create balanced harmonious 5-swatch color schemes.' },
  { name: 'Color Mixer & Blender', href: '/tools/color-mixer', desc: 'Interpolate and cross-fade between two base colors.' },
  { name: 'Gradient Generator', href: '/tools/gradient-generator', desc: 'Craft multi-stop linear and radial CSS gradients.' },
];

export function ToolSeoContent({
  toolTitle,
  toolName,
  toolSlug,
  category = 'Color Tools',
  description,
  overviewTitle,
  overviewParagraphs,
  howToSteps,
  howToUse,
  features = [],
  formulaTitle,
  formulaContent,
  comparisonTable,
  faqs,
  faqList,
  relatedTools = DEFAULT_RELATED_TOOLS,
}: ToolSeoContentProps) {
  const resolvedTitle = toolTitle || toolName || 'Color Tool';
  const resolvedSlug = toolSlug || resolvedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const resolvedOverviewTitle = overviewTitle || `About the ${resolvedTitle}`;
  const resolvedParagraphs = overviewParagraphs || (description ? [description] : []);

  const rawSteps = howToSteps || howToUse || [];
  const normalizedSteps: SeoStepItem[] = rawSteps.map((s, idx) => {
    if (typeof s === 'string') {
      return { step: `Step ${idx + 1}`, description: s };
    }
    return s;
  });

  const normalizedFeatures: SeoFeatureItem[] = features.map((f, idx) => {
    if (typeof f === 'string') {
      const parts = f.split(':');
      if (parts.length > 1) {
        return { title: parts[0].trim(), description: parts.slice(1).join(':').trim() };
      }
      return { title: `Feature ${idx + 1}`, description: f };
    }
    return f;
  });

  const resolvedFaqs = faqs || faqList || [];

  // Schema.org FAQ JSON-LD Structured Data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: resolvedFaqs.map(faq => ({
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
    name: resolvedTitle,
    url: `https://color-pickers.com/tools/${resolvedSlug}`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: resolvedParagraphs[0] || `${resolvedTitle} on Color Pickers`,
  };

  return (
    <article className="mt-16 space-y-12 text-slate-800 dark:text-slate-200">
      {/* Schema.org Structured Data */}
      {resolvedFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      {/* 1. Deep Overview Section */}
      {resolvedParagraphs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            <BookOpen className="w-4 h-4" />
            <span>{category}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            {resolvedOverviewTitle}
          </h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
            {resolvedParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* 2. Step-by-Step How To Guide */}
      {normalizedSteps.length > 0 && (
        <section className="bg-slate-100/70 dark:bg-slate-900/60 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800/80">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
            <span>How to Use {resolvedTitle}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {normalizedSteps.map((step, idx) => (
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
      )}

      {/* 3. Core Features & Capabilities */}
      {normalizedFeatures.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>Key Capabilities & Advantages</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {normalizedFeatures.map((feat, idx) => (
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
      )}

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
      {resolvedFaqs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
            Frequently Asked Questions About {resolvedTitle}
          </h2>
          <div className="space-y-6">
            {resolvedFaqs.map((faq, idx) => (
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
      )}

      {/* 7. Interlinked Related Color Tools */}
      {relatedTools.length > 0 && (
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
      )}
    </article>
  );
}
