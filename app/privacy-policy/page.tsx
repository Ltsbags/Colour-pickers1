import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | Color Pickers',
  description: 'Color Pickers Privacy Policy outlining data usage, cookies, and Google AdSense compliance.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="my-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xs">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">Last updated: July 2026</p>

          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="font-bold text-base text-slate-900 dark:text-white pt-2">
              1. Information We Collect
            </h2>
            <p>
              Color Pickers operates primarily as a client-side tool. Color conversions, gradient generations, and palette creations happen directly inside your web browser. We do not collect, store, or transmit your color choices or personal data to external database servers.
            </p>

            <h2 className="font-bold text-base text-slate-900 dark:text-white pt-2">
              2. Cookies and Local Storage
            </h2>
            <p>
              We use standard browser <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code> solely to remember your UI theme preference (Dark or Light mode).
            </p>

            <h2 className="font-bold text-base text-slate-900 dark:text-white pt-2">
              3. Google AdSense & Third-Party Advertising
            </h2>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
            </p>
            <p>
              Users may opt out of personalized advertising by visiting Advertising Settings on Google or www.aboutads.info.
            </p>

            <h2 className="font-bold text-base text-slate-900 dark:text-white pt-2">
              4. Contact Information
            </h2>
            <p>
              If you have any questions regarding this privacy policy, please contact us via our Contact Page.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
