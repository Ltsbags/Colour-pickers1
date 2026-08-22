import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Harmonies Calculator - Complementary, Triadic, Analogous',
  description:
    'Calculate precise geometric color harmonies including Complementary, Triadic, Analogous, Split-Complementary, Tetradic, and Monochromatic palettes for any base HEX color.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/color-harmonies',
  },
  openGraph: {
    title: 'Color Harmonies Calculator - Complementary & Triadic | Color Pickers',
    description:
      'Calculate geometric color harmonies including Complementary, Triadic, Analogous, and Tetradic schemes.',
    url: 'https://color-pickers.com/tools/color-harmonies',
    type: 'website',
  },
};

export default function ColorHarmoniesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
