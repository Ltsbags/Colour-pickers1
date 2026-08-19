import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ImageColorExtractorTool } from '@/components/ImageColorExtractorTool';
import {
  Upload,
  Layers,
  ShieldCheck,
  Sparkles,
  Pipette,
  Sliders,
  Eye,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Download,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Image Color Extractor - Extract HEX, RGB, HSL & CMYK',
  description:
    'Extract colors from any image instantly. Get dominant HEX, RGB, HSL and CMYK colors with our free browser-based image color extractor.',
  alternates: {
    canonical: 'https://color-pickers.com/tools/image-color-extractor',
  },
  openGraph: {
    title: 'Image Color Extractor - Extract HEX, RGB, HSL & CMYK | Color Pickers',
    description:
      'Extract colors from any image instantly. Get dominant HEX, RGB, HSL and CMYK colors with our free browser-based image color extractor.',
    url: 'https://color-pickers.com/tools/image-color-extractor',
    type: 'website',
    images: [
      {
        url: 'https://color-pickers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Color Extractor Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Color Extractor - Extract HEX, RGB, HSL & CMYK',
    description:
      'Extract colors from any image instantly. Get dominant HEX, RGB, HSL and CMYK colors with our free browser-based image color extractor.',
  },
};

export default function ImageColorExtractorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Color Extractor',
    url: 'https://color-pickers.com/tools/image-color-extractor',
    description:
      'Extract dominant color palettes, HEX, RGB, HSL, and CMYK values from any image locally in your browser.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All modern browsers',
    browserRequirements: 'Requires JavaScript. Supports Chrome, Safari, Firefox, Edge.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const relatedTools = [
    {
      title: 'HEX Color Picker',
      href: '/tools/color-picker',
      desc: 'Visual screen eyedropper & interactive color wheel',
    },
    {
      title: 'Universal Color Converter',
      href: '/tools/converter',
      desc: 'Matrix converter for HEX, RGB, HSL, HSV, CMYK',
    },
    {
      title: 'Color Palette Generator',
      href: '/tools/palette-generator',
      desc: 'Generate balanced 5-color aesthetic schemes',
    },
    {
      title: 'Color Contrast Checker (WCAG)',
      href: '/tools/color-contrast-checker',
      desc: 'Verify WCAG 2.1 AA & AAA accessibility ratios',
    },
    {
      title: 'Color Mixer & Blender',
      href: '/tools/color-mixer',
      desc: 'Blend two colors across step ratios',
    },
    {
      title: 'Gradient Generator',
      href: '/tools/gradient-generator',
      desc: 'Craft linear and radial CSS gradients',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Image Color Extractor' },
          ]}
        />

        {/* Hero Headline */}
        <div className="my-6 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Client-Side Image Analysis</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Image Color Extractor
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Upload an image and automatically extract the most prominent colors with HEX, RGB, HSL, and CMYK values.
          </p>
        </div>

        {/* Core Interactive Tool Component */}
        <div className="my-8">
          <ImageColorExtractorTool />
        </div>

        {/* AdSense Placement (Single Unit between Tool and Educational Content) */}
        <AdSlot type="in-content" />

        {/* ====================================================================
           EDUCATIONAL SEO CONTENT & GUIDE
           ==================================================================== */}
        <article className="my-16 space-y-12 max-w-4xl mx-auto">
          {/* Section 1: Overview */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Image Color Extractor
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              The <strong>Image Color Extractor</strong> is a fast, accurate client-side digital tool that analyzes photos, brand graphics, illustrations, and design mockups to automatically detect the primary color palette. Whether you need to reverse-engineer a photograph’s mood, build a brand style guide from a company logo, or create matching CSS variables for a website background, this tool breaks down any visual asset into distinct, actionable color specifications with calculations running locally in your browser.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Unlike generic color pickers where you have to manually click individual coordinates, the extractor computes global color prominence using median-cut spatial clustering. It groups millions of individual pixels into mathematically balanced color swatches, providing you with verified <Link href="/tools/converter" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">HEX, RGB, HSL, and CMYK codes</Link> alongside named shade classifications.
            </p>
          </section>

          {/* Section 2: Step-by-Step Guide */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                How to Extract Colors From an Image
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Upload an Image</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Drag and drop your file into the drop zone, click to browse from your device, or simply paste an image directly from your clipboard using <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-700 border rounded font-mono">Ctrl+V</kbd> or <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-700 border rounded font-mono">⌘V</kbd>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Let the Tool Analyze the Image</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  The in-browser engine renders the graphic onto an HTML5 canvas and runs Median Cut quantization to isolate the most representative, harmonious dominant hues within milliseconds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Review the Extracted Palette</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Inspect the horizontal palette strip or adjust the target color count between 5, 8, 10, 12, or 16 colors depending on the depth of the image composition.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">4</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Copy or Download Colors</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Click any individual code to copy it to your clipboard, or export the entire scheme as an HD PNG swatch card, structured JSON, CSS custom properties, or plain text.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Supported Formats */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              What Color Formats Are Supported?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Every extracted swatch is mathematically computed across all primary digital and print standards:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-sm text-blue-600 dark:text-blue-400">HEX (#RRGGBB)</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Six-digit hexadecimal notation standard for HTML, CSS, SVG, and modern UI design software like Figma and Sketch.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400">RGB (Red, Green, Blue)</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Additive color model coordinates ranging from 0 to 255 per channel, used in web rendering, canvas rendering, and digital displays.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-sm text-purple-600 dark:text-purple-400">HSL (Hue, Saturation, Lightness)</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Cylindrical representation mapping Hue (0–360°), Saturation (0–100%), and Lightness (0–100%), ideal for programmatic UI theme generators.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-sm text-pink-600 dark:text-pink-400">CMYK (Cyan, Magenta, Yellow, Key/Black)</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Subtractive four-color process ink percentages essential for commercial printing, packaging, brochures, and physical print production.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: How Extraction Works */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How Does Image Color Extraction Work?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              When an image is loaded, our algorithm creates an offscreen HTML5 canvas buffer and reads raw pixel data from the canvas context. Transparent and near-transparent pixels (such as alpha layers in PNGs or WebP assets) are safely discarded so they don’t distort the palette.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Next, the algorithm utilizes a <strong>Modified Median Cut Quantization</strong> technique. It constructs a 3D bounding box around all sampled RGB points and recursively splits the box along the color channel exhibiting the widest dynamic range. This process isolates distinct color clusters across highlights, midtones, and shadows. Finally, a Euclidean distance filter merges nearly identical shades to ensure maximum visual diversity in the resulting palette.
            </p>
          </section>

          {/* Section 5: Privacy First Guarantee */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Are My Images Uploaded?
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>No.</strong> Your privacy and data security are 100% protected. All image decoding, canvas rendering, pixel sampling, and color quantization occur strictly inside your device’s web browser via standard client-side JavaScript APIs (<code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono">URL.createObjectURL</code> and <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono">CanvasRenderingContext2D</code>).
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Your images are never sent over the internet, never transmitted to external cloud servers, and never stored on any database. When you close the browser tab or click &ldquo;Remove Image&rdquo;, the object reference is immediately released from memory.
            </p>
          </section>

          {/* Section 6: Frequently Asked Questions */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <details className="group border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>What image formats can I upload?</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  You can upload JPG, JPEG, PNG (including transparent PNGs), WebP, GIF, and AVIF files up to 10 MB in file size.
                </p>
              </details>

              <details className="group border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>How is Image Color Extractor different from Image Color Picker?</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The <Link href="/tools/image-color-picker" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Image Color Picker</Link> is an interactive eyedropper tool where you click specific pixels to inspect coordinates. The <strong>Image Color Extractor</strong> automatically scans the entire image to algorithmically generate the overall dominant color palette without requiring manual clicking.
                </p>
              </details>

              <details className="group border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>Can I export the extracted palette directly into my code?</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes. You can export the palette as CSS variables (<code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono">:root &#123; --color-1: #...; &#125;</code>), structured JSON objects for React/Next.js themes, a high-resolution PNG image, or clean plain text.
                </p>
              </details>

              <details className="group border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>Are the color calculations accurate for physical printing?</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes, our conversion engine uses standard mathematical transformation matrices to compute CMYK ink values. For high-end commercial offset printing, we recommend comparing with physical Pantone swatches.
                </p>
              </details>
            </div>
          </section>

          {/* Section 7: Related Tools Internal Linking */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Explore More Professional Color Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Try Tool</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
