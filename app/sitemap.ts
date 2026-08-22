import { MetadataRoute } from 'next';
import { POPULAR_COLORS, TRENDING_COLORS, PASTEL_COLORS } from '@/lib/popular-colors';
import { GUIDES } from '@/lib/guides-data';
import { COLOR_NAMES } from '@/lib/color-names';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://color-pickers.com';

  const staticRoutes = [
    '',
    '/colors',
    '/converters',
    '/palettes',
    '/gradients',
    '/guides',
    '/tools',
    '/tools/converter',
    '/tools/hex-to-rgb',
    '/tools/hex-to-hsl',
    '/tools/hex-to-hsv',
    '/tools/hex-to-cmyk',
    '/tools/gradient-generator',
    '/tools/palette-generator',
    '/tools/color-picker',
    '/tools/image-color-extractor',
    '/tools/image-palette-generator',
    '/tools/screenshot-color-extractor',
    '/tools/image-color-picker',
    '/tools/color-mixer',
    '/tools/color-harmonies',
    '/tools/color-contrast-checker',
    '/tools/color-shades-generator',
    '/tools/color-names',
    '/tools/css-converter',
    '/tools/random-color',
    '/about',
    '/faq',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/guides') || route.startsWith('/tools') ? 0.9 : 0.8,
  }));

  const categoryRoutes = [
    'blue',
    'red',
    'green',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'gray',
    'black',
    'white',
  ].map(cat => ({
    url: `${baseUrl}/colors/${cat}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const guideRoutes = GUIDES.map(guide => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Combine unique uppercase hex colors to match canonical URL format
  const allHexes = Array.from(
    new Set([
      ...POPULAR_COLORS.map(c => c.hex.toUpperCase()),
      ...TRENDING_COLORS.map(c => c.hex.toUpperCase()),
      ...PASTEL_COLORS.map(c => c.hex.toUpperCase()),
      ...COLOR_NAMES.map(c => c.hex.toUpperCase()),
    ])
  );

  const colorRoutes = allHexes.map(hex => ({
    url: `${baseUrl}/hex/${hex}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...guideRoutes, ...colorRoutes];
}
