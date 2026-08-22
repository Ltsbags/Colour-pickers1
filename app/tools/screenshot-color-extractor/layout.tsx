import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Screenshot Color Extractor - UI Swatches & Design System Inspect',
  description:
    'Paste or upload website screenshots and UI mockups to extract brand colors, button styles, background tones, and text color codes.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/screenshot-color-extractor',
  },
  openGraph: {
    title: 'Screenshot Color Extractor | Color Pickers',
    description:
      'Paste or upload website screenshots and UI mockups to extract brand colors and UI styles.',
    url: 'https://color-pickers.com/tools/screenshot-color-extractor',
    type: 'website',
  },
};

export default function ScreenshotColorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
