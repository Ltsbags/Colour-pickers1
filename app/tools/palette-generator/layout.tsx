import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Palette Generator - Create & Export Harmonious Schemes',
  description:
    'Generate balanced 5-color aesthetic palettes with spacebar randomization, color locking, harmony algorithms, and export to CSS, Tailwind, or JSON.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/palette-generator',
  },
  openGraph: {
    title: 'Color Palette Generator - Create Harmonious Schemes | Color Pickers',
    description:
      'Generate balanced 5-color aesthetic palettes with spacebar randomization, color locking, and instant export.',
    url: 'https://color-pickers.com/tools/palette-generator',
    type: 'website',
  },
};

export default function PaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
