import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Color Pickers - Modern Color Tools & Converters',
  description: 'Fast, client-side zero-latency color converters (HEX, RGB, HSL, HSV, CMYK), gradient generator, color palette suite, and WCAG accessibility standards.',
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

