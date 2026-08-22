import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HEX to HSL Converter - Hue, Saturation & Lightness Calculator',
  description:
    'Convert HEX color codes to HSL (Hue, Saturation, Lightness) format with instant interactive preview, CSS code output, and mathematical step-by-step formulas.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/hex-to-hsl',
  },
  openGraph: {
    title: 'HEX to HSL Converter | Color Pickers',
    description:
      'Convert HEX color codes to HSL (Hue, Saturation, Lightness) format with instant interactive preview.',
    url: 'https://color-pickers.com/tools/hex-to-hsl',
    type: 'website',
  },
};

export default function HexToHslLayout({ children }: { children: React.ReactNode }) {
  return children;
}
