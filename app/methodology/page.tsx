import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
  Calculator,
  ShieldCheck,
  Eye,
  Sliders,
  Sparkles,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color Science & Calculation Methodology | Color Pickers',
  description:
    'Detailed mathematical formulas, color space definitions, and algorithms used by Color Pickers for HEX, RGB, HSL, HSV, CMYK, OKLab, OKLCH, and WCAG contrast evaluations.',
  alternates: {
    canonical: 'https://color-pickers.com/methodology',
  },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Methodology & Color Science' },
          ]}
        />

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Mathematical Standards & Specifications</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Color Science & Calculation Methodology
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Color Pickers uses standardized mathematical models, colorimetry specifications, and W3C guidelines to perform conversions, generate palettes, and evaluate accessibility metrics. All transformations execute client-side inside your browser engine.
          </p>
        </div>

        {/* Core Principles */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>1. Foundational Architecture & Precision</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">Local Browser Execution</h3>
              <p>
                Calculations are computed locally using TypeScript logic running inside the user’s JavaScript runtime. Color values and uploaded images are processed on your device and are not transmitted to remote servers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">Standardized Color Spaces</h3>
              <p>
                All RGB and HEX operations assume the standard sRGB gamut (IEC 61966-2-1:1999) with D65 reference white, which is the baseline color model for web browsers and display screens.
              </p>
            </div>
          </div>
        </section>

        {/* HEX & RGB Conversion */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <ArrowRightLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>2. HEX & RGB Conversions</span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              A hexadecimal color code encodes three 8-bit channels (Red, Green, Blue) as base-16 integers ranging from <code>00</code> (0) to <code>FF</code> (255).
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto space-y-2">
              <div className="text-slate-400">{'// HEX to RGB Bit-Shift Algorithm'}</div>
              <div>R = (hexInteger &gt;&gt; 16) &amp; 0xFF</div>
              <div>G = (hexInteger &gt;&gt; 8) &amp; 0xFF</div>
              <div>B = hexInteger &amp; 0xFF</div>
            </div>

            <p>
              For 3-digit shorthand syntax (e.g., <code>#F57</code>), each character is doubled (<code>#FF5577</code>) in accordance with the W3C CSS Color Module Level 3 specification before decoding.
            </p>
          </div>
        </section>

        {/* HSL & HSV Geometry */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>3. HSL & HSV Coordinate Transformations</span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              HSL (Hue, Saturation, Lightness) and HSV (Hue, Saturation, Value) represent cylindrical re-mappings of the sRGB cube:
            </p>

            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                <strong>Hue ($H$):</strong> An angle from 0° to 360° on the color wheel calculated from the dominant RGB channel and channel delta.
              </li>
              <li>
                <strong>Lightness ($L$):</strong> The arithmetic mean of the maximum and minimum normalized RGB components: $L = (max + min) / 2$.
              </li>
              <li>
                <strong>Value ($V$):</strong> The maximum normalized RGB component: $V = max(R, G, B)$.
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto space-y-1">
              <div className="text-slate-400">{'// HSL Saturation Calculation'}</div>
              <div>Δ = max(R, G, B) - min(R, G, B)</div>
              <div>if Δ == 0: S = 0</div>
              <div>else if L &gt; 0.5: S = Δ / (2 - max - min)</div>
              <div>else: S = Δ / (max + min)</div>
            </div>
          </div>
        </section>

        {/* CMYK Printing Approximation */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <span>4. CMYK Subtractive Ink Approximation</span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              CMYK (Cyan, Magenta, Yellow, Key/Black) values are calculated using standard digital subtractive color simulation.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto space-y-1">
              <div>K = 1 - max(R/255, G/255, B/255)</div>
              <div>if K == 1: C = 0, M = 0, Y = 0, K = 100%</div>
              <div>else:</div>
              <div>  C = ((1 - R/255 - K) / (1 - K)) × 100%</div>
              <div>  M = ((1 - G/255 - K) / (1 - K)) × 100%</div>
              <div>  Y = ((1 - B/255 - K) / (1 - K)) × 100%</div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              Note: Digital CMYK conversion provides a mathematical model. Physical printing reproduction depends on specific press profiles, paper stock absorption, and ink pigment gamuts (such as SWOP, GRACoL, or FOGRA39).
            </p>
          </div>
        </section>

        {/* WCAG Contrast & Relative Luminance */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>5. WCAG 2.1 Relative Luminance & Contrast Evaluation</span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Contrast ratios are evaluated according to the W3C Web Content Accessibility Guidelines (WCAG 2.1 Success Criterion 1.4.3 &amp; 1.4.6).
            </p>

            <h4 className="font-bold text-slate-900 dark:text-white pt-2">
              A. Linear Gamma Expansion (R_linear, G_linear, B_linear)
            </h4>
            <p>
              To calculate luminance, sRGB values (0–255) are normalized to 0.0–1.0 and de-gamma corrected:
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto space-y-1">
              <div>c = channel / 255</div>
              <div>if c &lt;= 0.04045: c_linear = c / 12.92</div>
              <div>else: c_linear = ((c + 0.055) / 1.055) ^ 2.4</div>
            </div>

            <h4 className="font-bold text-slate-900 dark:text-white pt-2">
              B. Relative Luminance ($L$)
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              L = 0.2126 × R_linear + 0.7152 × G_linear + 0.0722 × B_linear
            </div>

            <h4 className="font-bold text-slate-900 dark:text-white pt-2">
              C. Contrast Ratio Formula
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
              <div className="text-slate-400 mt-1">{'// Where L1 is the lighter color luminance and L2 is the darker'}</div>
            </div>

            <h4 className="font-bold text-slate-900 dark:text-white pt-2">
              D. WCAG 2.1 Conformance Thresholds
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="font-bold text-xs text-slate-900 dark:text-white">Level AA Standard</div>
                <div className="text-xs text-slate-500 mt-1">• Normal Text (&lt; 18pt / 14pt bold): <strong>≥ 4.5:1</strong></div>
                <div className="text-xs text-slate-500">• Large Text (≥ 18pt or 14pt bold): <strong>≥ 3.0:1</strong></div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="font-bold text-xs text-slate-900 dark:text-white">Level AAA Enhanced</div>
                <div className="text-xs text-slate-500 mt-1">• Normal Text (&lt; 18pt / 14pt bold): <strong>≥ 7.0:1</strong></div>
                <div className="text-xs text-slate-500">• Large Text (≥ 18pt or 14pt bold): <strong>≥ 4.5:1</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* OKLab & OKLCH */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>6. Perceptual Uniformity: OKLab &amp; OKLCH</span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              OKLab is a perceptually uniform color space designed by Björn Ottosson (2020) that models human color perception. OKLCH translates OKLab coordinates into intuitive cylindrical components (Lightness, Chroma, Hue angle).
            </p>

            <p>
              Linear sRGB is transformed into cone responses (LMS space) using the forward matrix, processed via cubic non-linearity (cubic root x^(1/3)), and mapped onto the orthogonal L, a, b axes.
            </p>
          </div>
        </section>

        {/* Color Naming Resolution */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>7. Standardized Color Naming Hierarchy</span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              To maintain consistency across Color-Pickers.com, color names are resolved through a centralized classification rule:
            </p>

            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                <strong>Official CSS Color Name:</strong> Used exclusively when a HEX code exactly matches one of the 148 W3C CSS Color Module Level 4 standardized color keywords (e.g. <code>#FF0000</code> is &quot;Red&quot;, <code>#0000FF</code> is &quot;Blue&quot;).
              </li>
              <li>
                <strong>Approximate Color Name:</strong> When a color does not match an exact official W3C CSS keyword, the resolver computes Euclidean distance across RGB color space to return the closest named shade, explicitly designated as an approximate descriptor.
              </li>
            </ol>
          </div>
        </section>

        {/* Related Links */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/tools/color-contrast-checker"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Test in WCAG Contrast Checker →</span>
          </Link>

          <Link
            href="/about"
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:underline"
          >
            About Color Pickers →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
