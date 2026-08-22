import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Color Picker - Eyedropper & Pixel Inspector for Photos',
  description:
    'Upload or drag and drop any image, hover with the precision zoom loupe, and click any pixel to sample exact HEX and RGB color values.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/image-color-picker',
  },
  openGraph: {
    title: 'Image Color Picker | Color Pickers',
    description:
      'Upload or drag and drop any image and sample exact pixel colors with precision zoom.',
    url: 'https://color-pickers.com/tools/image-color-picker',
    type: 'website',
  },
};

export default function ImageColorPickerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
