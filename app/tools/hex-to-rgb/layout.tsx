import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HEX to RGB Converter - Instant Online Conversion & Formula',
  description:
    'Convert hexadecimal hex color codes to red, green, and blue (RGB / RGBA) numerical values with real-time preview, copyable CSS syntax, and mathematical conversion formulas.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/hex-to-rgb',
  },
  openGraph: {
    title: 'HEX to RGB Converter | Color Pickers',
    description:
      'Convert hexadecimal hex color codes to red, green, and blue (RGB / RGBA) numerical values.',
    url: 'https://color-pickers.com/tools/hex-to-rgb',
    type: 'website',
  },
};

export default function HexToRgbLayout({ children }: { children: React.ReactNode }) {
  return children;
}
