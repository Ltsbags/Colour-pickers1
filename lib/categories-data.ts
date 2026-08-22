export interface CategoryData {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  psychology: string;
  uiUsage: string;
  accessibilityNotes: string;
  colors: { name: string; hex: string }[];
}

export const CATEGORIES_MAP: Record<string, CategoryData> = {
  blue: {
    slug: 'blue',
    name: 'Blue',
    title: 'Blue Color Shades, Hex Codes & RGB Values',
    tagline: 'Trustworthy, tranquil, and modern UI foundation shades',
    description:
      'Blue is the most universally favored color in digital product design, inspiring feelings of security, stability, intelligence, and clarity. From royal azure and electric sky blue to deep corporate navy, explore complete specifications for the blue color spectrum.',
    psychology:
      'Blue triggers cognitive feelings of reliability, professionalism, calmness, and technological authority. It is widely adopted across software applications, financial websites, and communication platforms.',
    uiUsage:
      'Ideal for primary action buttons, focused input outlines, active navigation links, and primary brand logos. Medium-to-dark blues (#1D4ED8, #1E40AF) provide outstanding WCAG AA contrast on white backgrounds.',
    accessibilityNotes:
      'Pure blue (#0000FF) can cause chromostereopsis when paired with pure red. Opt for desaturated or balanced blues like Bright Blue (#3B82F6) for comfortable screen readability.',
    colors: [
      { name: 'Royal Blue', hex: '4169E1' },
      { name: 'Bright Blue', hex: '3B82F6' },
      { name: 'Sky Blue', hex: '0EA5E9' },
      { name: 'Navy Blue', hex: '000080' },
      { name: 'Cobalt', hex: '0047AB' },
      { name: 'Electric Azure', hex: '007FFF' },
      { name: 'Indigo Deep', hex: '4F46E5' },
      { name: 'Midnight Blue', hex: '191970' },
      { name: 'Dodger Blue', hex: '1E90FF' },
      { name: 'Deep Sky Blue', hex: '00BFFF' },
      { name: 'Steel Blue', hex: '4682B4' },
      { name: 'Cornflower Blue', hex: '6495ED' },
      { name: 'Powder Blue', hex: 'B0E0E6' },
      { name: 'Teal Blue', hex: '367588' },
      { name: 'Prussian Blue', hex: '003153' },
      { name: 'Baby Blue', hex: '89CFF0' },
    ],
  },
  red: {
    slug: 'red',
    name: 'Red',
    title: 'Red Color Shades, Hex Codes & RGB Values',
    tagline: 'Passionate, energetic, and high-visibility alert hues',
    description:
      'Red is the most visually stimulating hue on the visible spectrum, commanding immediate human attention. Explore shades ranging from fiery crimson and scarlet to deep wine, ruby, and persimmon.',
    psychology:
      'Red evokes urgency, excitement, warmth, appetite, and passion. In interface design, it represents critical system alerts, destructive actions, live indicators, and urgent notifications.',
    uiUsage:
      'Use red selectively for destructive button actions (delete, remove, cancel), critical validation error banners, live badges, and attention-grabbing sales highlights.',
    accessibilityNotes:
      'Never rely solely on red to communicate errors, as roughly 8% of men have red-green color vision deficiency (deuteranomaly/protanomaly). Always pair red alerts with descriptive text or warning icons.',
    colors: [
      { name: 'Crimson', hex: 'DC143C' },
      { name: 'Scarlet', hex: 'FF2400' },
      { name: 'Ruby', hex: 'E0115F' },
      { name: 'Fire Engine Red', hex: 'CE2029' },
      { name: 'Coral Red', hex: 'FF4040' },
      { name: 'Rose Red', hex: 'C21E56' },
      { name: 'Persimmon', hex: 'FF5733' },
      { name: 'Cardinal', hex: 'C41E3A' },
      { name: 'Maroon', hex: '800000' },
      { name: 'Burgundy', hex: '800020' },
      { name: 'Indian Red', hex: 'CD5C5C' },
      { name: 'Brick Red', hex: 'CB4154' },
      { name: 'Salmon Red', hex: 'FA8072' },
      { name: 'Tomato', hex: 'FF6347' },
      { name: 'Chili Red', hex: 'E23D28' },
      { name: 'Mahogany', hex: 'C04000' },
    ],
  },
  green: {
    slug: 'green',
    name: 'Green',
    title: 'Green Color Shades, Hex Codes & RGB Values',
    tagline: 'Natural, fresh, and high-conversion eco tones',
    description:
      'Green represents organic vitality, growth, balance, wealth, and positive confirmation. Browse shades including mint, emerald, forest green, jade, olive, and lime.',
    psychology:
      'Green is associated with natural health, harmony, sustainability, prosperity, and affirmative success states in user interactions.',
    uiUsage:
      'Extensively used for success toasts, positive financial trends, checkout conversion buttons, payment confirmations, and eco-friendly brand themes.',
    accessibilityNotes:
      'Bright neon greens often have low contrast against white backgrounds. Use deep emerald (#059669) or forest greens (#166534) for text readability.',
    colors: [
      { name: 'Emerald', hex: '10B981' },
      { name: 'Forest Green', hex: '228B22' },
      { name: 'Mint Green', hex: '98FF98' },
      { name: 'Jade', hex: '00A86B' },
      { name: 'Olive Green', hex: '808000' },
      { name: 'Teal Green', hex: '0D9488' },
      { name: 'Lime Green', hex: '84CC16' },
      { name: 'Seafoam', hex: '2E8B57' },
      { name: 'Hunter Green', hex: '355E3B' },
      { name: 'Pine Green', hex: '01796F' },
      { name: 'Fern', hex: '4F7942' },
      { name: 'Spring Green', hex: '00FF7F' },
      { name: 'Chartreuse', hex: '7FFF00' },
      { name: 'Sage Green', hex: '9DC183' },
      { name: 'Pistachio', hex: '93C572' },
      { name: 'Moss Green', hex: '8A9A5B' },
    ],
  },
  yellow: {
    slug: 'yellow',
    name: 'Yellow',
    title: 'Yellow Color Shades, Hex Codes & RGB Values',
    tagline: 'Optimistic, radiant, and attention-catching warm hues',
    description:
      'Yellow is the brightest hue on the visible spectrum, capturing the eye faster than any other color. Explore goldenrod, amber, canary, lemon, and cream.',
    psychology:
      'Yellow evokes warmth, optimism, clarity, creative energy, and cautionary awareness.',
    uiUsage:
      'Suitable for warning alerts, star ratings, highlighting featured promotions, and warm celebratory accents in design systems.',
    accessibilityNotes:
      'Yellow has very high natural luminance. Always pair yellow backgrounds with dark black/charcoal text (#0F172A) rather than white to meet WCAG AA standards.',
    colors: [
      { name: 'Pure Gold', hex: 'FFD700' },
      { name: 'Bright Yellow', hex: 'EAB308' },
      { name: 'Sunflower', hex: 'FFC512' },
      { name: 'Canary Yellow', hex: 'FFEF00' },
      { name: 'Lemon', hex: 'FFF700' },
      { name: 'Butterscotch', hex: 'E3963E' },
      { name: 'Flax', hex: 'EEDC82' },
      { name: 'Mustard', hex: 'FFDB58' },
      { name: 'Goldenrod', hex: 'DAA520' },
      { name: 'Blonde', hex: 'FAF0BE' },
      { name: 'Dandelion', hex: 'FED85D' },
      { name: 'Khaki Gold', hex: 'F0E68C' },
      { name: 'Cyber Yellow', hex: 'FFD300' },
      { name: 'Cream', hex: 'FFFDD0' },
      { name: 'Corn Yellow', hex: 'FBEC5D' },
      { name: 'Amber Glow', hex: 'FFBF00' },
    ],
  },
  orange: {
    slug: 'orange',
    name: 'Orange',
    title: 'Orange Color Shades, Hex Codes & RGB Values',
    tagline: 'Warm, dynamic, and high-conversion creative tones',
    description:
      'Orange blends the passion of red with the cheerful friendliness of yellow, creating a vibrant, inviting ambiance across digital interfaces.',
    psychology:
      'Orange fosters excitement, adventure, innovation, motivation, and approachability.',
    uiUsage:
      'Highly effective for primary call-to-action buttons, onboarding banners, discount badges, and creative studio portfolios.',
    accessibilityNotes:
      'Ensure deep saturated oranges like #EA580C are paired with high-contrast text to ensure WCAG 2.1 compliance.',
    colors: [
      { name: 'Amber Gold', hex: 'F59E0B' },
      { name: 'Tangerine', hex: 'F97316' },
      { name: 'Safety Orange', hex: 'FF7900' },
      { name: 'Burnt Orange', hex: 'CC5500' },
      { name: 'Peach', hex: 'FFDAB9' },
      { name: 'Apricot', hex: 'FBCEB1' },
      { name: 'Coral Orange', hex: 'FF7F50' },
      { name: 'Pumpkin', hex: 'FF7518' },
      { name: 'Rust', hex: 'B7410E' },
      { name: 'Carrot Orange', hex: 'ED9121' },
      { name: 'Bronze', hex: 'CD7F32' },
      { name: 'Terracotta', hex: 'E2725B' },
      { name: 'Sunset Orange', hex: 'FD5E53' },
      { name: 'Papaya', hex: 'FFEFD5' },
      { name: 'Ochre', hex: 'CC7722' },
      { name: 'Dark Orange', hex: 'FF8C00' },
    ],
  },
  purple: {
    slug: 'purple',
    name: 'Purple',
    title: 'Purple & Violet Color Shades, Hex Codes & RGB Values',
    tagline: 'Creative, luxurious, and modern UI accent shades',
    description:
      'Purple has historically represented royalty, luxury, imagination, and wisdom. In contemporary digital design, it defines sleek AI, web3, and luxury interfaces.',
    psychology:
      'Associated with premium quality, visionary thinking, spirituality, and artistic elegance.',
    uiUsage:
      'Extensively used for AI features, SaaS premium plan badges, gradient meshes, and modern creative branding.',
    accessibilityNotes:
      'Deep violets like #6B21A8 contrast cleanly with white text, while soft lavenders require dark slate typography.',
    colors: [
      { name: 'Purple Accent', hex: '8B5CF6' },
      { name: 'Deep Violet', hex: '7C3AED' },
      { name: 'Rebecca Purple', hex: '663399' },
      { name: 'Fuchsia', hex: 'D946EF' },
      { name: 'Amethyst', hex: '9966CC' },
      { name: 'Lavender', hex: 'E6E6FA' },
      { name: 'Grape', hex: '6F2DA8' },
      { name: 'Plum', hex: 'DDA0DD' },
      { name: 'Indigo Purple', hex: '4B0082' },
      { name: 'Orchid', hex: 'DA70D6' },
      { name: 'Magenta Violet', hex: 'CA1F7B' },
      { name: 'Lilac', hex: 'C8A2C8' },
      { name: 'Mauve', hex: 'E0B0FF' },
      { name: 'Mulberry', hex: 'C54B8C' },
      { name: 'Byzantium', hex: '702963' },
      { name: 'Iris', hex: '5A4FCF' },
    ],
  },
  pink: {
    slug: 'pink',
    name: 'Pink',
    title: 'Pink Color Shades, Hex Codes & RGB Values',
    tagline: 'Vibrant, playful, and contemporary cosmetic accents',
    description:
      'From delicate pastel blush to neon hot pink and punch, pink delivers warmth, vibrancy, and youthfulness in branding and user experiences.',
    psychology:
      'Evokes playfulness, nurturing warmth, affection, modern fashion, and creative self-expression.',
    uiUsage:
      'Great for lifestyle brands, notification counters, heart/favorite icons, and soft pastel card surfaces.',
    accessibilityNotes:
      'Hot pink (#EC4899) and light pinks require careful contrast verification before pairing with white or gray text.',
    colors: [
      { name: 'Hot Pink', hex: 'EC4899' },
      { name: 'Blush Pink', hex: 'DE5D83' },
      { name: 'Rose', hex: 'FF007F' },
      { name: 'Bubblegum', hex: 'FFC1CC' },
      { name: 'Baby Pink', hex: 'F4C2C2' },
      { name: 'Flamingo', hex: 'FC8EAC' },
      { name: 'Carnation Pink', hex: 'FFA6C9' },
      { name: 'Punch Pink', hex: 'F25278' },
      { name: 'Ballet Slipper', hex: 'F79AC0' },
      { name: 'Salmon Pink', hex: 'FF91A4' },
      { name: 'Watermelon', hex: 'FC6C85' },
      { name: 'Coral Pink', hex: 'F88379' },
      { name: 'Pastel Pink', hex: 'FFD1DC' },
      { name: 'Cotton Candy', hex: 'FFBCD9' },
      { name: 'Rouge', hex: 'A94064' },
      { name: 'Deep Pink', hex: 'FF1493' },
    ],
  },
  brown: {
    slug: 'brown',
    name: 'Brown',
    title: 'Brown Color Shades, Hex Codes & RGB Values',
    tagline: 'Earthy, rustic, and organic architectural tones',
    description:
      'Brown radiates warmth, stability, durability, and organic authenticity. Explore coffee, chocolate, tan, beige, chestnut, and mahogany.',
    psychology:
      'Associated with earth, craftsmanship, heritage, reliability, and artisanal comfort.',
    uiUsage:
      'Commonly selected for architectural portfolios, organic agriculture brands, specialty coffee rosters, and artisanal goods.',
    accessibilityNotes:
      'Dark browns (#3E2723, #4E342E) provide excellent 7:1 AAA contrast against light backgrounds.',
    colors: [
      { name: 'Chocolate', hex: '7B3F00' },
      { name: 'Coffee', hex: '6F4E37' },
      { name: 'Chestnut', hex: '954535' },
      { name: 'Saddle Brown', hex: '8B4513' },
      { name: 'Sienna', hex: 'A0522D' },
      { name: 'Tan', hex: 'D2B48C' },
      { name: 'Tawny', hex: 'CD5700' },
      { name: 'Beige Brown', hex: 'F5F5DC' },
      { name: 'Sepia', hex: '704214' },
      { name: 'Umber', hex: '635147' },
      { name: 'Mahogany Brown', hex: '4C2F27' },
      { name: 'Cocoa', hex: '875638' },
      { name: 'Walnut', hex: '773F1A' },
      { name: 'Hazelnut', hex: '8E7057' },
      { name: 'Espresso', hex: '4E312D' },
      { name: 'Caramel', hex: 'AF6E4D' },
    ],
  },
  gray: {
    slug: 'gray',
    name: 'Gray',
    title: 'Gray & Neutral Color Shades, Hex Codes & RGB Values',
    tagline: 'Balanced, sophisticated, and essential UI structural neutrals',
    description:
      'Gray forms the foundational backbone of every modern web application, structuring typographic hierarchies, subtle borders, card surfaces, and dividers.',
    psychology:
      'Represents neutrality, balance, sophistication, and timeless modernism.',
    uiUsage:
      'Essential for body text, muted labels, subtle borders, container surfaces, and inactive states.',
    accessibilityNotes:
      'Never use light gray text (#9CA3AF) for small body copy against white backgrounds—it fails WCAG AA standards. Ensure gray body text is #475569 or darker.',
    colors: [
      { name: 'Slate Gray', hex: '64748B' },
      { name: 'Cool Gray', hex: '94A3B8' },
      { name: 'Charcoal', hex: '334155' },
      { name: 'Silver', hex: 'C0C0C0' },
      { name: 'Ash Gray', hex: 'B2BEB5' },
      { name: 'Pewter', hex: '899499' },
      { name: 'Gainsboro', hex: 'DCDCDC' },
      { name: 'Platinum', hex: 'E5E4E2' },
      { name: 'Gunmetal', hex: '2A3439' },
      { name: 'Battleship Gray', hex: '848482' },
      { name: 'Nickel', hex: '727472' },
      { name: 'Cadet Gray', hex: '91A3B0' },
      { name: 'Smoke Gray', hex: '738276' },
      { name: 'Dim Gray', hex: '696969' },
      { name: 'Steel Gray', hex: '71797E' },
      { name: 'Light Slate', hex: 'CBD5E1' },
    ],
  },
  black: {
    slug: 'black',
    name: 'Black',
    title: 'Black & Dark Obsidian Color Shades, Hex Codes & RGB Values',
    tagline: 'Authoritative, elegant, and deep dark-mode foundations',
    description:
      'Black provides ultimate visual contrast, power, luxury, and clarity. Explore deep dark shades, obsidian, onyx, ebony, and carbon.',
    psychology:
      'Embodies power, prestige, luxury, formality, and cutting-edge digital aesthetics.',
    uiUsage:
      'Dominant in dark-mode user interfaces, high-contrast headings, luxury branding, and sleek hardware websites.',
    accessibilityNotes:
      'Pure #000000 on pure #FFFFFF can cause harsh eye strain due to intense contrast. Many design systems prefer rich off-blacks like #0F172A or #18181B.',
    colors: [
      { name: 'Dark Obsidian', hex: '0F172A' },
      { name: 'Pure Black', hex: '000000' },
      { name: 'Zinc Dark', hex: '18181B' },
      { name: 'Jet Black', hex: '343434' },
      { name: 'Onyx', hex: '353839' },
      { name: 'Ebony', hex: '555D50' },
      { name: 'Pitch Black', hex: '040707' },
      { name: 'Licorice', hex: '1A1110' },
      { name: 'Charcoal Black', hex: '222222' },
      { name: 'Night', hex: '0C090A' },
      { name: 'Raisin Black', hex: '242124' },
      { name: 'Void', hex: '0B0B0E' },
      { name: 'Raven', hex: '05030A' },
      { name: 'Midnight Dark', hex: '000E14' },
      { name: 'Ink Black', hex: '0D1117' },
      { name: 'Space Black', hex: '111418' },
    ],
  },
  white: {
    slug: 'white',
    name: 'White',
    title: 'White & Off-White Color Shades, Hex Codes & RGB Values',
    tagline: 'Clean, luminous, and spacious background canvases',
    description:
      'White provides maximum negative space, luminous breathability, and pure readability across modern software interfaces and editorial layouts.',
    psychology:
      'Symbolizes purity, cleanliness, clarity, simplicity, and modern minimalism.',
    uiUsage:
      'Primary surface for light mode cards, document reading canvas, clean typography containers, and neutral backdrop layers.',
    accessibilityNotes:
      'Warm and cool off-whites (#F8FAFC, #FAFAFA, #F9F6EE) reduce display glare on high-brightness OLED/HDR displays.',
    colors: [
      { name: 'Pure White', hex: 'FFFFFF' },
      { name: 'Ghost White', hex: 'F8FAFC' },
      { name: 'Snow White', hex: 'FFFAFA' },
      { name: 'Floral White', hex: 'FFFAF0' },
      { name: 'Ivory', hex: 'FFFFF0' },
      { name: 'Cream White', hex: 'FFFDD0' },
      { name: 'Alabaster', hex: 'F2F0EB' },
      { name: 'Pearl White', hex: 'EAE6DF' },
      { name: 'Anti-Flash White', hex: 'F2F3F4' },
      { name: 'Sea Shell', hex: 'FFF5EE' },
      { name: 'Linen', hex: 'FAF0E6' },
      { name: 'Chiffon', hex: 'FBFAF2' },
      { name: 'Off-White', hex: 'FAF9F6' },
      { name: 'Baby Powder', hex: 'FEFEFA' },
      { name: 'Rice White', hex: 'EEF0F2' },
      { name: 'Coconut White', hex: 'F8F5EE' },
    ],
  },
};
