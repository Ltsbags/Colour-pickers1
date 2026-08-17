import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';

export const metadata: Metadata = {
  title: 'HEX to HSV Converter | Color Pickers',
  description: 'Convert HEX color codes to HSV (Hue, Saturation, Value) coordinates for digital art and graphic design software.',
};

export default function HexToHsvPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'HEX to HSV Converter' },
          ]}
        />

        <div className="my-6 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            HEX ⇄ HSV Color Converter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Convert HEX codes to HSV (Hue, Saturation, Value) color model used in Photoshop and digital illustration.
          </p>
        </div>

        <AdSlot type="header" />

        <div className="my-8">
          <ColorConverterComponent initialHex="8B5CF6" defaultMode="hsv" />
        </div>

        <AdSlot type="in-content" />
      </main>

      <Footer />
    </div>
  );
}
