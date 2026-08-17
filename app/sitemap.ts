import { MetadataRoute } from 'next';
import { POPULAR_COLORS } from '@/lib/popular-colors';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://color-pickers.com';

  const staticRoutes = [
    '',
    '/tools',
    '/tools/converter',
    '/tools/hex-to-rgb',
    '/tools/hex-to-hsl',
    '/tools/hex-to-hsv',
    '/tools/hex-to-cmyk',
    '/tools/gradient-generator',
    '/tools/palette-generator',
    '/tools/color-picker',
    '/tools/random-color',
    '/about',
    '/privacy-policy',
    '/terms',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const colorRoutes = POPULAR_COLORS.map(c => ({
    url: `${baseUrl}/hex/${c.hex}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...colorRoutes];
}
