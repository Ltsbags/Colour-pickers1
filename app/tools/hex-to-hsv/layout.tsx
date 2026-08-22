import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HEX to HSV / HSB Converter - Online Value Calculator',
  description:
    'Convert hexadecimal colors to HSV (Hue, Saturation, Value) and HSB values for digital artists, UI designers, and color graphics workflows.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/hex-to-hsv',
  },
  openGraph: {
    title: 'HEX to HSV Converter | Color Pickers',
    description:
      'Convert hexadecimal colors to HSV (Hue, Saturation, Value) and HSB values.',
    url: 'https://color-pickers.com/tools/hex-to-hsv',
    type: 'website',
  },
};

export default function HexToHsvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
