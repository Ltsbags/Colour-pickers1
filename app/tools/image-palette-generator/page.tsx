import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ImagePaletteGeneratorTool } from '@/components/ImagePaletteGeneratorTool';
import {
  Palette,
  Sparkles,
  Layers,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Download,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color Palette From Image Generator - Extract 5 & 10 Color Schemes',
  description:
    'Generate harmonious 5-color and 10-color palettes from any uploaded photo or image. Fast client-side browser processing with HEX, RGB, and CSS export.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/image-palette-generator',
  },
  openGraph: {
    title: 'Color Palette From Image Generator | Color Pickers',
    description:
      'Generate harmonious 5-color and 10-color palettes from any uploaded photo with client-side browser processing.',
    url: 'https://color-pickers.com/tools/image-palette-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Palette From Image Generator',
    description:
      'Generate harmonious 5-color and 10-color palettes from any uploaded photo or image.',
  },
};

export default function ImagePaletteGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Color Palette From Image Generator',
    url: 'https://color-pickers.com/tools/image-palette-generator',
    description:
      'Generate harmonious color palettes from uploaded images with HEX, RGB, HSL, and PNG/CSS downloads.',
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
            { label: 'Image Palette Generator' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate 5 & 10 Color Schemes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Color Palette From Image
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Upload any photo or illustration to instantly generate a balanced, cohesive color palette for your UI, website, or branding project.
          </p>
        </div>

        <div className="my-8">
          <ImagePaletteGeneratorTool />
        </div>

        <AdSlot type="in-content" />

        {/* Educational Content */}
        <article className="my-16 space-y-12 max-w-4xl mx-auto">
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Create Harmonious Color Schemes From Photography
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Nature, architecture, and editorial photography contain naturally balanced color harmonies that make ideal starting points for web themes, UI design systems, and illustration palettes. The <strong>Image Palette Generator</strong> automatically isolates key hues and blends them into 5-color or 10-color palettes with ready-to-use CSS tokens and HEX codes.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>How does this differ from the Image Color Extractor?</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  While the <Link href="/tools/image-color-extractor" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Image Color Extractor</Link> focuses on detailed prominence percentages and deep print values (CMYK), the Image Palette Generator is tailored for rapid creation of 5 and 10-color mood boards, branding schemes, and UI theme swatches.
                </p>
              </details>

              <details className="group border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>Is my image kept private?</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes. All image processing runs 100% locally in your web browser. No photos or graphic assets are ever sent to our servers.
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
