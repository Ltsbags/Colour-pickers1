import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WCAG Color Contrast Checker - Level AA & AAA Compliance Calculator',
  description:
    'Test background and text foreground colors against Web Content Accessibility Guidelines (WCAG 2.1). Calculate relative luminance contrast ratios and get suggested accessible colors.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/color-contrast-checker',
  },
  openGraph: {
    title: 'WCAG Color Contrast Checker - Level AA & AAA | Color Pickers',
    description:
      'Test background and text foreground colors against Web Content Accessibility Guidelines (WCAG 2.1). Calculate contrast ratios and get suggested accessible pairings.',
    url: 'https://color-pickers.com/tools/color-contrast-checker',
    type: 'website',
  },
};

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
