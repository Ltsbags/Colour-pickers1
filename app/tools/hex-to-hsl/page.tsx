import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';
import { ToolSeoContent } from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'HEX to HSL Converter | Free Online HEX ⇄ HSL Color Code Tool',
  description: 'Convert HEX color codes to HSL (Hue, Saturation, Lightness) values and vice-versa. Includes CSS hsl() formatting, formulas, saturation scales, and FAQs.',
  alternates: {
    canonical: 'https://colorpickers.app/tools/hex-to-hsl',
  },
  openGraph: {
    title: 'HEX to HSL Color Converter | Hue, Saturation, Lightness',
    description: 'Transform hex codes into cylindrical HSL coordinates for intuitive color adjustments and design systems.',
    url: 'https://colorpickers.app/tools/hex-to-hsl',
    type: 'website',
  },
};

export default function HexToHslPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'HEX to HSL Converter' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            HEX to HSL Color Converter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Convert HEX hexadecimal colors into cylindrical HSL (Hue 0–360°, Saturation 0–100%, Lightness 0–100%) representation with live sliders and CSS hsl() syntax generator.
          </p>
        </div>

        <AdSlot type="header" />

        <div className="my-8">
          <ColorConverterComponent initialHex="10B981" defaultMode="hsl" />
        </div>

        <AdSlot type="in-content" />

        <ToolSeoContent
          toolTitle="HEX to HSL Color Converter"
          toolSlug="hex-to-hsl"
          category="Color Conversion"
          overviewTitle="Why Convert HEX to HSL?"
          overviewParagraphs={[
            'HSL (Hue, Saturation, Lightness) is a cylindrical-coordinate representation of points in an RGB color model developed in the 1970s. While HEX and RGB are oriented toward how digital screens emit light via hardware subpixels, HSL was designed to reflect human visual perception.',
            'In HSL: Hue (0°–360°) corresponds to the color family on the color wheel (e.g., 0° Red, 120° Green, 240° Blue), Saturation (0%–100%) dictates the purity or vibrancy of the pigment, and Lightness (0%–100%) controls the luminance from pure black (0%) to pure white (100%).',
            'For UI designers and web developers, HSL makes creating harmonious color palettes, active hover states, and dark mode variants infinitely easier. Instead of guessing hexadecimal math, you can simply increment or decrement Lightness (L) or Saturation (S) by a fixed percentage.',
          ]}
          howToSteps={[
            {
              step: 'Input your HEX Code',
              description: 'Type or paste any 3 or 6-character hexadecimal color code into the HEX field.',
            },
            {
              step: 'Tweak Hue, Saturation, or Lightness',
              description: 'Adjust the 360-degree color wheel angle (Hue) or percentage sliders for intensity and brightness.',
            },
            {
              step: 'Inspect Live Color Changes',
              description: 'Observe the instantaneous feedback in the interactive canvas and complementary format values.',
            },
            {
              step: 'Copy CSS hsl() Snippet',
              description: 'Grab the exact CSS hsl(160deg, 84%, 39%) snippet ready to paste into your design system or stylesheet.',
            },
          ]}
          features={[
            {
              title: 'Intuitive Perceptual Controls',
              description: 'Modify brightness or saturation without altering the underlying base hue family.',
            },
            {
              title: 'Modern CSS hsl() Support',
              description: 'Generates standard legacy CSS3 and modern CSS Color Module Level 4 slash-syntax formats.',
            },
            {
              title: 'Bidirectional Synced Sliders',
              description: 'Changes to any HSL channel update the HEX string instantly with zero rounding drift.',
            },
            {
              title: 'Color Wheel Angle Guide',
              description: 'Visual 0°–360° indicator clearly positions your color in primary and secondary spectra.',
            },
            {
              title: 'Fast Browser-Based Math',
              description: 'Calculations execute client-side directly in your browser with floating-point accuracy.',
            },
            {
              title: 'Integrated Palette Generator',
              description: 'Easily find tints, shades, and tones derived directly from your HSL lightness values.',
            },
          ]}
          formulaTitle="How is HEX Converted to HSL?"
          formulaContent={
            <div className="space-y-3 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-sm">
                1. First convert HEX to normalized RGB fractions: <code>r = R/255, g = G/255, b = B/255</code>.
              </p>
              <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-sm">
                2. Find <code>max = max(r,g,b)</code>, <code>min = min(r,g,b)</code>, and <code>delta = max - min</code>.
              </p>
              <div className="pl-4 border-l-2 border-emerald-500 space-y-1.5 text-slate-700 dark:text-slate-300">
                <p>• Lightness (L) = (max + min) / 2</p>
                <p>• Saturation (S) = delta === 0 ? 0 : delta / (1 - |2L - 1|)</p>
                <p>• Hue (H) = calculated based on which channel corresponds to max:</p>
                <p className="pl-4 text-emerald-600 dark:text-emerald-400">
                  If max = r: H = 60° × (((g - b)/delta) mod 6)
                  <br />
                  If max = g: H = 60° × (((b - r)/delta) + 2)
                  <br />
                  If max = b: H = 60° × (((r - g)/delta) + 4)
                </p>
              </div>
            </div>
          }
          comparisonTable={{
            headers: ['Sample', 'Color Name', 'HEX', 'HSL Coordinates', 'CSS Syntax'],
            rows: [
              [
                <span key="1" className="inline-block w-4 h-4 rounded-full bg-[#10B981] border" />,
                'Emerald',
                '#10B981',
                '160°, 84%, 39%',
                'hsl(160deg 84% 39%)',
              ],
              [
                <span key="2" className="inline-block w-4 h-4 rounded-full bg-[#3B82F6] border" />,
                'Bright Blue',
                '#3B82F6',
                '217°, 91%, 60%',
                'hsl(217deg 91% 60%)',
              ],
              [
                <span key="3" className="inline-block w-4 h-4 rounded-full bg-[#F59E0B] border" />,
                'Amber Gold',
                '#F59E0B',
                '38°, 92%, 50%',
                'hsl(38deg 92% 50%)',
              ],
              [
                <span key="4" className="inline-block w-4 h-4 rounded-full bg-[#8B5CF6] border" />,
                'Violet Purple',
                '#8B5CF6',
                '258°, 90%, 66%',
                'hsl(258deg 90% 66%)',
              ],
            ],
          }}
          faqs={[
            {
              question: 'Why is HSL preferred over HEX for design systems?',
              answer: 'HSL separates the color family (Hue) from its brightness and saturation. In CSS variables or Tailwind plugins, you can create consistent component themes (such as button hovers and disabled states) simply by modifying the lightness percentage (e.g., L - 10%).',
            },
            {
              question: 'What is the difference between HSL and HSV?',
              answer: 'While both use Hue from 0-360°, HSL defines Lightness (50% is pure color, 100% is pure white), whereas HSV defines Value (100% is full brightness color, and mixing with white requires lowering saturation).',
            },
            {
              question: 'Is HSL supported across all browsers?',
              answer: 'Yes, standard hsl() and hsla() syntax is fully supported across 100% of modern web browsers and mobile runtimes.',
            },
          ]}
          relatedTools={[
            {
              name: 'HEX to HSV Converter',
              href: '/tools/hex-to-hsv',
              desc: 'Convert HEX to Hue, Saturation, Value for graphic design.',
            },
            {
              name: 'Color Shades Generator',
              href: '/tools/color-shades-generator',
              desc: 'Generate systematic tints, shades, and tones for any HSL color.',
            },
            {
              name: 'HEX to RGB Converter',
              href: '/tools/hex-to-rgb',
              desc: 'Convert hexadecimal strings to Red, Green, Blue integers.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
