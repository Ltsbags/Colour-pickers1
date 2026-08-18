import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { HelpCircle, ArrowRight, ShieldCheck, Zap, Sliders, Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Color Pickers',
  description:
    'Got questions about digital color codes, eyedropper tools, color space mathematics, image color sampling, WCAG accessibility, or commercial licensing? Find answers here.',
  alternates: {
    canonical: 'https://color-pickers.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | Color Pickers',
    description:
      'Answers to common questions about HEX, RGB, HSL, CMYK, image palette extraction, contrast ratios, and color tools.',
    url: 'https://color-pickers.com/faq',
    type: 'website',
  },
};

const FAQ_SECTIONS = [
  {
    category: 'Color Picking & Eyedropper',
    icon: Palette,
    items: [
      {
        q: 'How does the browser eyedropper tool work?',
        a: 'In modern Chromium browsers (Google Chrome, Microsoft Edge, Opera), our color picker utilizes the native Web EyeDropper API to allow sampling exact pixel colors from anywhere on your desktop screen. On other browsers (such as Firefox or Safari) where the native eyedropper API is restricted for security, you can use our built-in canvas color wheel or upload screenshots to our Image Color Picker.',
      },
      {
        q: 'Can I extract colors directly from an image or photo?',
        a: 'Yes! Our Image Color Picker allows you to upload any PNG, JPEG, WEBP, or SVG image. You can hover or tap over any pixel to sample its exact hex code or view an auto-extracted 8-color dominant palette. All image decoding runs locally in your browser via HTML5 Canvas—your photos are never uploaded to a server.',
      },
      {
        q: 'How do I copy color codes with one click?',
        a: 'Every color card, palette swatch, and conversion table includes a quick-copy button. Clicking any swatch or copy icon copies the standard CSS representation (such as #3B82F6, rgb(59, 130, 246), or hsl(217, 91%, 60%)) to your clipboard with temporary visual confirmation.',
      },
    ],
  },
  {
    category: 'Color Spaces & Conversion Mathematics',
    icon: Sliders,
    items: [
      {
        q: 'What is the difference between HEX and RGB?',
        a: 'HEX and RGB describe the exact same additive sRGB color space. RGB uses three decimal integers from 0 to 255 (representing red, green, and blue light channels), whereas HEX expresses those same three numbers in compact two-digit base-16 notation (#RRGGBB). For example, RGB(59, 130, 246) is identical to HEX #3B82F6.',
      },
      {
        q: 'Why should I use HSL instead of HEX in CSS stylesheets?',
        a: 'HSL (Hue, Saturation, Lightness) organizes color geometrically along a 360-degree cylindrical wheel. This makes it effortless to create dynamic design tokens, hover states, and dark mode variants by simply adjusting lightness (L) or saturation (S) while keeping hue (H) fixed, which is difficult with raw hex numbers.',
      },
      {
        q: 'Why do CMYK print colors sometimes look duller than screen RGB?',
        a: 'Monitors emit additive light (RGB) with a broad color gamut, while physical printing uses subtractive ink pigments (Cyan, Magenta, Yellow, Key/Black). High-saturation neon cyans and electric greens cannot be reproduced using standard four-color process inks, causing gamut compression when converting RGB to CMYK.',
      },
      {
        q: 'What are 8-digit and 4-digit HEX codes?',
        a: '8-digit hex codes (#RRGGBBAA) and 4-digit shorthand codes (#RGBA) append an alpha channel representing opacity from 00 (0% transparent) to FF (100% opaque). For example, #3B82F680 renders Royal Blue with 50% opacity.',
      },
    ],
  },
  {
    category: 'Accessibility & WCAG Contrast Standards',
    icon: ShieldCheck,
    items: [
      {
        q: 'What contrast ratio is required for WCAG 2.1 AA compliance?',
        a: 'The Web Content Accessibility Guidelines (WCAG 2.1) Level AA requires a minimum contrast ratio of 4.5:1 for normal body text (under 18pt or 14pt bold) and 3.0:1 for large text (18pt+ or 14pt+ bold) and active UI graphical components (such as form borders and button outlines).',
      },
      {
        q: 'What is WCAG Level AAA compliance?',
        a: 'Level AAA is the strictest accessibility tier, requiring a contrast ratio of at least 7.0:1 for regular text and 4.5:1 for large text. It ensures maximum readability for users with low vision or varying ambient lighting conditions.',
      },
      {
        q: 'How does Color Pickers compute contrast ratios?',
        a: 'We calculate relative luminance according to the official W3C formula: (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter color and L2 is the relative luminance of the darker color, linearizing sRGB gamma channels before computing weighted luminance (0.2126R + 0.7152G + 0.0722B).',
      },
    ],
  },
  {
    category: 'Privacy, Performance & Commercial Rights',
    icon: Zap,
    items: [
      {
        q: 'Are these color tools 100% free for commercial use?',
        a: 'Yes. All palettes, color conversions, gradient CSS styles, and shades generated on Color Pickers are free for personal, commercial, freelance, and enterprise projects without attribution or license fees.',
      },
      {
        q: 'Is any of my palette data or uploaded imagery saved to a database?',
        a: 'No. All calculations, color matrices, image sampling, and gradient generation execute strictly on the client side inside your browser. No server databases, backend logs, or analytics track your design assets.',
      },
      {
        q: 'Do you offer keyboard shortcuts for fast palette exploration?',
        a: 'Yes! On our Palette Generator (/tools/palette-generator), you can tap the Spacebar to generate randomized harmonious palettes instantly, click any swatch to lock individual colors, and use Command/Control + K to open the global color search anywhere on the site.',
      },
    ],
  },
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_SECTIONS.flatMap(section =>
      section.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center & Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about color models, mathematical conversions, eyedropper tools, WCAG contrast compliance, and client-side privacy.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Categorized FAQs */}
        <div className="space-y-10">
          {FAQ_SECTIONS.map((section, sIdx) => {
            const IconComp = section.icon;
            return (
              <section
                key={sIdx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {section.category}
                    </h2>
                    <span className="text-xs text-slate-500">
                      {section.items.length} questions answered
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {section.items.map((item, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2.5"
                    >
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {item.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Additional Help CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">Have a specific question not listed here?</h2>
            <p className="text-sm text-blue-100">
              Our team is happy to help with design systems, color science questions, or tool suggestions.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white hover:bg-slate-100 text-blue-600 font-bold text-sm rounded-xl shadow-xs transition-all whitespace-nowrap"
          >
            Contact Support →
          </Link>
        </section>

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
