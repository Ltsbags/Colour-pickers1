import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HexColorView } from '@/components/HexColorView';
import {
  normalizeHex,
  isValidHex,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  rgbToCmyk,
  isLightColor,
  getContrastRatio,
  getShades,
  getTints,
  getTones,
} from '@/lib/color-utils';
import { getClosestColorName, COLOR_NAMES } from '@/lib/color-names';

interface PageProps {
  params: Promise<{ code: string }>;
}

function resolveHex(rawCode: string): string | null {
  const clean = (rawCode || '').replace(/%23/g, '').replace(/#/g, '').trim();

  // Check if matched by color name (e.g. /hex/coral or /hex/royalblue)
  const matchedByName = COLOR_NAMES.find(
    c => c.name.toLowerCase().replace(/\s+/g, '') === clean.toLowerCase()
  );
  if (matchedByName) {
    return normalizeHex(matchedByName.hex);
  }

  if (isValidHex(clean)) {
    return normalizeHex(clean);
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const hex = resolveHex(code);

  if (!hex) {
    return {
      title: 'Color Not Found | Color Pickers',
      description: 'The requested color code could not be found.',
    };
  }

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const colorName = getClosestColorName(hex).name;

  const title = `#${hex} (${colorName}) - HEX, RGB, HSL, CMYK & Harmonies | Color Pickers`;
  const description = `Complete color specifications for #${hex} (${colorName}): RGB (${rgb.r}, ${rgb.g}, ${rgb.b}), HSL (${hsl.h}°, ${hsl.s}%, ${hsl.l}%), CMYK, WCAG contrast ratings, shades, tints, and CSS codes.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://color-pickers.com/hex/${hex}`,
    },
    openGraph: {
      title,
      description,
      url: `https://color-pickers.com/hex/${hex}`,
      type: 'article',
      images: [
        {
          url: `https://color-pickers.com/api/og?hex=${hex}`,
          width: 1200,
          height: 630,
          alt: `#${hex} ${colorName} Color Palette`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function HexColorPage({ params }: PageProps) {
  const { code } = await params;
  const hex = resolveHex(code);

  if (!hex) {
    notFound();
  }

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const cmyk = rgbToCmyk(rgb);
  const colorName = getClosestColorName(hex).name;
  const isLight = isLightColor(rgb);

  // WCAG Contrast against White and Black
  const contrastWhite = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
  const contrastBlack = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });

  // Shades, Tints, Tones, Harmonies
  const shades = getShades(hex, 8).map(s => s.hex.replace('#', ''));
  const tints = getTints(hex, 8).map(s => s.hex.replace('#', ''));
  const tones = getTones(hex, 8).map(s => s.hex.replace('#', ''));

  const rotateHue = (deg: number) => (hsl.h + deg + 360) % 360;
  const harmonies = {
    complementary: rgbToHex(hslToRgb({ ...hsl, h: rotateHue(180) })),
    analogous: [
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(-30) })),
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(30) })),
    ] as [string, string],
    triadic: [
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(120) })),
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(240) })),
    ] as [string, string],
    splitComplementary: [
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(150) })),
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(210) })),
    ] as [string, string],
    tetradic: [
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(90) })),
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(180) })),
      rgbToHex(hslToRgb({ ...hsl, h: rotateHue(270) })),
    ] as [string, string, string],
    monochromatic: [
      rgbToHex(hslToRgb({ ...hsl, l: Math.max(10, hsl.l - 30) })),
      rgbToHex(hslToRgb({ ...hsl, l: Math.max(10, hsl.l - 15) })),
      rgbToHex(hslToRgb({ ...hsl, l: Math.min(90, hsl.l + 15) })),
      rgbToHex(hslToRgb({ ...hsl, l: Math.min(90, hsl.l + 30) })),
    ],
  };

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `#${hex} Color Code - ${colorName}`,
    description: `Complete color information for #${hex}, including RGB, HSL, CMYK values, color harmonies, shades, tints, and CSS codes.`,
    url: `https://color-pickers.com/hex/${hex}`,
    mainEntity: {
      '@type': 'DefinedTerm',
      name: `#${hex}`,
      termCode: hex,
      description: `${colorName} (#${hex}) in RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}; HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%`,
      inDefinedTermSet: 'https://color-pickers.com/colors',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://color-pickers.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Colors',
          item: 'https://color-pickers.com/colors',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `#${hex} (${colorName})`,
          item: `https://color-pickers.com/hex/${hex}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HexColorView
        hex={hex}
        colorName={colorName}
        rgb={rgb}
        hsl={hsl}
        hsv={hsv}
        cmyk={cmyk}
        isLight={isLight}
        contrastWhite={contrastWhite}
        contrastBlack={contrastBlack}
        shades={shades}
        tints={tints}
        tones={tones}
        harmonies={harmonies}
      />
    </>
  );
}
