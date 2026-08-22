import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Shades & Tints Generator - 10-Step Scale Ramp for Design Systems',
  description:
    'Generate comprehensive 10-step monochromatic shades (mixed with black), tints (mixed with white), and tones (mixed with gray) for design systems and Tailwind color ramps.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/color-shades-generator',
  },
  openGraph: {
    title: 'Color Shades & Tints Generator | Color Pickers',
    description:
      'Generate 10-step monochromatic shades, tints, and tones for design systems and UI scales.',
    url: 'https://color-pickers.com/tools/color-shades-generator',
    type: 'website',
  },
};

export default function ColorShadesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
