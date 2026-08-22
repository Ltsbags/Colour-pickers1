import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Names Dictionary - 140+ CSS Colors & Descriptive Names',
  description:
    'Search and browse the complete dictionary of official W3C CSS color names and standard descriptive color terms with HEX codes, RGB values, and interactive swatches.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/color-names',
  },
  openGraph: {
    title: 'Color Names Dictionary | Color Pickers',
    description:
      'Search and browse the complete dictionary of official W3C CSS color names with HEX codes and RGB values.',
    url: 'https://color-pickers.com/tools/color-names',
    type: 'website',
  },
};

export default function ColorNamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
