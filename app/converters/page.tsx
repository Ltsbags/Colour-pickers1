import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';
import {
  ArrowRightLeft,
  Sliders,
  Code,
  Printer,
  Sparkles,
  Layers,
  CheckCircle2,
  FileCode,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color Converters Suite | HEX, RGB, HSL, HSV, CMYK & CSS',
  description:
    'Accurate client-side color converters for web designers and software developers. Convert between HEX, RGB, HSL, HSV, CMYK, CSS Variables, and Tailwind classes.',
  alternates: {
    canonical: 'https://color-pickers.com/converters',
  },
  openGraph: {
    title: 'Color Converters Suite | HEX, RGB, HSL, HSV, CMYK & CSS',
    description:
      'Fast client-side color converters. Convert between HEX, RGB, HSL, HSV, CMYK, CSS Variables, and Tailwind classes.',
    url: 'https://color-pickers.com/converters',
    type: 'website',
  },
};

const CONVERTER_TOOLS = [
  {
    title: 'HEX to RGB Converter',
    desc: 'Convert 6-digit and 3-digit hex strings into standard Red, Green, Blue integer channels (0–255).',
    href: '/tools/hex-to-rgb',
    icon: ArrowRightLeft,
    badge: 'Popular',
    code: 'rgb(59, 130, 246)',
  },
  {
    title: 'HEX to HSL Converter',
    desc: 'Translate hexadecimal codes into Hue angle (0°–360°), Saturation %, and Lightness % values.',
    href: '/tools/hex-to-hsl',
    icon: Sliders,
    badge: 'UI Design',
    code: 'hsl(217, 91%, 60%)',
  },
  {
    title: 'HEX to HSV / HSB Converter',
    desc: 'Compute Hue, Saturation, and Value brightness metrics used by Photoshop, Illustrator, and Figma.',
    href: '/tools/hex-to-hsv',
    icon: Sparkles,
    badge: 'Figma & Sketch',
    code: 'hsv(217, 76%, 96%)',
  },
  {
    title: 'HEX to CMYK Converter',
    desc: 'Transform digital hex colors into Cyan, Magenta, Yellow, and Key Black print ink percentages.',
    href: '/tools/hex-to-cmyk',
    icon: Printer,
    badge: 'Print Prep',
    code: 'cmyk(76%, 47%, 0%, 4%)',
  },
  {
    title: 'CSS & Tailwind Color Converter',
    desc: 'Export CSS custom variables (--color), 8-digit HEXA, RGBA, HSLA, and Tailwind v3/v4 utility classes.',
    href: '/tools/css-converter',
    icon: FileCode,
    badge: 'Frontend',
    code: 'var(--color-primary)',
  },
  {
    title: 'Universal Multi-Format Converter',
    desc: 'All-in-one matrix converting between any two color models in real time with alpha transparency.',
    href: '/tools/converter',
    icon: Code,
    badge: 'All-in-One',
    code: '#3B82F6 ⇄ All Formats',
  },
];

export default function ConvertersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Converters' }]} />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Multi-Format Color Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Color Format Converters
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Accurate, client-side color space transformation tools. Convert colors between HEX, RGB, HSL, HSV, CMYK, CSS variables, and Tailwind tokens directly in your browser.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Live Interactive Converter */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Live Quick Converter
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Type any hex code or pick a color to preview all standard formats simultaneously
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
              100% Client-Side
            </span>
          </div>
          <ColorConverterComponent initialHex="3B82F6" />
        </section>

        {/* Dedicated Converter Tool Cards */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Dedicated Conversion Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Specialized converters with step-by-step mathematical formulas and copyable code blocks
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONVERTER_TOOLS.map(tool => {
              const IconComp = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs hover:shadow-lg hover:border-blue-500 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <code className="text-[11px] font-mono text-slate-400">
                      {tool.code}
                    </code>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      Open →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <AdSlot type="in-content" />

        {/* Technical Reference Table */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Color Model Formulas & Use Cases
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="py-3 px-4 font-bold">Model</th>
                  <th className="py-3 px-4 font-bold">Channel Range</th>
                  <th className="py-3 px-4 font-bold">Color Space</th>
                  <th className="py-3 px-4 font-bold">Primary Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-bold font-mono text-blue-600 dark:text-blue-400">HEX</td>
                  <td className="py-3 px-4 font-mono">#000000 to #FFFFFF</td>
                  <td className="py-3 px-4">sRGB (Additive)</td>
                  <td className="py-3 px-4">HTML, CSS, Web UI, Mobile App Design</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold font-mono text-emerald-600 dark:text-emerald-400">RGB / RGBA</td>
                  <td className="py-3 px-4 font-mono">0–255 (Alpha: 0.0–1.0)</td>
                  <td className="py-3 px-4">sRGB (Additive)</td>
                  <td className="py-3 px-4">Browser Display, Canvas 2D, WebGL, Screen Rendering</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold font-mono text-purple-600 dark:text-purple-400">HSL / HSLA</td>
                  <td className="py-3 px-4 font-mono">H: 0–360°, S: 0–100%, L: 0–100%</td>
                  <td className="py-3 px-4">Cylindrical sRGB</td>
                  <td className="py-3 px-4">Design Systems, CSS Themes, Programmatic Lightness Shift</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold font-mono text-amber-600 dark:text-amber-400">HSV / HSB</td>
                  <td className="py-3 px-4 font-mono">H: 0–360°, S: 0–100%, V: 0–100%</td>
                  <td className="py-3 px-4">Cylindrical sRGB</td>
                  <td className="py-3 px-4">Figma, Adobe Creative Suite, Sketch, Digital Painting</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold font-mono text-rose-600 dark:text-rose-400">CMYK</td>
                  <td className="py-3 px-4 font-mono">C, M, Y, K: 0%–100%</td>
                  <td className="py-3 px-4">Subtractive Ink</td>
                  <td className="py-3 px-4">Commercial Offset Printing, Packaging, Posters</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
