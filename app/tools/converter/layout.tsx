import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Universal Color Converter - HEX, RGB, HSL, HSV, CMYK, CSS',
  description:
    'Convert any color code between HEX, RGB, RGBA, HSL, HSLA, HSV, CMYK, OKLCH, and Tailwind CSS classes in real time with client-side mathematical precision.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/converter',
  },
  openGraph: {
    title: 'Universal Color Converter - HEX, RGB, HSL, HSV, CMYK | Color Pickers',
    description:
      'Convert any color code between HEX, RGB, RGBA, HSL, HSLA, HSV, CMYK, OKLCH, and Tailwind CSS classes.',
    url: 'https://color-pickers.com/tools/converter',
    type: 'website',
  },
};

export default function ConverterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
