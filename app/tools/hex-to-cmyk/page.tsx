import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ColorConverterComponent } from '@/components/ColorConverterComponent';
import { ToolSeoContent } from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'HEX to CMYK Converter | Free Online Print Color Code Tool',
  description: 'Convert HEX color codes to print-ready CMYK (Cyan, Magenta, Yellow, Key/Black) percentages. Free tool with color formulas, print guides, and real-time conversion.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/hex-to-cmyk',
  },
  openGraph: {
    title: 'HEX to CMYK Color Converter | Web to Print Ready',
    description: 'Transform digital hex colors into four-color process CMYK percentages for physical print production.',
    url: 'https://color-pickers.com/tools/hex-to-cmyk',
    type: 'website',
  },
};

export default function HexToCmykPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'HEX to CMYK Converter' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            HEX to CMYK Color Converter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Convert digital screen HEX and RGB colors into subtractive four-color printing CMYK (Cyan, Magenta, Yellow, Key/Black) percentages with real-time accuracy.
          </p>
        </div>

        <AdSlot type="header" />

        <div className="my-8">
          <ColorConverterComponent initialHex="EC4899" defaultMode="cmyk" />
        </div>

        <AdSlot type="in-content" />

        <ToolSeoContent
          toolTitle="HEX to CMYK Print Color Converter"
          toolSlug="hex-to-cmyk"
          category="Color Conversion"
          overviewTitle="Bridging Digital Screens (RGB/HEX) and Physical Print (CMYK)"
          overviewParagraphs={[
            'Modern digital screens create millions of colors through an additive process using Red, Green, and Blue light (RGB/HEX). Physical printing presses, commercial printers, and desktop inkjet machines work on an entirely different subtractive color system: CMYK (Cyan, Magenta, Yellow, and Key/Black).',
            'When inks are layered on white paper, each ink absorbs (subtracts) specific wavelengths of light. To accurately reproduce digital brand assets, business cards, posters, and packaging in physical print, designers must convert their hexadecimal hex colors into precise CMYK ink percentages.',
            'Our online tool performs standardized mathematical conversion between digital RGB/HEX spaces and 4-color process CMYK percentages, ensuring your physical prints closely match your digital prototypes.',
          ]}
          howToSteps={[
            {
              step: 'Enter Your Digital HEX Code',
              description: 'Paste your 6-digit web hexadecimal color into the HEX input box.',
            },
            {
              step: 'Inspect 4-Channel Print Percentages',
              description: 'View the calculated ink percentages for Cyan (C), Magenta (M), Yellow (Y), and Key/Black (K).',
            },
            {
              step: 'Tweak Ink Balances',
              description: 'Adjust individual CMYK sliders (0–100%) to see the corresponding digital hex reproduction.',
            },
            {
              step: 'Export for Print Production',
              description: 'Copy the CMYK values to your design specs, brand guideline documentation, or prepress checklist.',
            },
          ]}
          features={[
            {
              title: 'Standardized 4-Color Process',
              description: 'Calculates pure subtractive color percentages used across commercial offset and digital presses.',
            },
            {
              title: 'Rich Black & Ink Balance Analysis',
              description: 'Easily balance pure black (0,0,0,100) vs rich black combinations for deep dark printing.',
            },
            {
              title: 'Real-Time Bidirectional Editing',
              description: 'Adjusting any ink percentage recomputes the equivalent RGB and HEX preview in real time.',
            },
            {
              title: 'No Plugins or Downloads Required',
              description: 'Get immediate print specs directly in your web browser without opening heavy desktop software.',
            },
            {
              title: 'Brand Guideline Ready',
              description: 'Format CMYK values cleanly for your company design tokens and style guides.',
            },
          ]}
          formulaTitle="The Standard Mathematical RGB to CMYK Formula"
          formulaContent={
            <div className="space-y-3 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-sm">
                Given normalized RGB values <code>r, g, b ∈ [0, 1]</code>:
              </p>
              <div className="pl-4 border-l-2 border-pink-500 space-y-1.5 text-slate-700 dark:text-slate-300">
                <p>• Black (K) = 1 - max(r, g, b)</p>
                <p>• If K = 1: C = 0%, M = 0%, Y = 0%, K = 100%</p>
                <p>• Else:</p>
                <p className="pl-4 text-pink-600 dark:text-pink-400">
                  Cyan (C) = ((1 - r - K) / (1 - K)) × 100%
                  <br />
                  Magenta (M) = ((1 - g - K) / (1 - K)) × 100%
                  <br />
                  Yellow (Y) = ((1 - b - K) / (1 - K)) × 100%
                </p>
              </div>
            </div>
          }
          faqs={[
            {
              question: 'Why do CMYK print colors sometimes look duller than on my screen?',
              answer: 'Computer screens emit direct RGB light and can display a wider gamut (vibrant neon greens and electric blues) than physical inks on paper can reflect. Converting to CMYK represents the closest physical ink mixture achievable.',
            },
            {
              question: 'What is the difference between standard black and rich black in CMYK?',
              answer: 'Standard black is 100% Key (C:0 M:0 Y:0 K:100), used for small body text. Rich black adds percentages of Cyan, Magenta, and Yellow (e.g., C:60 M:40 Y:40 K:100) to create a much deeper, saturated black on large print backgrounds.',
            },
            {
              question: 'Can I use CMYK directly in CSS?',
              answer: 'CSS does not natively support CMYK for web display. CMYK is intended for print media, PDF exports, and prepress prep.',
            },
          ]}
          relatedTools={[
            {
              name: 'HEX to RGB Converter',
              href: '/tools/hex-to-rgb',
              desc: 'Convert HEX to decimal RGB for screen graphics and web code.',
            },
            {
              name: 'Color Shades Generator',
              href: '/tools/color-shades-generator',
              desc: 'Generate monochromatic ink scales and tints.',
            },
            {
              name: 'Color Contrast Checker',
              href: '/tools/color-contrast-checker',
              desc: 'Ensure print typography passes readability contrast standards.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
