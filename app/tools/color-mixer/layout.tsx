import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Mixer & Blender - Interpolate & Cross-Fade Colors',
  description:
    'Mix two or more colors in exact ratios across RGB, HSL, and LAB color spaces. Visualize step-by-step intermediate gradient swatches and copy color values.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/color-mixer',
  },
  openGraph: {
    title: 'Color Mixer & Blender - Interpolate Colors | Color Pickers',
    description:
      'Mix two or more colors in exact percentages across RGB, HSL, and LAB color spaces. Inspect intermediate steps.',
    url: 'https://color-pickers.com/tools/color-mixer',
    type: 'website',
  },
};

export default function ColorMixerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
