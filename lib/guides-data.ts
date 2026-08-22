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
    slug: 'how-to-create-a-color-palette',
    title: 'How to Create a Harmonious Color Palette from Scratch',
    excerpt:
      'Step-by-step methods for creating cohesive color palettes using color wheels, geometric harmony rules, mood boards, and automated palette generators.',
    category: 'UI/UX Design',
    readTime: '8 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['create color palette', 'color scheme generator', 'color harmony rules'],
  },
  {
    slug: 'color-contrast-explained',
    title: 'Color Contrast Explained: Luminance, Readability & Visual Comfort',
    excerpt:
      'Learn how contrast ratios determine legibility on digital screens, how human vision perceives luminance contrast, and why low contrast causes eye fatigue.',
    category: 'Accessibility',
    readTime: '7 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['color contrast explained', 'visual luminance', 'screen legibility'],
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
    slug: 'how-to-use-hex-colors-in-css',
    title: 'How to Use HEX Colors in CSS: Custom Properties, Alpha & Fallbacks',
    excerpt:
      'Practical guide to applying hexadecimal colors in CSS stylesheets, CSS custom properties (variables), modern 8-digit alpha channels, and dark-mode switching.',
    category: 'Web Development',
    readTime: '6 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['hex in css', 'css color variables', 'hex alpha channel css'],
  },
  {
    slug: 'how-to-convert-hex-to-rgb',
    title: 'How to Convert HEX to RGB: Step-by-Step Mathematical Formula',
    excerpt:
      'Master the step-by-step conversion from hexadecimal base-16 color codes to decimal red, green, and blue (0–255) values with manual calculations and JavaScript code.',
    category: 'Web Development',
    readTime: '6 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['convert hex to rgb', 'hex to rgb formula', 'hex to rgb javascript'],
  },
  {
    slug: 'how-to-convert-rgb-to-hex',
    title: 'How to Convert RGB to HEX: Integer to Base-16 Translation',
    excerpt:
      'Learn how to translate RGB integers (0–255) into standard 6-character hex strings (#RRGGBB) with division-remainder math and code examples.',
    category: 'Web Development',
    readTime: '5 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['convert rgb to hex', 'rgb to hex formula', 'rgb to hex calculation'],
  },
  {
    slug: 'complementary-colors-explained',
    title: 'Complementary Colors Explained: High-Contrast Color Wheel Pairs',
    excerpt:
      'Understand how 180° opposite colors on the color wheel create dynamic visual tension, enhance call-to-action buttons, and balance composition in design.',
    category: 'UI/UX Design',
    readTime: '7 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['complementary colors', 'opposite colors', 'color wheel pairing'],
  },
  {
    slug: 'analogous-colors-explained',
    title: 'Analogous Colors Explained: Smooth & Calming Adjacent Harmonies',
    excerpt:
      'Discover how neighboring 30° hues on the chromatic circle produce natural, serene, and visually cohesive color palettes inspired by nature.',
    category: 'UI/UX Design',
    readTime: '6 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['analogous colors', 'adjacent hues', 'calming color palettes'],
  },
  {
    slug: 'triadic-colors-explained',
    title: 'Triadic Colors Explained: Vibrant 120° Equidistant Schemes',
    excerpt:
      'Master the three-point equidistant harmony technique that balances visual vibrancy, brand personality, and distinct UI state categorization.',
    category: 'UI/UX Design',
    readTime: '6 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['triadic colors', '120 degree harmony', 'triadic palette design'],
  },
  {
    slug: 'shades-tints-tones-explained',
    title: 'Shades, Tints, and Tones: Complete Color Scale Guide for Design Systems',
    excerpt:
      'Learn the exact differences between adding black (Shades), adding white (Tints), and adding gray (Tones) to construct systematic 50–900 UI color ramps.',
    category: 'Color Fundamentals',
    readTime: '7 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['shades tints tones', 'color ramp design', 'tailwind color scales'],
  },
  {
    slug: 'color-psychology-guide',
    title: 'Color Psychology in Marketing and Web Design: Meaning of Colors',
    excerpt:
      'How color choices influence user perception, trust, emotional response, and conversion rates across different industries and cultural contexts.',
    category: 'UI/UX Design',
    readTime: '8 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['color psychology', 'color meanings', 'marketing colors', 'ui conversion rates'],
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
  {
    slug: 'tailwind-css-color-guide',
    title: 'Tailwind CSS Color Guide: Custom Scales, Opacity Modifiers & Dark Mode',
    excerpt:
      'How to configure custom color palettes in Tailwind CSS, use slash opacity modifiers (bg-blue-500/80), configure CSS variables, and optimize dark themes.',
    category: 'Web Development',
    readTime: '8 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['tailwind css colors', 'tailwind opacity modifier', 'tailwind dark mode colors'],
  },
  {
    slug: 'accessible-color-combinations',
    title: 'Accessible Color Combinations: 12 High-Contrast Pairings for Modern UI',
    excerpt:
      'Tested and verified WCAG Level AA and AAA accessible text-and-background combinations with exact contrast ratios and design context recommendations.',
    category: 'Accessibility',
    readTime: '8 min read',
    publishedAt: 'July 2026',
    author: 'Color Pickers Editorial Team',
    keywords: ['accessible color combinations', 'wcag compliant palettes', 'high contrast ui colors'],
  },
];
