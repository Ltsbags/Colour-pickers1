import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Cookie, ShieldCheck, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Color Pickers',
  description:
    'Learn how Color Pickers uses cookies, local browser storage, and third-party advertising services in compliance with privacy regulations.',
  alternates: {
    canonical: 'https://color-pickers.com/cookie-policy',
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

        <div className="my-8 space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Cookie Policy
              </h1>
              <p className="text-xs text-slate-400">Last updated: August 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, remember user preferences, and provide analytical or advertising insights to website operators.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                2. How Color Pickers Uses Cookies & Local Storage
              </h2>
              <p>
                Color Pickers prioritizes client-side privacy. All core color calculations (such as conversions between HEX, RGB, HSL, HSV, and CMYK, contrast calculations, and image extraction) execute directly in your browser. We do not store your uploaded images or personal color palettes on our servers.
              </p>
              <p>
                We use browser storage and cookies for the following specific purposes:
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                  <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white">
                    <tr>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Storage Key / Cookie</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Type</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr>
                      <td className="p-3 font-mono border border-slate-200 dark:border-slate-700">colour-lab-theme</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">localStorage (Client)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">Remembers whether you selected Light Mode or Dark Mode between browser visits.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono border border-slate-200 dark:border-slate-700">color_pickers_history</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">localStorage (Client)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">Saves your recent color inspections locally on your device so you can quickly revisit colors.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono border border-slate-200 dark:border-slate-700">__gads, __gpi, _ga*</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">Third-Party Cookie</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">Used by Google AdSense and analytics to serve relevant advertisements, prevent ad fraud, and measure site traffic.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                3. Google AdSense & Third-Party Cookies
              </h2>
              <p>
                Color Pickers uses Google AdSense to display advertisements. Google and its certified third-party advertising partners use cookies to serve ads based on your prior visits to this website and other websites across the Internet.
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve personalized or non-personalized ads to users based on website visits.
                </li>
                <li>
                  You may opt out of personalized advertising at any time by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline font-semibold"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or by visiting{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline font-semibold"
                  >
                    www.aboutads.info
                  </a>.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                4. Managing & Disabling Cookies
              </h2>
              <p>
                You can manage or disable cookies through your web browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or receive a notification before a cookie is set. Please note that disabling cookies may affect certain website preferences (such as remembering your dark mode preference).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                5. Related Privacy Information
              </h2>
              <p>
                For complete information on how we handle user privacy, data protection, and service terms, please visit our{' '}
                <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/terms" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                  Terms of Service
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
