import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HexColorView } from '@/components/HexColorView';
import {
  normalizeHex,
  isValidHex,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToCmyk,
  isLightColor,
  getContrastRatio,
  getShades,
  getTints,
  getTones,
  getHarmonies,
} from '@/lib/color-utils';
import { getColorResolution, COLOR_NAMES } from '@/lib/color-names';
import { POPULAR_COLORS, TRENDING_COLORS, PASTEL_COLORS } from '@/lib/popular-colors';

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  const allHexes = new Set<string>();
  POPULAR_COLORS.forEach(c => allHexes.add(c.hex.toUpperCase()));
  TRENDING_COLORS.forEach(c => allHexes.add(c.hex.toUpperCase()));
  PASTEL_COLORS.forEach(c => allHexes.add(c.hex.toUpperCase()));
  COLOR_NAMES.slice(0, 50).forEach(c => allHexes.add(c.hex.toUpperCase()));

  return Array.from(allHexes).map(code => ({ code }));
}

function resolveHexParam(rawParam: string): string | null {
  let raw = (rawParam || '').replace(/%23/g, '').replace(/#/g, '');

  const matchedByName = COLOR_NAMES.find(
    c => c.name.toLowerCase() === raw.toLowerCase()
  );
  if (matchedByName) {
    raw = matchedByName.hex;
  }

  if (!isValidHex(raw)) {
    return null;
  }

  return normalizeHex(raw);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const hex = resolveHexParam(code);

  if (!hex) {
    return {
      title: 'Color Not Found | Color Pickers',
      description: 'The requested color code could not be resolved.',
    };
  }

  const resolution = getColorResolution(hex);
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const colorName = resolution.name;

  const title = `#${hex} Color Code (${colorName}) - HEX, RGB, HSL, CMYK & CSS`;
  const description = `Detailed specifications for #${hex} (${colorName}). RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b}), HSL: hsl(${hsl.h}°, ${hsl.s}%, ${hsl.l}%), CMYK, WCAG contrast ratios, CSS codes, and harmonious palettes.`;

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
      type: 'website',
      images: [
        {
          url: 'https://color-pickers.com/og-image.png',
          width: 1200,
          height: 630,
          alt: `#${hex} Color Details`,
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
  const hex = resolveHexParam(code);

  if (!hex) {
    notFound();
  }

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const cmyk = rgbToCmyk(rgb);
  const resolution = getColorResolution(hex);
  const isLight = isLightColor(rgb);

  // WCAG Contrast against White and Black
  const contrastWhite = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
  const contrastBlack = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });

  // Shades, Tints, Tones
  const shades = getShades(hex, 10).map(s => s.hex.replace('#', ''));
  const tints = getTints(hex, 10).map(t => t.hex.replace('#', ''));
  const tones = getTones(hex, 10).map(t => t.hex.replace('#', ''));

  // Calculate Harmonies in hex strings
  const harmoniesRaw = getHarmonies(hex);
  const comp = harmoniesRaw.complementary.colors[1]?.hex.replace('#', '') || hex;
  const analogous: [string, string] = [
    harmoniesRaw.analogous.colors[0]?.hex.replace('#', '') || hex,
    harmoniesRaw.analogous.colors[2]?.hex.replace('#', '') || hex,
  ];
  const triadic: [string, string] = [
    harmoniesRaw.triadic.colors[1]?.hex.replace('#', '') || hex,
    harmoniesRaw.triadic.colors[2]?.hex.replace('#', '') || hex,
  ];
  const splitComp: [string, string] = [
    harmoniesRaw.splitComplementary.colors[1]?.hex.replace('#', '') || hex,
    harmoniesRaw.splitComplementary.colors[2]?.hex.replace('#', '') || hex,
  ];
  const tetradic: [string, string, string] = [
    harmoniesRaw.tetradic.colors[1]?.hex.replace('#', '') || hex,
    harmoniesRaw.tetradic.colors[2]?.hex.replace('#', '') || hex,
    harmoniesRaw.tetradic.colors[3]?.hex.replace('#', '') || hex,
  ];
  const monochromatic = harmoniesRaw.monochromatic.colors.map(c => c.hex.replace('#', ''));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `#${hex} Color Code - ${resolution.name}`,
    description: `Complete color information for #${hex}, including RGB, HSL, CMYK values, color harmonies, shades, tints, and CSS codes.`,
    url: `https://color-pickers.com/hex/${hex}`,
    mainEntity: {
      '@type': 'Thing',
      name: `#${hex} ${resolution.name}`,
      alternateName: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://color-pickers.com',
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
          name: `#${hex}`,
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
        colorName={resolution.name}
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
        harmonies={{
          complementary: comp,
          analogous,
          triadic,
          splitComplementary: splitComp,
          tetradic,
          monochromatic,
        }}
      />
    </>
  );
}
