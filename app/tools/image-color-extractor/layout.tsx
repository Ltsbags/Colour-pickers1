import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Color Extractor - Auto-Detect Dominant Swatches & Codes',
  description:
    'Upload or drop any image to automatically extract dominant color palettes, primary background hues, and exact HEX, RGB, HSL, and CMYK color codes.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/image-color-extractor',
  },
  openGraph: {
    title: 'Image Color Extractor | Color Pickers',
    description:
      'Upload or drop any image to extract dominant color palettes and exact HEX, RGB, HSL, and CMYK color codes.',
    url: 'https://color-pickers.com/tools/image-color-extractor',
    type: 'website',
  },
};

export default function ImageColorExtractorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
