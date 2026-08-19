import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AlertCircle, Monitor, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer | Color Pickers',
  description:
    'Disclaimer and terms regarding color accuracy, monitor calibration, and tool usage on Color Pickers.',
  alternates: {
    canonical: 'https://color-pickers.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

        <div className="my-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Disclaimer
              </h1>
              <p className="text-xs text-slate-400">Last updated: July 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-4">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>1. Color Accuracy & Display Calibration</span>
              </h2>
              <p>
                The color conversions, color pickers, palette generators, and harmony tools provided on Color Pickers are based on standard mathematical models (such as sRGB, CIE XYZ, OKLab, and WCAG relative luminance formulas).
              </p>
              <p>
                However, colors rendered on a computer or mobile screen may visually differ depending on individual monitor calibration, ambient lighting, color gamut capabilities (e.g., standard sRGB vs Display P3 vs Adobe RGB), and operating system color profiles. For mission-critical physical print jobs, physical color swatches (such as Pantone or certified CMYK proof sheets) should be consulted.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>2. General Information & Utility Use</span>
              </h2>
              <p>
                All tools, guides, converters, and palettes on Color Pickers are provided free of charge for informational, educational, and creative purposes. While we strive to maintain complete precision in all mathematical conversions, algorithms are provided on an &quot;as is&quot; basis without warranties of any kind.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>3. Client-Side Image Privacy</span>
              </h2>
              <p>
                Image Color Extractor and Image Palette Generator execute locally inside your web browser via HTML5 Canvas. Your image files are not sent to or stored on our servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                4. Third-Party Links & Advertisements
              </h2>
              <p>
                This website may display third-party advertisements served via Google AdSense. We do not endorse or assume responsibility for any third-party products, services, or websites linked via external ads.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
