import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';
import { ToolSeoContent } from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'HEX to HSV / HSB Converter | Free Online Color Code Tool',
  description: 'Convert HEX color codes to HSV (Hue, Saturation, Value) / HSB percentages. Free online converter with visual saturation/brightness controls and technical formulas.',
  alternates: {
    canonical: 'https://colorpickers.app/tools/hex-to-hsv',
  },
  openGraph: {
    title: 'HEX to HSV / HSB Color Converter | Color Tools',
    description: 'Transform hex codes into graphic-design friendly HSV / HSB color space.',
    url: 'https://colorpickers.app/tools/hex-to-hsv',
    type: 'website',
  },
};

export default function HexToHsvPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'HEX to HSV Converter' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            HEX to HSV (HSB) Color Converter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Convert HEX hexadecimal colors into HSV (Hue, Saturation, Value) / HSB color space used across digital painting, Photoshop, Figma, and color picker wheels.
          </p>
        </div>

        <AdSlot type="header" />

        <div className="my-8">
          <ColorConverterComponent initialHex="8B5CF6" defaultMode="hsv" />
        </div>

        <AdSlot type="in-content" />

        <ToolSeoContent
          toolTitle="HEX to HSV / HSB Color Converter"
          toolSlug="hex-to-hsv"
          category="Color Conversion"
          overviewTitle="Understanding the HSV / HSB Color Model"
          overviewParagraphs={[
            'The HSV (Hue, Saturation, Value) model, also frequently referred to as HSB (Hue, Saturation, Brightness), is a cylindrical representation of RGB color space specifically formulated to mimic how artists mix paints and adjust pigments in physical mediums.',
            'While developers frequently use HEX and RGB in markup, digital artists and graphic designers in Photoshop, Blender, Procreate, and Figma rely on HSV because the "Value" (or Brightness) channel corresponds directly to the amount of black pigment mixed into the pure hue.',
            'Our online tool translates any 6-character or 3-character HEX code into exact HSV coordinates, allowing you to manipulate hue degrees and saturation percentages with instant bidirectional updates.',
          ]}
          howToSteps={[
            {
              step: 'Paste or Select a HEX Code',
              description: 'Enter your 6-digit hex code or choose a shade with our color swatch selector.',
            },
            {
              step: 'Modify HSV Parameters',
              description: 'Adjust Hue (0–360°), Saturation (0–100%), or Value/Brightness (0–100%) independently.',
            },
            {
              step: 'Compare Results',
              description: 'View the live updated hexadecimal, RGB decimal triplet, and CMYK counterparts simultaneously.',
            },
            {
              step: 'Export or Copy',
              description: 'Copy the computed HSV array or converted hex string to your clipboard with one click.',
            },
          ]}
          features={[
            {
              title: 'Artist-Friendly Color Model',
              description: 'Directly compatible with Adobe Photoshop, Illustrator, Figma, and digital painting palettes.',
            },
            {
              title: 'Precise Percentage Scaling',
              description: 'Delivers consistent rounding to maintain color fidelity during design asset handoffs.',
            },
            {
              title: 'Synchronized Model Calculations',
              description: 'Automatically calculates RGB, HSL, and CMYK alongside HSV in real-time.',
            },
            {
              title: 'Pure Client-Side Math',
              description: 'Color calculations run locally in your browser without requiring network requests.',
            },
            {
              title: 'Mobile & Desktop Optimized',
              description: 'Responsive sliders and touch-friendly controls crafted for any screen size.',
            },
          ]}
          formulaTitle="Mathematical Formula: Converting RGB to HSV"
          formulaContent={
            <div className="space-y-3 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-sm">
                Given normalized RGB fractions <code>r, g, b ∈ [0, 1]</code>:
              </p>
              <div className="pl-4 border-l-2 border-purple-500 space-y-1.5 text-slate-700 dark:text-slate-300">
                <p>• max = max(r, g, b), min = min(r, g, b), delta = max - min</p>
                <p>• Value (V) = max × 100%</p>
                <p>• Saturation (S) = max === 0 ? 0 : (delta / max) × 100%</p>
                <p>• Hue (H) = identical formula to HSL hue calculation (0° to 360°).</p>
              </div>
            </div>
          }
          faqs={[
            {
              question: 'Are HSV and HSB the same thing?',
              answer: 'Yes! HSV (Hue, Saturation, Value) and HSB (Hue, Saturation, Brightness) are identical mathematical models. Adobe software typically labels the third channel "Brightness" (B), while standard graphics literature uses "Value" (V).',
            },
            {
              question: 'When should I use HSV instead of RGB or HEX?',
              answer: 'Use HSV when building custom color pickers, generating color ramps in shader graphics (GLSL/WebGL), or creating harmonious visual palettes in graphic design workflows.',
            },
            {
              question: 'Does CSS directly support hsv() syntax?',
              answer: 'No, native CSS stylesheets support hex, rgb(), and hsl() functions, but not hsv(). You can convert your HSV coordinates to HEX or RGB using our tool before writing your CSS.',
            },
          ]}
          relatedTools={[
            {
              name: 'HEX to HSL Converter',
              href: '/tools/hex-to-hsl',
              desc: 'Convert to CSS-supported Hue, Saturation, Lightness format.',
            },
            {
              name: 'HEX to RGB Converter',
              href: '/tools/hex-to-rgb',
              desc: 'Convert directly into Red, Green, Blue integer components.',
            },
            {
              name: 'Color Shades Generator',
              href: '/tools/color-shades-generator',
              desc: 'Generate complete tint and shade scales.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
