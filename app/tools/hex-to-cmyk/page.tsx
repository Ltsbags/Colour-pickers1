import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';

export const metadata: Metadata = {
  title: 'HEX to CMYK Converter | Color Pickers',
  description: 'Convert HEX web colors to CMYK (Cyan, Magenta, Yellow, Key) percentages for commercial printing and offset presses.',
};

export default function HexToCmykPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'HEX to CMYK Converter' },
          ]}
        />

        <div className="my-6 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            HEX ⇄ CMYK Color Converter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Convert screen web colors (HEX) to print ink percentages (Cyan, Magenta, Yellow, Key).
          </p>
        </div>

        <AdSlot type="header" />

        <div className="my-8">
          <ColorConverterComponent initialHex="EC4899" defaultMode="cmyk" />
        </div>

        <AdSlot type="in-content" />
      </main>

      <Footer />
    </div>
  );
}
