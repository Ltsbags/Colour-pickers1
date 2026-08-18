// Comprehensive Color Names Library and Nearest Color Resolver
// Distinguishes official W3C CSS Color Module named colors from descriptive color names.

export interface ColorNameEntry {
  name: string;
  hex: string;
  category?: string;
  isCssStandard?: boolean;
}

export interface ColorResolutionInfo {
  name: string;
  hex: string;
  category: string;
  isExactCss: boolean;
  cssName: string | null;
  closestCssName: string;
  closestCssHex: string;
  isDescriptive: boolean;
}

// Official W3C CSS Level 3 / Level 4 standard named colors
export const CSS_NAMED_COLORS: ColorNameEntry[] = [
  { name: 'AliceBlue', hex: 'F0F8FF', category: 'Blue', isCssStandard: true },
  { name: 'AntiqueWhite', hex: 'FAEBD7', category: 'Neutral', isCssStandard: true },
  { name: 'Aqua', hex: '00FFFF', category: 'Blue', isCssStandard: true },
  { name: 'Aquamarine', hex: '7FFFD4', category: 'Green', isCssStandard: true },
  { name: 'Azure', hex: 'F0FFFF', category: 'Blue', isCssStandard: true },
  { name: 'Beige', hex: 'F5F5DC', category: 'Yellow', isCssStandard: true },
  { name: 'Bisque', hex: 'FFE4C4', category: 'Orange', isCssStandard: true },
  { name: 'Black', hex: '000000', category: 'Neutral', isCssStandard: true },
  { name: 'BlanchedAlmond', hex: 'FFEBCD', category: 'Yellow', isCssStandard: true },
  { name: 'Blue', hex: '0000FF', category: 'Blue', isCssStandard: true },
  { name: 'BlueViolet', hex: '8A2BE2', category: 'Purple', isCssStandard: true },
  { name: 'Brown', hex: 'A52A2A', category: 'Brown', isCssStandard: true },
  { name: 'BurlyWood', hex: 'DEB887', category: 'Brown', isCssStandard: true },
  { name: 'CadetBlue', hex: '5F9EA0', category: 'Blue', isCssStandard: true },
  { name: 'Chartreuse', hex: '7FFF00', category: 'Green', isCssStandard: true },
  { name: 'Chocolate', hex: 'D2691E', category: 'Brown', isCssStandard: true },
  { name: 'Coral', hex: 'FF7F50', category: 'Orange', isCssStandard: true },
  { name: 'CornflowerBlue', hex: '6495ED', category: 'Blue', isCssStandard: true },
  { name: 'Cornsilk', hex: 'FFF8DC', category: 'Yellow', isCssStandard: true },
  { name: 'Crimson', hex: 'DC143C', category: 'Red', isCssStandard: true },
  { name: 'Cyan', hex: '00FFFF', category: 'Blue', isCssStandard: true },
  { name: 'DarkBlue', hex: '00008B', category: 'Blue', isCssStandard: true },
  { name: 'DarkCyan', hex: '008B8B', category: 'Blue', isCssStandard: true },
  { name: 'DarkGoldenrod', hex: 'B8860B', category: 'Yellow', isCssStandard: true },
  { name: 'DarkGray', hex: 'A9A9A9', category: 'Neutral', isCssStandard: true },
  { name: 'DarkGreen', hex: '006400', category: 'Green', isCssStandard: true },
  { name: 'DarkKhaki', hex: 'BDB76B', category: 'Yellow', isCssStandard: true },
  { name: 'DarkMagenta', hex: '8B008B', category: 'Purple', isCssStandard: true },
  { name: 'DarkOliveGreen', hex: '556B2F', category: 'Green', isCssStandard: true },
  { name: 'DarkOrange', hex: 'FF8C00', category: 'Orange', isCssStandard: true },
  { name: 'DarkOrchid', hex: '9932CC', category: 'Purple', isCssStandard: true },
  { name: 'DarkRed', hex: '8B0000', category: 'Red', isCssStandard: true },
  { name: 'DarkSalmon', hex: 'E9967A', category: 'Pink', isCssStandard: true },
  { name: 'DarkSeaGreen', hex: '8FBC8F', category: 'Green', isCssStandard: true },
  { name: 'DarkSlateBlue', hex: '483D8B', category: 'Blue', isCssStandard: true },
  { name: 'DarkSlateGray', hex: '2F4F4F', category: 'Neutral', isCssStandard: true },
  { name: 'DarkTurquoise', hex: '00CED1', category: 'Blue', isCssStandard: true },
  { name: 'DarkViolet', hex: '9400D3', category: 'Purple', isCssStandard: true },
  { name: 'DeepPink', hex: 'FF1493', category: 'Pink', isCssStandard: true },
  { name: 'DeepSkyBlue', hex: '00BFFF', category: 'Blue', isCssStandard: true },
  { name: 'DimGray', hex: '696969', category: 'Neutral', isCssStandard: true },
  { name: 'DodgerBlue', hex: '1E90FF', category: 'Blue', isCssStandard: true },
  { name: 'FireBrick', hex: 'B22222', category: 'Red', isCssStandard: true },
  { name: 'FloralWhite', hex: 'FFFAF0', category: 'Neutral', isCssStandard: true },
  { name: 'ForestGreen', hex: '228B22', category: 'Green', isCssStandard: true },
  { name: 'Fuchsia', hex: 'FF00FF', category: 'Pink', isCssStandard: true },
  { name: 'Gainsboro', hex: 'DCDCDC', category: 'Neutral', isCssStandard: true },
  { name: 'GhostWhite', hex: 'F8F8FF', category: 'Neutral', isCssStandard: true },
  { name: 'Gold', hex: 'FFD700', category: 'Yellow', isCssStandard: true },
  { name: 'Goldenrod', hex: 'DAA520', category: 'Yellow', isCssStandard: true },
  { name: 'Gray', hex: '808080', category: 'Neutral', isCssStandard: true },
  { name: 'Green', hex: '008000', category: 'Green', isCssStandard: true },
  { name: 'GreenYellow', hex: 'ADFF2F', category: 'Green', isCssStandard: true },
  { name: 'Honeydew', hex: 'F0FFF0', category: 'Green', isCssStandard: true },
  { name: 'HotPink', hex: 'FF69B4', category: 'Pink', isCssStandard: true },
  { name: 'IndianRed', hex: 'CD5C5C', category: 'Red', isCssStandard: true },
  { name: 'Indigo', hex: '4B0082', category: 'Purple', isCssStandard: true },
  { name: 'Ivory', hex: 'FFFFF0', category: 'Neutral', isCssStandard: true },
  { name: 'Khaki', hex: 'F0E68C', category: 'Yellow', isCssStandard: true },
  { name: 'Lavender', hex: 'E6E6FA', category: 'Purple', isCssStandard: true },
  { name: 'LavenderBlush', hex: 'FFF0F5', category: 'Pink', isCssStandard: true },
  { name: 'LawnGreen', hex: '7CFC00', category: 'Green', isCssStandard: true },
  { name: 'LemonChiffon', hex: 'FFFACD', category: 'Yellow', isCssStandard: true },
  { name: 'LightBlue', hex: 'ADD8E6', category: 'Blue', isCssStandard: true },
  { name: 'LightCoral', hex: 'F08080', category: 'Red', isCssStandard: true },
  { name: 'LightCyan', hex: 'E0FFFF', category: 'Blue', isCssStandard: true },
  { name: 'LightGoldenrodYellow', hex: 'FAFAD2', category: 'Yellow', isCssStandard: true },
  { name: 'LightGray', hex: 'D3D3D3', category: 'Neutral', isCssStandard: true },
  { name: 'LightGreen', hex: '90EE90', category: 'Green', isCssStandard: true },
  { name: 'LightPink', hex: 'FFB6C1', category: 'Pink', isCssStandard: true },
  { name: 'LightSalmon', hex: 'FFA07A', category: 'Pink', isCssStandard: true },
  { name: 'LightSeaGreen', hex: '20B2AA', category: 'Green', isCssStandard: true },
  { name: 'LightSkyBlue', hex: '87CEFA', category: 'Blue', isCssStandard: true },
  { name: 'LightSlateGray', hex: '778899', category: 'Neutral', isCssStandard: true },
  { name: 'LightSteelBlue', hex: 'B0C4DE', category: 'Blue', isCssStandard: true },
  { name: 'LightYellow', hex: 'FFFFE0', category: 'Yellow', isCssStandard: true },
  { name: 'Lime', hex: '00FF00', category: 'Green', isCssStandard: true },
  { name: 'LimeGreen', hex: '32CD32', category: 'Green', isCssStandard: true },
  { name: 'Linen', hex: 'FAF0E6', category: 'Neutral', isCssStandard: true },
  { name: 'Magenta', hex: 'FF00FF', category: 'Pink', isCssStandard: true },
  { name: 'Maroon', hex: '800000', category: 'Red', isCssStandard: true },
  { name: 'MediumAquamarine', hex: '66CDAA', category: 'Green', isCssStandard: true },
  { name: 'MediumBlue', hex: '0000CD', category: 'Blue', isCssStandard: true },
  { name: 'MediumOrchid', hex: 'BA55D3', category: 'Purple', isCssStandard: true },
  { name: 'MediumPurple', hex: '9370DB', category: 'Purple', isCssStandard: true },
  { name: 'MediumSeaGreen', hex: '3CB371', category: 'Green', isCssStandard: true },
  { name: 'MediumSlateBlue', hex: '7B68EE', category: 'Blue', isCssStandard: true },
  { name: 'MediumSpringGreen', hex: '00FA9A', category: 'Green', isCssStandard: true },
  { name: 'MediumTurquoise', hex: '48D1CC', category: 'Blue', isCssStandard: true },
  { name: 'MediumVioletRed', hex: 'C71585', category: 'Pink', isCssStandard: true },
  { name: 'MidnightBlue', hex: '191970', category: 'Blue', isCssStandard: true },
  { name: 'MintCream', hex: 'F5FFFA', category: 'Green', isCssStandard: true },
  { name: 'MistyRose', hex: 'FFE4E1', category: 'Pink', isCssStandard: true },
  { name: 'Moccasin', hex: 'FFE4B5', category: 'Yellow', isCssStandard: true },
  { name: 'NavajoWhite', hex: 'FFDEAD', category: 'Yellow', isCssStandard: true },
  { name: 'Navy', hex: '000080', category: 'Blue', isCssStandard: true },
  { name: 'OldLace', hex: 'FDF5E6', category: 'Neutral', isCssStandard: true },
  { name: 'Olive', hex: '808000', category: 'Green', isCssStandard: true },
  { name: 'OliveDrab', hex: '6B8E23', category: 'Green', isCssStandard: true },
  { name: 'Orange', hex: 'FFA500', category: 'Orange', isCssStandard: true },
  { name: 'OrangeRed', hex: 'FF4500', category: 'Orange', isCssStandard: true },
  { name: 'Orchid', hex: 'DA70D6', category: 'Purple', isCssStandard: true },
  { name: 'PaleGoldenrod', hex: 'EEE8AA', category: 'Yellow', isCssStandard: true },
  { name: 'PaleGreen', hex: '98FB98', category: 'Green', isCssStandard: true },
  { name: 'PaleTurquoise', hex: 'AFEEEE', category: 'Blue', isCssStandard: true },
  { name: 'PaleVioletRed', hex: 'DB7093', category: 'Pink', isCssStandard: true },
  { name: 'PapayaWhip', hex: 'FFEFD5', category: 'Yellow', isCssStandard: true },
  { name: 'PeachPuff', hex: 'FFDAB9', category: 'Orange', isCssStandard: true },
  { name: 'Peru', hex: 'CD853F', category: 'Brown', isCssStandard: true },
  { name: 'Pink', hex: 'FFC0CB', category: 'Pink', isCssStandard: true },
  { name: 'Plum', hex: 'DDA0DD', category: 'Purple', isCssStandard: true },
  { name: 'PowderBlue', hex: 'B0E0E6', category: 'Blue', isCssStandard: true },
  { name: 'Purple', hex: '800080', category: 'Purple', isCssStandard: true },
  { name: 'RebeccaPurple', hex: '663399', category: 'Purple', isCssStandard: true },
  { name: 'Red', hex: 'FF0000', category: 'Red', isCssStandard: true },
  { name: 'RosyBrown', hex: 'BC8F8F', category: 'Brown', isCssStandard: true },
  { name: 'RoyalBlue', hex: '4169E1', category: 'Blue', isCssStandard: true },
  { name: 'SaddleBrown', hex: '8B4513', category: 'Brown', isCssStandard: true },
  { name: 'Salmon', hex: 'FA8072', category: 'Pink', isCssStandard: true },
  { name: 'SandyBrown', hex: 'F4A460', category: 'Orange', isCssStandard: true },
  { name: 'SeaGreen', hex: '2E8B57', category: 'Green', isCssStandard: true },
  { name: 'SeaShell', hex: 'FFF5EE', category: 'Neutral', isCssStandard: true },
  { name: 'Sienna', hex: 'A0522D', category: 'Brown', isCssStandard: true },
  { name: 'Silver', hex: 'C0C0C0', category: 'Neutral', isCssStandard: true },
  { name: 'SkyBlue', hex: '87CEEB', category: 'Blue', isCssStandard: true },
  { name: 'SlateBlue', hex: '6A5ACD', category: 'Blue', isCssStandard: true },
  { name: 'SlateGray', hex: '708090', category: 'Neutral', isCssStandard: true },
  { name: 'Snow', hex: 'FFFAFA', category: 'Neutral', isCssStandard: true },
  { name: 'SpringGreen', hex: '00FF7F', category: 'Green', isCssStandard: true },
  { name: 'SteelBlue', hex: '4682B4', category: 'Blue', isCssStandard: true },
  { name: 'Tan', hex: 'D2B48C', category: 'Brown', isCssStandard: true },
  { name: 'Teal', hex: '008080', category: 'Green', isCssStandard: true },
  { name: 'Thistle', hex: 'D8BFD8', category: 'Purple', isCssStandard: true },
  { name: 'Tomato', hex: 'FF6347', category: 'Red', isCssStandard: true },
  { name: 'Turquoise', hex: '40E0D0', category: 'Blue', isCssStandard: true },
  { name: 'Violet', hex: 'EE82EE', category: 'Purple', isCssStandard: true },
  { name: 'Wheat', hex: 'F5DEB3', category: 'Yellow', isCssStandard: true },
  { name: 'White', hex: 'FFFFFF', category: 'Neutral', isCssStandard: true },
  { name: 'WhiteSmoke', hex: 'F5F5F5', category: 'Neutral', isCssStandard: true },
  { name: 'Yellow', hex: 'FFFF00', category: 'Yellow', isCssStandard: true },
  { name: 'YellowGreen', hex: '9ACD32', category: 'Green', isCssStandard: true },
];

// Curated Descriptive & UI Naming (non-CSS-standard colors with explicit isCssStandard: false)
export const DESCRIPTIVE_COLORS: ColorNameEntry[] = [
  { name: 'Bright Blue', hex: '3B82F6', category: 'Blue', isCssStandard: false },
  { name: 'Emerald Green', hex: '10B981', category: 'Green', isCssStandard: false },
  { name: 'Amber Glow', hex: 'F59E0B', category: 'Yellow', isCssStandard: false },
  { name: 'Vivid Purple', hex: '8B5CF6', category: 'Purple', isCssStandard: false },
  { name: 'Pink Rose', hex: 'EC4899', category: 'Pink', isCssStandard: false },
  { name: 'Indigo Night', hex: '6366F1', category: 'Purple', isCssStandard: false },
  { name: 'Electric Indigo', hex: '4F46E5', category: 'Purple', isCssStandard: false },
  { name: 'Coral Red', hex: 'EF4444', category: 'Red', isCssStandard: false },
  { name: 'Cyan Wave', hex: '06B6D4', category: 'Blue', isCssStandard: false },
  { name: 'Midnight Obsidian', hex: '0F172A', category: 'Neutral', isCssStandard: false },
  { name: 'Pure Ice', hex: 'F8FAFC', category: 'Neutral', isCssStandard: false },
  { name: 'Persimmon Red', hex: 'FF5733', category: 'Red', isCssStandard: false },
  { name: 'Lime Punch', hex: '84CC16', category: 'Green', isCssStandard: false },
  { name: 'Crimson Rose', hex: 'F43F5E', category: 'Red', isCssStandard: false },
  { name: 'Burnt Amber', hex: 'D97706', category: 'Orange', isCssStandard: false },
  { name: 'Deep Teal', hex: '0D9488', category: 'Green', isCssStandard: false },
  { name: 'Berry Punch', hex: 'E11D48', category: 'Red', isCssStandard: false },
  { name: 'Fuchsia Neon', hex: 'D946EF', category: 'Pink', isCssStandard: false },
  { name: 'Ocean Sapphire', hex: '0284C7', category: 'Blue', isCssStandard: false },
  { name: 'Mustard Gold', hex: 'CA8A04', category: 'Yellow', isCssStandard: false },
  { name: 'Solar Flare', hex: 'EA580C', category: 'Orange', isCssStandard: false },
  { name: 'Deep Amethyst', hex: '7C3AED', category: 'Purple', isCssStandard: false },
  { name: 'Royal Sapphire', hex: '2563EB', category: 'Blue', isCssStandard: false },
  { name: 'Cyber Purple', hex: '9333EA', category: 'Purple', isCssStandard: false },
  { name: 'Jade Mint', hex: '059669', category: 'Green', isCssStandard: false },
  { name: 'Charcoal', hex: '333333', category: 'Neutral', isCssStandard: false },
  { name: 'Amber', hex: 'FFBF00', category: 'Yellow', isCssStandard: false },
  { name: 'Cobalt', hex: '0047AB', category: 'Blue', isCssStandard: false },
  { name: 'Sapphire', hex: '0F52BA', category: 'Blue', isCssStandard: false },
  { name: 'Ruby', hex: 'E0115F', category: 'Red', isCssStandard: false },
  { name: 'Jade', hex: '00A86B', category: 'Green', isCssStandard: false },
  { name: 'Malachite', hex: '0BDA51', category: 'Green', isCssStandard: false },
  { name: 'Cerulean', hex: '007BA7', category: 'Blue', isCssStandard: false },
  { name: 'Electric Blue', hex: '7DF9FF', category: 'Blue', isCssStandard: false },
  { name: 'Ultramarine', hex: '3F00FF', category: 'Blue', isCssStandard: false },
  { name: 'Vermilion', hex: 'E34234', category: 'Red', isCssStandard: false },
  { name: 'Burgundy', hex: '800020', category: 'Red', isCssStandard: false },
  { name: 'Rose', hex: 'FF007F', category: 'Pink', isCssStandard: false },
  { name: 'Mauve', hex: 'E0B0FF', category: 'Purple', isCssStandard: false },
  { name: 'Periwinkle', hex: 'CCCCFF', category: 'Purple', isCssStandard: false },
  { name: 'Bronze', hex: 'CD7F32', category: 'Brown', isCssStandard: false },
  { name: 'Copper', hex: 'B87333', category: 'Brown', isCssStandard: false },
  { name: 'Ochre', hex: 'CC7722', category: 'Yellow', isCssStandard: false },
  { name: 'Rust', hex: 'B7410E', category: 'Orange', isCssStandard: false },
  { name: 'Taupe', hex: '483C32', category: 'Brown', isCssStandard: false },
  { name: 'Champagne', hex: 'F7E7CE', category: 'Yellow', isCssStandard: false },
  { name: 'Cream', hex: 'FFFDD0', category: 'Yellow', isCssStandard: false },
  { name: 'Mustard', hex: 'FFDB58', category: 'Yellow', isCssStandard: false },
  { name: 'Lemon', hex: 'FFF700', category: 'Yellow', isCssStandard: false },
  { name: 'Viridian', hex: '40826D', category: 'Green', isCssStandard: false },
  { name: 'Celadon', hex: 'ACE1AF', category: 'Green', isCssStandard: false },
  { name: 'Seafoam Green', hex: '9FE2BF', category: 'Green', isCssStandard: false },
  { name: 'Prussian Blue', hex: '003153', category: 'Blue', isCssStandard: false },
];

// Unified catalog
export const COLOR_NAMES: ColorNameEntry[] = [
  ...CSS_NAMED_COLORS,
  ...DESCRIPTIVE_COLORS,
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
 * Finds exact matching official CSS named color, or null if not a CSS standard color.
 */
export function getExactCssColor(hex: string): ColorNameEntry | null {
  const clean = hex.replace('#', '').toUpperCase();
  const match = CSS_NAMED_COLORS.find(c => c.hex.toUpperCase() === clean);
  return match || null;
}

/**
 * Finds closest official CSS named color
 */
export function getClosestCssNamedColor(hex: string): ColorNameEntry {
  const clean = hex.replace('#', '').toUpperCase();
  const exact = CSS_NAMED_COLORS.find(c => c.hex.toUpperCase() === clean);
  if (exact) return exact;

  let closest = CSS_NAMED_COLORS[0];
  let minDistance = Infinity;

  for (const entry of CSS_NAMED_COLORS) {
    const dist = getRgbDistance(clean, entry.hex);
    if (dist < minDistance) {
      minDistance = dist;
      closest = entry;
    }
  }

  return closest;
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
 * Comprehensive color resolution info: distinguishes CSS standard names from descriptive names.
 */
export function getColorResolution(hex: string): ColorResolutionInfo {
  const clean = hex.replace('#', '').toUpperCase();
  const exactCss = getExactCssColor(clean);
  const closestCss = getClosestCssNamedColor(clean);
  const generalMatch = getClosestColorName(clean);

  if (exactCss) {
    return {
      name: exactCss.name,
      hex: exactCss.hex,
      category: exactCss.category || 'Color',
      isExactCss: true,
      cssName: exactCss.name,
      closestCssName: exactCss.name,
      closestCssHex: exactCss.hex,
      isDescriptive: false,
    };
  }

  return {
    name: generalMatch.name,
    hex: clean,
    category: generalMatch.category || 'Color',
    isExactCss: false,
    cssName: null,
    closestCssName: closestCss.name,
    closestCssHex: closestCss.hex,
    isDescriptive: true,
  };
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
