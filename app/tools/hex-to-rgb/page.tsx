import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';
import { ToolSeoContent } from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'HEX to RGB Converter | Free Online HEX ⇄ RGB Color Code Tool',
  description: 'Convert HEX color codes to RGB (Red, Green, Blue) values and vice-versa instantly. Includes CSS rgb() syntax, conversion formula, 8-bit channel breakdowns, and FAQs.',
  alternates: {
    canonical: 'https://colorpickers.app/tools/hex-to-rgb',
  },
  openGraph: {
    title: 'HEX to RGB Color Converter | Instant & Precise',
    description: 'Convert Hexadecimal web colors to RGB decimal triplets with precision sliders and instant code copy.',
    url: 'https://colorpickers.app/tools/hex-to-rgb',
    type: 'website',
  },
};

export default function HexToRgbPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'HEX to RGB Converter' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            HEX to RGB Color Converter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Instantly convert hexadecimal 6-digit or 3-digit web color codes into decimal RGB (Red, Green, Blue) integer values with real-time bidirectional editing and CSS copy.
          </p>
        </div>

        <AdSlot type="header" />

        <div className="my-8">
          <ColorConverterComponent initialHex="3B82F6" defaultMode="rgb" />
        </div>

        <AdSlot type="in-content" />

        {/* SEO Landing Content */}
        <ToolSeoContent
          toolTitle="HEX to RGB Color Converter"
          toolSlug="hex-to-rgb"
          category="Color Conversion"
          overviewTitle="What is the HEX to RGB Conversion?"
          overviewParagraphs={[
            'HEX (Hexadecimal) and RGB (Red, Green, Blue) are the two foundational color representation systems used across modern web development, UI/UX software (Figma, Adobe XD), and digital graphics. While both describe the exact same additive color space (sRGB), they structure the underlying color components using different numeric bases.',
            'A standard 6-character HEX code (e.g., #3B82F6) is a base-16 number where each pair of hexadecimal digits maps directly to an 8-bit integer channel between 0 and 255. The first pair represents Red, the second pair represents Green, and the third pair represents Blue. In decimal RGB notation, this is expressed as rgb(59, 130, 246).',
            'Our interactive converter allows you to switch seamlessly between HEX strings and individual RGB channels, providing instant mathematical translation, live color previewing, and production-ready CSS snippet generation.',
          ]}
          howToSteps={[
            {
              step: 'Enter or Paste a HEX Code',
              description: 'Type any 3-digit (#FFF) or 6-digit (#3B82F6) hexadecimal color into the HEX input box.',
            },
            {
              step: 'Adjust RGB Sliders Individually',
              description: 'Fine-tune each individual Red, Green, or Blue channel using numeric inputs or draggable step sliders (0–255).',
            },
            {
              step: 'Inspect Real-time Color Preview',
              description: 'Watch the live swatch update in real-time alongside computed WCAG luminance and closest color naming.',
            },
            {
              step: 'Copy Ready-to-Use CSS Code',
              description: 'Click the Copy button to grab clean CSS syntax like rgb(59, 130, 246) or #3B82F6 directly to your clipboard.',
            },
          ]}
          features={[
            {
              title: 'Bidirectional Real-Time Sync',
              description: 'Modifying either the HEX string or any single RGB channel immediately calculates and updates all counterpart values.',
            },
            {
              title: 'Supports 3 & 6 Digit HEX Codes',
              description: 'Automatically expands shorthand CSS hexadecimal strings like #03F into their full 6-digit format #0033FF.',
            },
            {
              title: 'One-Click Clipboard Copying',
              description: 'Instant zero-hassle copying for raw decimal values, CSS rgb() functions, and hexadecimal strings.',
            },
            {
              title: 'Intelligent Channel Clamping',
              description: 'Strictly bounds RGB inputs between 0 and 255 to eliminate out-of-gamut rendering errors in production.',
            },
            {
              title: 'Client-Side Color Math',
              description: 'Color calculations run locally in your browser without requiring server roundtrips.',
            },
            {
              title: 'Curated Color Name Matcher',
              description: 'Automatically resolves the closest human-readable name for any generated RGB combination.',
            },
          ]}
          formulaTitle="The Mathematical Formula: How to Convert HEX to RGB"
          formulaContent={
            <div className="space-y-3 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-sm">
                To manually calculate decimal RGB values from a hex string <code>#RRGGBB</code>:
              </p>
              <div className="pl-4 border-l-2 border-blue-500 space-y-1.5 text-slate-700 dark:text-slate-300">
                <p>1. Split the string into 3 pairs: RR, GG, BB.</p>
                <p>2. Convert each pair from hexadecimal (base 16) to decimal (base 10):</p>
                <p className="text-blue-600 dark:text-blue-400 font-bold">
                  Decimal = (First Hex Digit × 16) + (Second Hex Digit × 1)
                </p>
                <p>Where A=10, B=11, C=12, D=13, E=14, F=15.</p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-sans pt-2">
                <strong>Example with #3B82F6:</strong>
                <br />
                • Red (3B) = (3 × 16) + 11 = <strong>59</strong>
                <br />
                • Green (82) = (8 × 16) + 2 = <strong>130</strong>
                <br />
                • Blue (F6) = (15 × 16) + 6 = <strong>246</strong>
                <br />
                <strong>Result: rgb(59, 130, 246)</strong>
              </p>
            </div>
          }
          comparisonTable={{
            headers: ['Color Sample', 'Color Name', 'HEX Code', 'RGB Decimal', 'CSS Syntax'],
            rows: [
              [
                <span key="1" className="inline-block w-4 h-4 rounded-full bg-[#EF4444] border" />,
                'Red',
                '#EF4444',
                '239, 68, 68',
                'rgb(239, 68, 68)',
              ],
              [
                <span key="2" className="inline-block w-4 h-4 rounded-full bg-[#10B981] border" />,
                'Emerald Green',
                '#10B981',
                '16, 185, 129',
                'rgb(16, 185, 129)',
              ],
              [
                <span key="3" className="inline-block w-4 h-4 rounded-full bg-[#3B82F6] border" />,
                'Blue',
                '#3B82F6',
                '59, 130, 246',
                'rgb(59, 130, 246)',
              ],
              [
                <span key="4" className="inline-block w-4 h-4 rounded-full bg-[#000000] border" />,
                'Pure Black',
                '#000000',
                '0, 0, 0',
                'rgb(0, 0, 0)',
              ],
              [
                <span key="5" className="inline-block w-4 h-4 rounded-full bg-[#FFFFFF] border" />,
                'Pure White',
                '#FFFFFF',
                '255, 255, 255',
                'rgb(255, 255, 255)',
              ],
            ],
          }}
          faqs={[
            {
              question: 'Why do developers convert HEX to RGB?',
              answer: 'While HEX is concise and standard in CSS stylesheets, RGB is required when working with canvas APIs, opacity channels (rgba), WebGL, programmatic color blending, and shader programming where integer calculations are needed.',
            },
            {
              question: 'How do I add opacity or alpha transparency to RGB?',
              answer: 'In CSS, you can use the rgba() function: rgba(59, 130, 246, 0.5) where the 4th argument is a decimal between 0.0 (transparent) and 1.0 (opaque), or modern CSS Color 4 syntax: rgb(59 130 246 / 50%).',
            },
            {
              question: 'What is the range of RGB values?',
              answer: 'Standard 8-bit digital RGB channels range from 0 to 255 per channel, yielding 256 × 256 × 256 = 16,777,216 distinct color combinations.',
            },
            {
              question: 'Can shorthand 3-digit HEX codes be converted to RGB?',
              answer: 'Yes. In CSS, 3-digit HEX codes like #F00 duplicate each character into #FF0000, converting to rgb(255, 0, 0). Our converter handles this automatically.',
            },
          ]}
          relatedTools={[
            {
              name: 'HEX to HSL Converter',
              href: '/tools/hex-to-hsl',
              desc: 'Convert HEX colors into Hue, Saturation, and Lightness coordinates.',
            },
            {
              name: 'CSS Color Converter',
              href: '/tools/css-converter',
              desc: 'Format colors for CSS4, Tailwind, Android XML, and Flutter.',
            },
            {
              name: 'Color Contrast Checker',
              href: '/tools/color-contrast-checker',
              desc: 'Validate WCAG 2.1 AA/AAA accessibility compliance for your RGB pairs.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
