import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Color Picker - Eyedropper & Color Wheel (HEX, RGB, HSL)',
  description:
    'Sample colors directly from your screen with native eyedropper support or fine-tune hues using the interactive color wheel. Get instant HEX, RGB, HSL, HSV, and CMYK codes.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/color-picker',
  },
  openGraph: {
    title: 'Online Color Picker - Eyedropper & Color Wheel | Color Pickers',
    description:
      'Sample colors from your screen with native eyedropper support or fine-tune hues using the interactive color wheel.',
    url: 'https://color-pickers.com/tools/color-picker',
    type: 'website',
  },
};

export default function ColorPickerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
