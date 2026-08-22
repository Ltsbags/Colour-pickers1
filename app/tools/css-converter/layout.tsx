import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Color Converter - RGB, HSL, Hex, OKLCH & Tailwind Syntaxes',
  description:
    'Convert between modern CSS color declaration syntaxes including hex, rgb(), rgba(), hsl(), hsla(), oklch(), oklab(), and arbitrary Tailwind utility classes.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/css-converter',
  },
  openGraph: {
    title: 'CSS Color Converter | Color Pickers',
    description:
      'Convert between modern CSS color declaration syntaxes including hex, rgb, hsl, oklch, and Tailwind.',
    url: 'https://color-pickers.com/tools/css-converter',
    type: 'website',
  },
};

export default function CssConverterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
