import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HEX to CMYK Converter - Web to Print Color Translation',
  description:
    'Convert digital HEX and RGB screen colors to four-color printing CMYK (Cyan, Magenta, Yellow, Key Black) percentage values with ink coverage insights.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/hex-to-cmyk',
  },
  openGraph: {
    title: 'HEX to CMYK Converter | Color Pickers',
    description:
      'Convert digital HEX and RGB screen colors to four-color printing CMYK percentages.',
    url: 'https://color-pickers.com/tools/hex-to-cmyk',
    type: 'website',
  },
};

export default function HexToCmykLayout({ children }: { children: React.ReactNode }) {
  return children;
}
