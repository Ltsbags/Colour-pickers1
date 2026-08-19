import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://color-pickers.com'),
  title: {
    default: 'Color Pickers - Modern Color Tools & Converters',
    template: '%s | Color Pickers',
  },
  description:
    'Free, fast client-side color tools: HEX, RGB, HSL, CMYK, OKLCH converters, WCAG contrast checker, palette generator, gradient creator, and image color extractor.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Color Pickers - Modern Online Color Tools',
    description:
      'Fast client-side color tools: HEX, RGB, HSL, CMYK, OKLCH converters, WCAG contrast checker, palette generator, and image color extractor.',
    url: 'https://color-pickers.com',
    siteName: 'Color Pickers',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Pickers - Modern Online Color Tools',
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
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-9745434299525119';

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

              // Guard against unhandled third-party script errors (AdSense TagError, ad blockers, etc.)
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(e) {
                  if (e && e.message && (
                    e.message.indexOf('adsbygoogle') !== -1 ||
                    e.message.indexOf('TagError') !== -1 ||
                    e.message.indexOf('pagead') !== -1 ||
                    e.filename && e.filename.indexOf('googlesyndication') !== -1
                  )) {
                    e.preventDefault();
                    e.stopPropagation();
                    return true;
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  if (e && e.reason && (
                    String(e.reason).indexOf('adsbygoogle') !== -1 ||
                    String(e.reason).indexOf('TagError') !== -1 ||
                    String(e.reason).indexOf('pagead') !== -1
                  )) {
                    e.preventDefault();
                  }
                });
              }
            `,
          }}
        />
        {adsenseClient && (
          <meta name="google-adsense-account" content={adsenseClient} />
        )}
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-blue-500 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
        {adsenseClient && (
          <Script
            id="google-adsense"
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        )}
      </body>
    </html>
  );
}

