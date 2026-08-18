export interface GuideArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Color Fundamentals' | 'Web Development' | 'UI/UX Design' | 'Accessibility';
  readTime: string;
  publishedAt: string;
  author: string;
  keywords: string[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'what-is-a-hex-color',
    title: 'What is a HEX Color Code? Complete Hexadecimal Color Guide',
    excerpt:
      'Understand how 6-digit (#RRGGBB), 3-digit (#RGB), and 8-digit (#RRGGBBAA) hexadecimal color codes work, from base-16 mathematics to browser rendering.',
    category: 'Color Fundamentals',
    readTime: '6 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['hex color code', 'hexadecimal color', 'html color code', 'hex to rgb math'],
  },
  {
    slug: 'hex-vs-rgb',
    title: 'HEX vs RGB Color Formats: Differences, Math & When to Use Which',
    excerpt:
      'A deep technical comparison between HEX and RGB/RGBA color models in web development, CSS stylesheets, design systems, and rendering engines.',
    category: 'Web Development',
    readTime: '7 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['hex vs rgb', 'rgba alpha transparency', 'css color format comparison'],
  },
  {
    slug: 'rgb-vs-cmyk',
    title: 'RGB vs CMYK: Additive Screen Light vs Subtractive Print Ink',
    excerpt:
      'Learn why digital colors look different when printed. Explore the physics of additive RGB light versus subtractive CMYK ink and how to avoid gamut clipping.',
    category: 'Color Fundamentals',
    readTime: '8 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['rgb vs cmyk', 'additive color', 'subtractive color', 'print color conversion'],
  },
  {
    slug: 'what-is-hsl-color',
    title: 'What is HSL Color? Hue, Saturation & Lightness Explained',
    excerpt:
      'Master the intuitive cylindrical color model used by modern UI designers and CSS developers for programmatic theme generation and accessible contrast.',
    category: 'Color Fundamentals',
    readTime: '6 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['hsl color format', 'hue saturation lightness', 'hsl vs rgb', 'css hsl'],
  },
  {
    slug: 'what-is-hsv-color',
    title: 'What is HSV / HSB Color? How Figma and Photoshop Pick Colors',
    excerpt:
      'Explore Hue, Saturation, and Value (Brightness). Understand the mathematical differences between HSB and HSL and why graphics software uses HSV.',
    category: 'Color Fundamentals',
    readTime: '5 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['hsv vs hsb', 'hsv color model', 'figma color picker', 'photoshop hsb'],
  },
  {
    slug: 'how-to-choose-a-website-color-palette',
    title: 'How to Choose a Perfect Website Color Palette (60-30-10 Rule)',
    excerpt:
      'Step-by-step framework to pick harmonious website color schemes using the proven 60-30-10 rule, brand psychology, and high-converting CTA accents.',
    category: 'UI/UX Design',
    readTime: '9 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['website color palette', '60 30 10 rule', 'ui color scheme', 'brand colors'],
  },
  {
    slug: 'wcag-color-contrast-guide',
    title: 'WCAG 2.1 Color Contrast Guide: AA & AAA Compliance for Web Designers',
    excerpt:
      'Everything you need to know about Web Content Accessibility Guidelines (WCAG) contrast ratios, relative luminance math, and accessible UI typography.',
    category: 'Accessibility',
    readTime: '8 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['wcag color contrast', 'aa aaa compliance', 'contrast ratio 4.5:1', 'accessible design'],
  },
  {
    slug: 'color-psychology-guide',
    title: 'Color Psychology in Marketing and Web Design: Meaning of Colors',
    excerpt:
      'How color choices influence user perception, trust, emotional response, and conversion rates across different industries and cultural contexts.',
    category: 'UI/UX Design',
    readTime: '7 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['color psychology', 'color meanings', 'marketing colors', 'ui conversion rates'],
  },
  {
    slug: 'best-color-combinations-for-websites',
    title: '15 Best Color Combinations for Modern Websites & SaaS Apps in 2026',
    excerpt:
      'Curated list of high-converting, accessible color combinations tailored for tech startups, eCommerce, finance, healthcare, and creative portfolios.',
    category: 'UI/UX Design',
    readTime: '8 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['best website color combinations', 'saas color palettes', 'modern ui colors'],
  },
  {
    slug: 'css-color-guide',
    title: 'Modern CSS Color Guide: Hex, RGBA, HSL, OKLCH, and color-mix()',
    excerpt:
      'Comprehensive reference for modern CSS color syntax: custom properties, OKLCH wide-gamut colors, native color-mix() blending, and dark mode tokens.',
    category: 'Web Development',
    readTime: '9 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['css colors', 'css custom properties', 'oklch css', 'color-mix function'],
  },
];
