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
              2. Cookies and Local Browser Storage
            </h2>
            <p>
              We utilize browser <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code> solely to enhance your client-side experience:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs pl-2">
              <li>
                <strong>Theme Preferences (<code className="font-mono">colour-lab-theme</code>, <code className="font-mono">chroma-theme</code>):</strong> Persists your chosen appearance mode (Light or Dark theme) between sessions.
              </li>
              <li>
                <strong>Recent Color History (<code className="font-mono">color_pickers_history</code>):</strong> Temporarily stores your recent color swatch inspections locally on your device so you can revisit recent color codes without needing an account.
              </li>
            </ul>
            <p className="pt-2">
              <strong>Uploaded Image Privacy:</strong> When you use our Image Color Picker, your image file is decoded strictly within your browser&apos;s HTML5 Canvas. No image data, bitmap frames, or pixel streams are ever transmitted to or stored on any server.
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
