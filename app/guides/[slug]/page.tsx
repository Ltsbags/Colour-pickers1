import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GuideArticleLayout } from '@/components/GuideArticleLayout';
import { GUIDES } from '@/lib/guides-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = GUIDES.find(g => g.slug === slug);

  if (!article) {
    return {
      title: 'Guide Not Found | Color Pickers',
      description: 'The requested guide could not be found.',
    };
  }

  return {
    title: `${article.title} | Color Pickers Guides`,
    description: article.excerpt,
    keywords: article.keywords,
    alternates: {
      canonical: `https://color-pickers.com/guides/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://color-pickers.com/guides/${article.slug}`,
      type: 'article',
      publishedTime: '2026-07-01T08:00:00+00:00',
      authors: ['Color Pickers Editorial Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = GUIDES.find(g => g.slug === slug);

  if (!article) {
    notFound();
  }

  const renderContent = (slug: string) => {
    switch (slug) {
      case 'what-is-a-hex-color':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Key Takeaways</h3>
              <ul className="list-disc list-inside text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <li>A HEX color code is a 6-digit hexadecimal representation of RGB light channels: #RRGGBB.</li>
                <li>Hexadecimal is base-16, using numbers 0–9 and letters A–F (where A=10, B=11, C=12, D=13, E=14, F=15).</li>
                <li>3-digit shorthand (#RGB) expands symmetrically (e.g., #F53 becomes #FF5533).</li>
                <li>8-digit hex codes (#RRGGBBAA) include an alpha transparency channel.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. The Anatomy of a Hexadecimal Color Code
            </h2>
            <p>
              In computer graphics and web design, color displays generate visual colors by projecting microscopic red, green, and blue light-emitting subpixels. A <strong>HEX color code</strong> is simply a compact, human-readable way to specify the brightness of each of these three primary light channels.
            </p>
            <p>
              A standard 6-digit hex code always starts with a hash or pound symbol (<code>#</code>), followed by three pairs of base-16 digits:
            </p>

            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-sm">
              <div className="text-slate-400">{'// Format: #RRGGBB'}</div>
              <div className="text-emerald-400">#3B82F6</div>
              <div className="text-xs text-slate-400 mt-2">
                • Red (RR) = 3B (Hex) = 59 (Decimal, 0–255)<br />
                • Green (GG) = 82 (Hex) = 130 (Decimal, 0–255)<br />
                • Blue (BB) = F6 (Hex) = 246 (Decimal, 0–255)
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. Understanding Base-16 Mathematics
            </h2>
            <p>
              While humans naturally count in base-10 (decimal digits 0 through 9), computers operate in binary (base-2). One byte of computer memory consists of 8 bits, which can represent exactly 256 unique numbers (from 0 to 255).
            </p>
            <p>
              In base-16 (hexadecimal), two characters can represent every single value between 0 and 255:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-100 dark:bg-slate-800 font-bold">
                  <tr>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">Hex</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">00</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">40</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">80</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">C0</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">FF</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 font-bold border border-slate-200 dark:border-slate-700">Decimal</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">0 (0%)</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">64 (25%)</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">128 (50%)</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">192 (75%)</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">255 (100%)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              3. Shorthand 3-Digit and 8-Digit Alpha Hex Codes
            </h2>
            <p>
              CSS supports two convenient variations of the standard 6-digit code:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>3-Digit Shorthand (#RGB):</strong> When both characters in each pair are identical, you can omit the duplicates. For example, <code>#FFFFFF</code> shortens to <code>#FFF</code>, and <code>#FF0033</code> shortens to <code>#F03</code>.
              </li>
              <li>
                <strong>8-Digit Hex with Alpha (#RRGGBBAA):</strong> The final two digits represent the alpha transparency channel (from 00 = 0% fully transparent to FF = 100% fully opaque). For example, <code>#00000080</code> renders pure black at 50% opacity.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              4. Practical Tips for Web Developers
            </h2>
            <p>
              Always store your primary hex codes as CSS Custom Properties in your stylesheet or design system config:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs">
              :root &#123;<br />
              &nbsp;&nbsp;--brand-primary: #3B82F6;<br />
              &nbsp;&nbsp;--brand-secondary: #10B981;<br />
              &nbsp;&nbsp;--surface-background: #0F172A;<br />
              &#125;
            </div>
          </div>
        );

      case 'hex-vs-rgb':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Summary Comparison</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                HEX and RGB represent the exact same 24-bit sRGB color space. HEX is more compact and easier to copy across design tools (Figma, Sketch, Photoshop), while RGB/RGBA makes mathematical manipulation and opacity changes more intuitive in CSS and JavaScript.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Direct Comparison Matrix
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-100 dark:bg-slate-800 font-bold">
                  <tr>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">Feature</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">HEX (#RRGGBB)</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">RGB (rgb(r, g, b))</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="p-2.5 font-bold">Length / Characters</td>
                    <td className="p-2.5 font-mono">7 chars (#3B82F6)</td>
                    <td className="p-2.5 font-mono">19 chars (rgb(59, 130, 246))</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Human Readability</td>
                    <td className="p-2.5">Moderate (Requires base-16 translation)</td>
                    <td className="p-2.5">High (Direct 0–255 integer scale)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Alpha Transparency</td>
                    <td className="p-2.5 font-mono">#3B82F680 (Hex alpha)</td>
                    <td className="p-2.5 font-mono">rgba(59, 130, 246, 0.5)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Best Use Case</td>
                    <td className="p-2.5">Design token configs, URLs, Tailwind</td>
                    <td className="p-2.5">Dynamic Canvas, WebGL, CSS transitions</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. How to Convert Between HEX and RGB Mathematically
            </h2>
            <p>
              To convert a HEX pair (such as <code>3B</code>) into an integer from 0 to 255, multiply the first digit by 16 and add the second digit:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1">
              <div>{'// For #3B82F6:'}</div>
              <div>Red: 3 * 16 + 11 (B) = 48 + 11 = <strong>59</strong></div>
              <div>Green: 8 * 16 + 2 = 128 + 2 = <strong>130</strong></div>
              <div>Blue: 15 (F) * 16 + 6 = 240 + 6 = <strong>246</strong></div>
              <div className="text-emerald-400">Result: rgb(59, 130, 246)</div>
            </div>
          </div>
        );

      case 'rgb-vs-cmyk':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">The Physics of Light vs Ink</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                <strong>RGB</strong> is an <em>additive</em> color model where combining red, green, and blue light creates pure white. <strong>CMYK</strong> is a <em>subtractive</em> ink model where layering cyan, magenta, yellow, and black inks absorbs light and produces black.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Why Digital Colors Look Dull When Printed
            </h2>
            <p>
              Computer monitors and smartphone screens emit photons directly into your eyes, allowing them to produce ultra-vibrant electric blues, neon greens, and hot magentas. Physical paper, however, cannot emit light—it only reflects ambient room light after ink pigments absorb specific wavelengths.
            </p>
            <p>
              Because the physical CMYK ink color gamut is significantly smaller than the digital sRGB gamut, highly saturated screen colors are automatically clipped or desaturated during print conversion.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. The CMYK Color Channels Explained
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Cyan (C):</strong> Absorbs red light, reflecting green and blue.</li>
              <li><strong>Magenta (M):</strong> Absorbs green light, reflecting red and blue.</li>
              <li><strong>Yellow (Y):</strong> Absorbs blue light, reflecting red and green.</li>
              <li><strong>Key / Black (K):</strong> Added because combining 100% C, M, and Y creates a muddy dark brown instead of true rich black.</li>
            </ul>
          </div>
        );

      case 'what-is-hsl-color':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Why Modern Designers Prefer HSL</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Unlike RGB, which forces you to mentally balance three light channels, HSL isolates pure <strong>Hue</strong> (the color tone on a 360° circle) from <strong>Saturation</strong> (vibrancy) and <strong>Lightness</strong> (brightness).
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. The 3 Dimensions of HSL
            </h2>
            <ul className="list-disc list-inside space-y-3 text-sm">
              <li>
                <strong>Hue (0°–360°):</strong> The circular angle around the chromatic wheel. 0° is Red, 120° is Green, 240° is Blue, and 360° wraps back to Red.
              </li>
              <li>
                <strong>Saturation (0%–100%):</strong> The intensity of the color. 0% is completely grayscale, and 100% is maximum vivid chromatic brilliance.
              </li>
              <li>
                <strong>Lightness (0%–100%):</strong> 0% is pitch black, 50% is the pure base hue, and 100% is pure blinding white.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. Programmatic Dark Mode Theming with HSL
            </h2>
            <p>
              Because Lightness is a single percentage parameter, creating hover states and dark-mode themes in CSS is straightforward:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1">
              <div>{'/* Base Button */'}</div>
              <div>background-color: hsl(217, 91%, 60%);</div>
              <div className="text-slate-400">{'/* Hover: simply reduce lightness by 10% */'}</div>
              <div className="text-emerald-400">background-color: hsl(217, 91%, 50%);</div>
            </div>
          </div>
        );

      case 'what-is-hsv-color':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">HSV vs HSL in Design Tools</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                HSV (Hue, Saturation, Value) is identical to HSB (Hue, Saturation, Brightness). It is the standard color coordinate system behind 2D square color pickers in Figma, Sketch, and Adobe Creative Cloud.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. The Fundamental Difference: Value (HSV) vs Lightness (HSL)
            </h2>
            <p>
              In HSL, 100% Lightness is always pure white, regardless of the Saturation setting. In HSV/HSB, 100% Value represents the brightest possible version of the color at that saturation level (e.g. 100% Value and 100% Saturation gives full pure red #FF0000, not white).
            </p>
          </div>
        );

      case 'how-to-choose-a-website-color-palette':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">The 60-30-10 Golden Rule</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Balance visual density by allocating 60% of UI space to neutral background canvases, 30% to structural containers and text, and 10% to high-contrast focal accent buttons.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              Step 1: Pick a High-Intent Primary Brand Token
            </h2>
            <p>
              Your primary brand color sets the emotional tone. Financial and healthcare apps gravitate towards stable Blues (#0EA5E9, #3B82F6), eco and food brands towards Greens (#10B981), and creative platforms towards Violets (#8B5CF6).
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              Step 2: Calibrate Your Neutral Gray Scale
            </h2>
            <p>
              Never use pure #000000 or sterile #808080. Infuse a tiny tint of your brand hue into your neutral slate scale (such as Tailwind&apos;s slate or zinc palette) to produce unified visual coherence.
            </p>
          </div>
        );

      case 'how-to-create-a-color-palette':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">The 5 Core Roles in Every UI Palette</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                A production-ready UI palette must include 5 functional color categories: Primary Brand, Secondary/Accent, Neutral Canvas Backgrounds, Foreground Typography, and Semantic Feedback (Success, Warning, Error).
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Start with Your Hero Dominant Color
            </h2>
            <p>
              Select your primary hero color based on your brand persona and industry context. This color will be used for primary action buttons, active navigation indicators, and branding accents.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. Apply Geometric Harmonies for Accents
            </h2>
            <p>
              Use mathematical color wheel harmonies to find supporting tones:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Complementary (180° opposite):</strong> Maximizes contrast for high-priority CTA buttons.</li>
              <li><strong>Analogous (±30° adjacent):</strong> Creates cohesive, harmonious gradients and secondary cards.</li>
              <li><strong>Triadic (120° equidistant):</strong> Provides distinct categorical accents for dashboards.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              3. Generate Systematic 10-Step Tonal Ramps
            </h2>
            <p>
              Build 50–900 shades for each color role using our <Link href="/tools/color-shades-generator" className="text-blue-600 dark:text-blue-400 underline font-semibold">Shades Generator</Link> to ensure smooth hover states and dark-mode elevation levels.
            </p>
          </div>
        );

      case 'color-contrast-explained':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Why Contrast Determines Usability</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Contrast is the difference in visual luminance between foreground content (text, icons) and its underlying background surface. High contrast enables rapid cognitive processing and comfortable reading in bright sunlight and low-light environments.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Understanding Relative Luminance (Y)
            </h2>
            <p>
              The human eye does not perceive all light wavelengths with equal sensitivity. Humans are significantly more sensitive to green photons than to blue or red photons. Relative luminance weighs the RGB channels according to standard sRGB human photopic sensitivity:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs">
              Luminance (L) = 0.2126 * R_linear + 0.7152 * G_linear + 0.0722 * B_linear
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. How Contrast Ratios are Computed
            </h2>
            <p>
              The contrast ratio ranges from 1:1 (zero contrast, identical colors) to 21:1 (maximum contrast, pure black on pure white):
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs">
              Ratio = (L1 + 0.05) / (L2 + 0.05) &nbsp;&nbsp;[where L1 is lighter and L2 is darker]
            </div>
          </div>
        );

      case 'wcag-color-contrast-guide':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">WCAG 2.1 Conformance Thresholds</h3>
              <ul className="list-disc list-inside text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <li><strong>Level AA Normal Text:</strong> Minimum contrast ratio of <strong>4.5:1</strong>.</li>
                <li><strong>Level AA Large Text (18pt+ or 14pt bold):</strong> Minimum ratio of <strong>3.0:1</strong>.</li>
                <li><strong>Level AAA Normal Text:</strong> Enhanced ratio of <strong>7.0:1</strong>.</li>
                <li><strong>UI Components & Focus Indicators:</strong> Minimum ratio of <strong>3.0:1</strong>.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. How Relative Luminance is Calculated
            </h2>
            <p>
              WCAG calculates contrast based on the relative luminance (L) of the foreground text and background surface on a normalized scale from 0.0 (pure black) to 1.0 (pure white):
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs">
              Contrast Ratio = (Lighter_Luminance + 0.05) / (Darker_Luminance + 0.05)
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. Testing Accessible Colors
            </h2>
            <p>
              Use our real-time <Link href="/tools/color-contrast-checker" className="text-blue-600 dark:text-blue-400 underline font-semibold">WCAG Contrast Checker</Link> to test any background and foreground pair instantly with automated AA/AAA status badges.
            </p>
          </div>
        );

      case 'how-to-use-hex-colors-in-css':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Modern CSS Color Declarations</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Hexadecimal color notation is universally supported across every web browser since HTML 1.0. Modern CSS expands hex support to include 8-digit alpha transparency and CSS custom property theming.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Standard CSS Properties with Hex Codes
            </h2>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1">
              <div>.card &#123;</div>
              <div>&nbsp;&nbsp;color: #0F172A; /* Text color */</div>
              <div>&nbsp;&nbsp;background-color: #FFFFFF; /* Surface */</div>
              <div>&nbsp;&nbsp;border: 1px solid #E2E8F0; /* Border */</div>
              <div>&nbsp;&nbsp;box-shadow: 0 4px 12px #0F172A1A; /* 10% opacity shadow */</div>
              <div>&#125;</div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. CSS Custom Properties for Dynamic Theming
            </h2>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1">
              <div>:root &#123;</div>
              <div>&nbsp;&nbsp;--primary: #3B82F6;</div>
              <div>&nbsp;&nbsp;--primary-hover: #2563EB;</div>
              <div>&nbsp;&nbsp;--bg: #F8FAFC;</div>
              <div>&#125;</div>
              <div>[data-theme=&apos;dark&apos;] &#123;</div>
              <div>&nbsp;&nbsp;--bg: #0F172A;</div>
              <div>&#125;</div>
            </div>
          </div>
        );

      case 'how-to-convert-hex-to-rgb':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">The Base-16 to Base-10 Formula</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                To convert any two-digit hex channel (e.g. <code>3B</code>) to an integer from 0 to 255: multiply the first character by 16 and add the value of the second character.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Step-by-Step Conversion Example
            </h2>
            <p>
              Let&apos;s convert <strong>#10B981</strong> (Emerald Green) to RGB:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
              <div><strong>Red (10):</strong> 1 * 16 + 0 = <strong>16</strong></div>
              <div><strong>Green (B9):</strong> 11 (B) * 16 + 9 = 176 + 9 = <strong>185</strong></div>
              <div><strong>Blue (81):</strong> 8 * 16 + 1 = 128 + 1 = <strong>129</strong></div>
              <div className="text-emerald-400 font-bold mt-2">Result: rgb(16, 185, 129)</div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. JavaScript Implementation
            </h2>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1">
              <div>function hexToRgb(hex) &#123;</div>
              <div>&nbsp;&nbsp;const clean = hex.replace(&apos;#&apos;, &apos;&apos;);</div>
              <div>&nbsp;&nbsp;const num = parseInt(clean, 16);</div>
              <div>&nbsp;&nbsp;return &#123;</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;r: (num &gt;&gt; 16) &amp; 255,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;g: (num &gt;&gt; 8) &amp; 255,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;b: num &amp; 255</div>
              <div>&nbsp;&nbsp;&#125;;</div>
              <div>&#125;</div>
            </div>
          </div>
        );

      case 'how-to-convert-rgb-to-hex':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">The Division-Remainder Formula</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                To convert any integer from 0 to 255 to two base-16 hex characters: divide the number by 16. The quotient gives the first digit, and the remainder gives the second digit.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Step-by-Step Conversion Example
            </h2>
            <p>
              Let&apos;s convert <strong>rgb(59, 130, 246)</strong> to HEX:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
              <div><strong>Red (59):</strong> 59 / 16 = 3 remainder 11 (B) =&gt; <strong>3B</strong></div>
              <div><strong>Green (130):</strong> 130 / 16 = 8 remainder 2 =&gt; <strong>82</strong></div>
              <div><strong>Blue (246):</strong> 246 / 16 = 15 (F) remainder 6 =&gt; <strong>F6</strong></div>
              <div className="text-blue-400 font-bold mt-2">Result: #3B82F6</div>
            </div>
          </div>
        );

      case 'complementary-colors-explained':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Maximum Chromatic Contrast</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Complementary colors sit directly opposite each other on the 360° color wheel (separated by exactly 180°). When placed side by side, each color makes the other appear more vibrant.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Classic Complementary Pairs in Web Design
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Blue (#3B82F6) & Orange (#F97316):</strong> The most popular tech and SaaS pairing (cold vs warm).</li>
              <li><strong>Teal (#0D9488) & Coral (#FF6F61):</strong> Modern, fresh, and engaging aesthetic for consumer apps.</li>
              <li><strong>Purple (#8B5CF6) & Amber Gold (#F59E0B):</strong> High-end luxury and gamification rewards.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. Best Practice: Don&apos;t Use 50/50 Balance
            </h2>
            <p>
              Never split your UI layout 50% / 50% between complementary colors, as this creates visual vibration and eye strain. Instead, let one color dominate 90% of the canvas, reserving the complementary color for the 10% focal accents.
            </p>
          </div>
        );

      case 'analogous-colors-explained':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Natural Harmonic Transitions</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Analogous color schemes use three or more colors that sit adjacent to each other on the color wheel (typically separated by 30° intervals). Because they share common underlying wavelengths, they create serene, naturally harmonious visual experiences.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Common Analogous Combinations
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Ocean Gradient:</strong> Cyan (#06B6D4) → Sky Blue (#0EA5E9) → Royal Indigo (#4F46E5).</li>
              <li><strong>Sunset Warmth:</strong> Yellow (#EAB308) → Amber (#F59E0B) → Fiery Orange (#EA580C).</li>
              <li><strong>Forest Nature:</strong> Lime (#84CC16) → Emerald (#10B981) → Deep Teal (#0F766E).</li>
            </ul>
          </div>
        );

      case 'triadic-colors-explained':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Equidistant 120° Triangle</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                A triadic color scheme selects three colors that are evenly spaced by 120° around the chromatic circle. Triadic palettes offer high contrast and distinct categorical separation while maintaining optical balance.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Using Triadic Colors for UI Dashboards
            </h2>
            <p>
              Triadic schemes are ideally suited for complex analytics dashboards, charts, and metric categorizations where three distinct data series must be distinguished at a glance without visual confusion.
            </p>
          </div>
        );

      case 'shades-tints-tones-explained':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">The 3 Color Variations</h3>
              <ul className="list-disc list-inside text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <li><strong>Shade:</strong> Pure hue + <strong>Black</strong> (Darkens the color).</li>
                <li><strong>Tint:</strong> Pure hue + <strong>White</strong> (Lightens the color).</li>
                <li><strong>Tone:</strong> Pure hue + <strong>Gray</strong> (Mutes the saturation).</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. How Design Systems Build 50–900 Ramps
            </h2>
            <p>
              In UI frameworks like Tailwind CSS, color ramps use tints for 50–400 (light backgrounds, badges, and active cards), 500–600 for base interactive elements, and shades for 700–900 (deep borders, dark text, and active click states).
            </p>
          </div>
        );

      case 'color-psychology-guide':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Emotional Resonance & Trust</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Color is processed by the human brain in under 90 milliseconds. Strategic color choices dramatically influence user trust, perceived speed, security, and conversion rates.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Psychological Profiles by Color Family
            </h2>
            <ul className="list-disc list-inside space-y-3 text-sm">
              <li><strong>Blue:</strong> Trust, security, intelligence, and calm (PayPal, Stripe, Intel, Twitter/X).</li>
              <li><strong>Green:</strong> Growth, health, wealth, and sustainability (Spotify, Whole Foods, Shopify).</li>
              <li><strong>Red:</strong> Urgency, excitement, passion, and appetite (Netflix, YouTube, Target, Coca-Cola).</li>
              <li><strong>Purple:</strong> Luxury, creativity, mystery, and premium quality (Twitch, Cadbury, Figma).</li>
            </ul>
          </div>
        );

      case 'css-color-guide':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Modern CSS Color Level 4 & 5</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Modern browsers support wide-gamut Display P3 colors, uniform OKLCH perceptual spaces, and native CSS <code>color-mix()</code> without requiring JavaScript.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Native CSS color-mix()
            </h2>
            <p>
              Mix two colors dynamically in pure CSS stylesheets:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs">
              background-color: color-mix(in srgb, #3B82F6 70%, white 30%);
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              2. Perceptual Uniformity with OKLCH
            </h2>
            <p>
              The <code>oklch(L C H)</code> color space ensures that colors with the same lightness value appear equally bright to human perception, eliminating optical luminance inconsistencies found in legacy HSL.
            </p>
          </div>
        );

      case 'tailwind-css-color-guide':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Mastering Tailwind Color Utilities</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Tailwind CSS includes a rich 22-palette default color system with 11 shade stops per family. Learn how to customize theme colors, apply arbitrary hex values, and use alpha opacity modifiers.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              1. Arbitrary Values vs Palette Classes
            </h2>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1">
              <div>{`<!-- Default palette class -->`}</div>
              <div>&lt;button className=&quot;bg-blue-600 hover:bg-blue-700 text-white&quot;&gt;</div>
              <div>{`<!-- Arbitrary custom HEX code -->`}</div>
              <div>&lt;button className=&quot;bg-[#3B82F6] hover:bg-[#2563EB] text-white&quot;&gt;</div>
              <div>{`<!-- Opacity modifier syntax (80% opacity) -->`}</div>
              <div>&lt;div className=&quot;bg-blue-600/80 backdrop-blur-md&quot;&gt;</div>
            </div>
          </div>
        );

      case 'accessible-color-combinations':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200">Verified High-Contrast Color Pairings</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                All 12 color combinations below achieve a contrast ratio above <strong>4.5:1 (WCAG AA)</strong> and most exceed <strong>7.0:1 (WCAG AAA)</strong> for standard body text.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#FFFFFF] text-[#0F172A] space-y-1">
                <div className="text-xs font-bold font-mono">#0F172A on #FFFFFF</div>
                <div className="text-sm font-semibold">Slate Obsidian on Pure White</div>
                <div className="text-[11px] text-emerald-600 font-bold">Contrast: 18.2:1 (AAA Pass)</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#0F172A] text-[#F8FAFC] space-y-1">
                <div className="text-xs font-bold font-mono">#F8FAFC on #0F172A</div>
                <div className="text-sm font-semibold">Ghost White on Dark Slate</div>
                <div className="text-[11px] text-emerald-600 font-bold">Contrast: 17.1:1 (AAA Pass)</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#1E40AF] text-[#FFFFFF] space-y-1">
                <div className="text-xs font-bold font-mono">#FFFFFF on #1E40AF</div>
                <div className="text-sm font-semibold">Pure White on Deep Blue</div>
                <div className="text-[11px] text-emerald-600 font-bold">Contrast: 8.4:1 (AAA Pass)</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#064E3B] text-[#FFFFFF] space-y-1">
                <div className="text-xs font-bold font-mono">#FFFFFF on #064E3B</div>
                <div className="text-sm font-semibold">Pure White on Forest Emerald</div>
                <div className="text-[11px] text-emerald-600 font-bold">Contrast: 9.8:1 (AAA Pass)</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <p>Comprehensive guide content exploring {article.title}.</p>
            <p>Learn more with our interactive <Link href="/tools/converter" className="text-blue-600 underline">Color Converter</Link> and <Link href="/tools/palette-generator" className="text-blue-600 underline">Palette Generator</Link>.</p>
          </div>
        );
    }
  };

  const relatedTools = [
    {
      name: 'Color Converter',
      href: '/tools/converter',
      desc: 'Convert any color between HEX, RGB, HSL, HSV, and CMYK.',
    },
    {
      name: 'Contrast Checker',
      href: '/tools/color-contrast-checker',
      desc: 'Test your text and background for WCAG AA/AAA compliance.',
    },
    {
      name: 'Palette Generator',
      href: '/tools/palette-generator',
      desc: 'Generate aesthetic 5-color harmony palettes.',
    },
    {
      name: 'Shades & Tints Generator',
      href: '/tools/color-shades-generator',
      desc: 'Calculate 10-step monochromatic shade scales.',
    },
  ];

  return (
    <GuideArticleLayout article={article} relatedTools={relatedTools}>
      {renderContent(slug)}
    </GuideArticleLayout>
  );
}
