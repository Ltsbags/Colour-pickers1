import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ADSENSE_ENABLED, ADSENSE_CLIENT_ID } from '@/lib/adsense-config';

export const metadata: Metadata = {
  metadataBase: new URL('https://color-pickers.com'),
  title: {
    default: 'Color Pickers - Fast & Precise Online Color Tools',
    template: '%s | Color Pickers',
  },
  description:
    'Free, client-side color tools: HEX, RGB, HSL, CMYK, OKLCH converters, WCAG contrast checker, palette generator, gradient creator, and image color extractor.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Color Pickers - Fast & Precise Online Color Tools',
    description:
      'Fast client-side color tools: HEX, RGB, HSL, CMYK, OKLCH converters, WCAG contrast checker, palette generator, and image color extractor.',
    url: 'https://color-pickers.com',
    siteName: 'Color Pickers',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Pickers - Fast & Precise Online Color Tools',
    description:
      'Fast client-side color tools: HEX, RGB, HSL, CMYK, OKLCH converters, WCAG contrast checker, palette generator, and image color extractor.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isAdSenseActive = ADSENSE_ENABLED && Boolean(ADSENSE_CLIENT_ID);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('colour-lab-theme') || localStorage.getItem('chroma-theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        {isAdSenseActive && (
          <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
        )}
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-blue-500 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
        {isAdSenseActive && (
          <Script
            id="google-adsense"
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          />
        )}
      </body>
    </html>
  );
}
