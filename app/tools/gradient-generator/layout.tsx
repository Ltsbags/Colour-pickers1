import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator - Linear, Radial, Conic & Tailwind Code',
  description:
    'Design custom multi-stop linear and radial gradients visually. Adjust color stops, angles, and opacity, and copy production-ready CSS and Tailwind CSS classes.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/gradient-generator',
  },
  openGraph: {
    title: 'CSS Gradient Generator - Linear & Radial | Color Pickers',
    description:
      'Design custom multi-stop linear and radial gradients visually. Copy production-ready CSS and Tailwind CSS code.',
    url: 'https://color-pickers.com/tools/gradient-generator',
    type: 'website',
  },
};

export default function GradientGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
