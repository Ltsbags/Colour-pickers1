import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service | Color Pickers',
  description: 'Color Pickers Terms of Service for online color utilities.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

        <div className="my-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xs">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">Last updated: July 2026</p>

          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="font-bold text-base text-slate-900 dark:text-white pt-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Color Pickers, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="font-bold text-base text-slate-900 dark:text-white pt-2">
              2. Use License
            </h2>
            <p>
              Color Pickers provides free web-based color tools for personal, creative, and commercial projects. All generated CSS, color schemes, and export files are provided royalty-free for unrestricted use.
            </p>

            <h2 className="font-bold text-base text-slate-900 dark:text-white pt-2">
              3. Disclaimer
            </h2>
            <p>
              The materials and color conversions on Color Pickers are provided on an &apos;as is&apos; basis. While we strive for absolute color accuracy across sRGB, HSL, and CMYK models, browser color rendering may vary based on display monitor profiles.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
