import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Color Generator - HEX, RGB, HSL & Palette Inspiration',
  description:
    'Generate vibrant, pastel, dark, light, or random color swatches with one click. Get calculated HEX codes, RGB values, and CSS snippets for design brainstorming.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/random-color',
  },
  openGraph: {
    title: 'Random Color Generator | Color Pickers',
    description:
      'Generate vibrant, pastel, dark, light, or random color swatches with one click. Get HEX and RGB codes.',
    url: 'https://color-pickers.com/tools/random-color',
    type: 'website',
  },
};

export default function RandomColorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
