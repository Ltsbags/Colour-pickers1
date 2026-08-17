import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';

export const metadata: Metadata = {
  title: 'HEX to HSL Converter | Color Pickers',
  description: 'Convert HEX color codes to HSL (Hue, Saturation, Lightness) percentages. Free, instant, and high-precision color converter.',
};

export default function HexToHslPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'HEX to HSL Converter' },
          ]}
        />

        <div className="my-6 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            HEX ⇄ HSL Color Converter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Convert HEX codes to HSL (Hue 0-360°, Saturation 0-100%, Lightness 0-100%) coordinates.
          </p>
        </div>

        <AdSlot type="header" />

        <div className="my-8">
          <ColorConverterComponent initialHex="10B981" defaultMode="hsl" />
        </div>

        <AdSlot type="in-content" />
      </main>

      <Footer />
    </div>
  );
}
