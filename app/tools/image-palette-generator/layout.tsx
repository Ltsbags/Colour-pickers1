import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Palette Generator - Extract Color Schemes from Photos',
  description:
    'Upload any photograph, illustration, or graphic to automatically extract a 6-color dominant palette, primary background tones, and complementary accents.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/image-palette-generator',
  },
  openGraph: {
    title: 'Image Palette Generator | Color Pickers',
    description:
      'Upload any photograph or illustration to automatically extract a dominant color palette.',
    url: 'https://color-pickers.com/tools/image-palette-generator',
    type: 'website',
  },
};

export default function ImagePaletteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
