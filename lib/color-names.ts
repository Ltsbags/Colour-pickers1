// Comprehensive Color Names Library and Nearest Color Resolver

export interface ColorNameEntry {
  name: string;
  hex: string;
  category?: string;
}

export const COLOR_NAMES: ColorNameEntry[] = [
  { name: 'Black', hex: '000000', category: 'Neutral' },
  { name: 'White', hex: 'FFFFFF', category: 'Neutral' },
  { name: 'Red', hex: 'FF0000', category: 'Red' },
  { name: 'Green', hex: '00FF00', category: 'Green' },
  { name: 'Blue', hex: '0000FF', category: 'Blue' },
  { name: 'Yellow', hex: 'FFFF00', category: 'Yellow' },
  { name: 'Cyan', hex: '00FFFF', category: 'Blue' },
  { name: 'Magenta', hex: 'FF00FF', category: 'Pink' },
  { name: 'Silver', hex: 'C0C0C0', category: 'Neutral' },
  { name: 'Gray', hex: '808080', category: 'Neutral' },
  { name: 'Maroon', hex: '800000', category: 'Red' },
  { name: 'Olive', hex: '808000', category: 'Green' },
  { name: 'Purple', hex: '800080', category: 'Purple' },
  { name: 'Teal', hex: '008080', category: 'Green' },
  { name: 'Navy', hex: '000080', category: 'Blue' },
  { name: 'Coral', hex: 'FF7F50', category: 'Orange' },
  { name: 'Orange', hex: 'FFA500', category: 'Orange' },
  { name: 'Gold', hex: 'FFD700', category: 'Yellow' },
  { name: 'Pink', hex: 'FFC0CB', category: 'Pink' },
  { name: 'Hot Pink', hex: 'FF69B4', category: 'Pink' },
  { name: 'Crimson', hex: 'DC143C', category: 'Red' },
  { name: 'Tomato', hex: 'FF6347', category: 'Red' },
  { name: 'Orange Red', hex: 'FF4500', category: 'Orange' },
  { name: 'Dark Orange', hex: 'FF8C00', category: 'Orange' },
  { name: 'Khaki', hex: 'F0E68C', category: 'Yellow' },
  { name: 'Plum', hex: 'DDA0DD', category: 'Purple' },
  { name: 'Violet', hex: 'EE82EE', category: 'Purple' },
  { name: 'Orchid', hex: 'DA70D6', category: 'Purple' },
  { name: 'Fuchsia', hex: 'FF00FF', category: 'Pink' },
  { name: 'Medium Violet Red', hex: 'C71585', category: 'Pink' },
  { name: 'Indigo', hex: '4B0082', category: 'Purple' },
  { name: 'Dark Slate Blue', hex: '483D8B', category: 'Blue' },
  { name: 'Slate Blue', hex: '6A5ACD', category: 'Blue' },
  { name: 'Lime', hex: '00FF00', category: 'Green' },
  { name: 'Lime Green', hex: '32CD32', category: 'Green' },
  { name: 'Forest Green', hex: '228B22', category: 'Green' },
  { name: 'Sea Green', hex: '2E8B57', category: 'Green' },
  { name: 'Emerald', hex: '50C878', category: 'Green' },
  { name: 'Spring Green', hex: '00FF7F', category: 'Green' },
  { name: 'Mint Green', hex: '98FF98', category: 'Green' },
  { name: 'Medium Sea Green', hex: '3CB371', category: 'Green' },
  { name: 'Turquoise', hex: '40E0D0', category: 'Blue' },
  { name: 'Medium Turquoise', hex: '48D1CC', category: 'Blue' },
  { name: 'Dark Turquoise', hex: '00CED1', category: 'Blue' },
  { name: 'Aqua', hex: '00FFFF', category: 'Blue' },
  { name: 'Cadet Blue', hex: '5F9EA0', category: 'Blue' },
  { name: 'Steel Blue', hex: '4682B4', category: 'Blue' },
  { name: 'Light Steel Blue', hex: 'B0C4DE', category: 'Blue' },
  { name: 'Powder Blue', hex: 'B0E0E6', category: 'Blue' },
  { name: 'Light Blue', hex: 'ADD8E6', category: 'Blue' },
  { name: 'Sky Blue', hex: '87CEEB', category: 'Blue' },
  { name: 'Dodger Blue', hex: '1E90FF', category: 'Blue' },
  { name: 'Royal Blue', hex: '4169E1', category: 'Blue' },
  { name: 'Cornflower Blue', hex: '6495ED', category: 'Blue' },
  { name: 'Deep Sky Blue', hex: '00BFFF', category: 'Blue' },
  { name: 'Midnight Blue', hex: '191970', category: 'Blue' },
  { name: 'Lavender', hex: 'E6E6FA', category: 'Purple' },
  { name: 'Misty Rose', hex: 'FFE4E1', category: 'Pink' },
  { name: 'Moccasin', hex: 'FFE4B5', category: 'Yellow' },
  { name: 'Peach Puff', hex: 'FFDAB9', category: 'Orange' },
  { name: 'Navajo White', hex: 'FFDEAD', category: 'Yellow' },
  { name: 'Blanched Almond', hex: 'FFEBCD', category: 'Yellow' },
  { name: 'Papaya Whip', hex: 'FFEFD5', category: 'Yellow' },
  { name: 'Antique White', hex: 'FAEBD7', category: 'Neutral' },
  { name: 'Linen', hex: 'FAF0E6', category: 'Neutral' },
  { name: 'Old Lace', hex: 'FDF5E6', category: 'Neutral' },
  { name: 'Sea Shell', hex: 'FFF5EE', category: 'Neutral' },
  { name: 'Snow', hex: 'FFFAFA', category: 'Neutral' },
  { name: 'Floral White', hex: 'FFFAF0', category: 'Neutral' },
  { name: 'Ivory', hex: 'FFFFF0', category: 'Neutral' },
  { name: 'Beige', hex: 'F5F5DC', category: 'Yellow' },
  { name: 'Cornsilk', hex: 'FFF8DC', category: 'Yellow' },
  { name: 'Wheat', hex: 'F5DEB3', category: 'Yellow' },
  { name: 'Burly Wood', hex: 'DEB887', category: 'Brown' },
  { name: 'Tan', hex: 'D2B48C', category: 'Brown' },
  { name: 'Rosy Brown', hex: 'BC8F8F', category: 'Brown' },
  { name: 'Sandy Brown', hex: 'F4A460', category: 'Orange' },
  { name: 'Goldenrod', hex: 'DAA520', category: 'Yellow' },
  { name: 'Dark Goldenrod', hex: 'B8860B', category: 'Yellow' },
  { name: 'Peru', hex: 'CD853F', category: 'Brown' },
  { name: 'Chocolate', hex: 'D2691E', category: 'Brown' },
  { name: 'Saddle Brown', hex: '8B4513', category: 'Brown' },
  { name: 'Sienna', hex: 'A0522D', category: 'Brown' },
  { name: 'Brown', hex: 'A52A2A', category: 'Brown' },
  { name: 'Dark Red', hex: '8B0000', category: 'Red' },
  { name: 'Charcoal', hex: '333333', category: 'Neutral' },
  { name: 'Slate Gray', hex: '708090', category: 'Neutral' },
  { name: 'Dark Slate Gray', hex: '2F4F4F', category: 'Neutral' },
  { name: 'Dim Gray', hex: '696969', category: 'Neutral' },
  { name: 'Light Gray', hex: 'D3D3D3', category: 'Neutral' },
  { name: 'Gainsboro', hex: 'DCDCDC', category: 'Neutral' },
  { name: 'White Smoke', hex: 'F5F5F5', category: 'Neutral' },
  { name: 'Azure', hex: 'F0FFFF', category: 'Blue' },
  { name: 'Alice Blue', hex: 'F0F8FF', category: 'Blue' },
  { name: 'Ghost White', hex: 'F8F8FF', category: 'Neutral' },
  { name: 'Honeydew', hex: 'F0FFF0', category: 'Green' },
  { name: 'Mint Cream', hex: 'F5FFFA', category: 'Green' },
  { name: 'Salmon', hex: 'FA8072', category: 'Pink' },
  { name: 'Light Salmon', hex: 'FFA07A', category: 'Pink' },
  { name: 'Dark Salmon', hex: 'E9967A', category: 'Pink' },
  { name: 'Light Coral', hex: 'F08080', category: 'Red' },
  { name: 'Indian Red', hex: 'CD5C5C', category: 'Red' },
  { name: 'Fire Brick', hex: 'B22222', category: 'Red' },
  { name: 'Amethyst', hex: '9966CC', category: 'Purple' },
  { name: 'Amber', hex: 'FFBF00', category: 'Yellow' },
  { name: 'Cobalt', hex: '0047AB', category: 'Blue' },
  { name: 'Sapphire', hex: '0F52BA', category: 'Blue' },
  { name: 'Ruby', hex: 'E0115F', category: 'Red' },
  { name: 'Jade', hex: '00A86B', category: 'Green' },
  { name: 'Malachite', hex: '0BDA51', category: 'Green' },
  { name: 'Cerulean', hex: '007BA7', category: 'Blue' },
  { name: 'Electric Blue', hex: '7DF9FF', category: 'Blue' },
  { name: 'Ultramarine', hex: '3F00FF', category: 'Blue' },
  { name: 'Vermilion', hex: 'E34234', category: 'Red' },
  { name: 'Burgundy', hex: '800020', category: 'Red' },
  { name: 'Rose', hex: 'FF007F', category: 'Pink' },
  { name: 'Mauve', hex: 'E0B0FF', category: 'Purple' },
  { name: 'Lavender Blush', hex: 'FFF0F5', category: 'Pink' },
  { name: 'Periwinkle', hex: 'CCCCFF', category: 'Purple' },
  { name: 'Bronze', hex: 'CD7F32', category: 'Brown' },
  { name: 'Copper', hex: 'B87333', category: 'Brown' },
  { name: 'Ochre', hex: 'CC7722', category: 'Yellow' },
  { name: 'Rust', hex: 'B7410E', category: 'Orange' },
  { name: 'Taupe', hex: '483C32', category: 'Brown' },
  { name: 'Champagne', hex: 'F7E7CE', category: 'Yellow' },
  { name: 'Cream', hex: 'FFFDD0', category: 'Yellow' },
  { name: 'Mustard', hex: 'FFDB58', category: 'Yellow' },
  { name: 'Lemon', hex: 'FFF700', category: 'Yellow' },
  { name: 'Chartreuse', hex: '7FFF00', category: 'Green' },
  { name: 'Olive Drab', hex: '6B8E23', category: 'Green' },
  { name: 'Viridian', hex: '40826D', category: 'Green' },
  { name: 'Celadon', hex: 'ACE1AF', category: 'Green' },
  { name: 'Seafoam Green', hex: '9FE2BF', category: 'Green' },
  { name: 'Prussian Blue', hex: '003153', category: 'Blue' },
  { name: 'Steel', hex: '4682B4', category: 'Blue' },
];

/**
 * Calculates Euclidean RGB distance between two hex codes
 */
function getRgbDistance(hex1: string, hex2: string): number {
  const parseHex = (h: string) => {
    const num = parseInt(h.replace('#', ''), 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };
  const c1 = parseHex(hex1);
  const c2 = parseHex(hex2);

  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2)
  );
}

/**
 * Finds exact or nearest matching named color for any hex code
 */
export function getClosestColorName(hex: string): ColorNameEntry {
  const clean = hex.replace('#', '').toUpperCase();
  const exact = COLOR_NAMES.find(c => c.hex.toUpperCase() === clean);
  if (exact) return exact;

  let closest = COLOR_NAMES[0];
  let minDistance = Infinity;

  for (const entry of COLOR_NAMES) {
    const dist = getRgbDistance(clean, entry.hex);
    if (dist < minDistance) {
      minDistance = dist;
      closest = entry;
    }
  }

  return closest;
}

/**
 * Search colors by query (HEX, Name, or Category)
 */
export function searchColorNames(query: string, limit: number = 10): ColorNameEntry[] {
  const q = query.trim().toLowerCase().replace(/^#/, '');
  if (!q) return COLOR_NAMES.slice(0, limit);

  return COLOR_NAMES.filter(
    c =>
      c.name.toLowerCase().includes(q) ||
      c.hex.toLowerCase().includes(q) ||
      (c.category && c.category.toLowerCase().includes(q))
  ).slice(0, limit);
}
