// Color Utility Engine for Color Pickers
// Performs client-side conversions between HEX, RGB, HSL, HSV, and CMYK
// Calculates WCAG Contrast Ratios, Color Harmonies, Shades, Tints, and Tones

export interface RGB {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
}

export interface HSL {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
}

export interface HSV {
  h: number; // 0 - 360
  s: number; // 0 - 100
  v: number; // 0 - 100
}

export interface CMYK {
  c: number; // 0 - 100
  m: number; // 0 - 100
  y: number; // 0 - 100
  k: number; // 0 - 100
}

export interface OKLab {
  l: number; // 0 - 1
  a: number; // -0.4 - +0.4
  b: number; // -0.4 - +0.4
}

export interface OKLCH {
  l: number; // 0 - 1 (or 0% - 100%)
  c: number; // 0 - 0.4
  h: number; // 0 - 360
}

export interface ColorData {
  hex: string; // e.g. "#FF5733"
  cleanHex: string; // "FF5733"
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  cmyk: CMYK;
  oklab: OKLab;
  oklch: OKLCH;
  name: string;
  isLight: boolean;
}

/**
  Normalizes hex input string (handles short hex like #f57 or f57, trims whitespace, handles leading #)
 */
export function normalizeHex(input: string): string {
  let clean = input.trim().replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean.split('').map(char => char + char).join('');
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) {
    return '3B82F6'; // Default fallback blue
  }
  return clean.toUpperCase();
}

/**
 * Validates if string is a valid 3 or 6 digit HEX
 */
export function isValidHex(hex: string): boolean {
  const clean = hex.trim().replace(/^#/, '');
  return /^[0-9A-Fa-f]{3}$/.test(clean) || /^[0-9A-Fa-f]{6}$/.test(clean);
}

/**
 * HEX to RGB
 */
export function hexToRgb(hexInput: string): RGB {
  const hex = normalizeHex(hexInput);
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * RGB to HEX (accepts either RGB object or r, g, b numbers)
 */
export function rgbToHex(inputOrR: RGB | number, g?: number, b?: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0').toUpperCase();

  if (typeof inputOrR === 'object' && inputOrR !== null) {
    return `${toHex(inputOrR.r)}${toHex(inputOrR.g)}${toHex(inputOrR.b)}`;
  }
  return `${toHex(inputOrR)}${toHex(g ?? 0)}${toHex(b ?? 0)}`;
}

/**
 * RGB to HSL
 */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * HSL to RGB
 */
export function hslToRgb({ h, s, l }: HSL): RGB {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tAdj = t;
    if (tAdj < 0) tAdj += 1;
    if (tAdj > 1) tAdj -= 1;
    if (tAdj < 1 / 6) return p + (q - p) * 6 * tAdj;
    if (tAdj < 1 / 2) return q;
    if (tAdj < 2 / 3) return p + (q - p) * (2 / 3 - tAdj) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const r = hue2rgb(p, q, hNorm + 1 / 3);
  const g = hue2rgb(p, q, hNorm);
  const b = hue2rgb(p, q, hNorm - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * RGB to HSV
 */
export function rgbToHsv({ r, g, b }: RGB): HSV {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  const v = max;
  const s = max === 0 ? 0 : delta / max;

  if (delta !== 0) {
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

/**
 * HSV to RGB
 */
export function hsvToRgb({ h, s, v }: HSV): RGB {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const vNorm = v / 100;

  const i = Math.floor(hNorm * 6);
  const f = hNorm * 6 - i;
  const p = vNorm * (1 - sNorm);
  const q = vNorm * (1 - f * sNorm);
  const t = vNorm * (1 - (1 - f) * sNorm);

  let r = 0, g = 0, b = 0;

  switch (i % 6) {
    case 0: r = vNorm; g = t; b = p; break;
    case 1: r = q; g = vNorm; b = p; break;
    case 2: r = p; g = vNorm; b = t; break;
    case 3: r = p; g = q; b = vNorm; break;
    case 4: r = t; g = p; b = vNorm; break;
    case 5: r = vNorm; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * RGB to CMYK
 */
export function rgbToCmyk({ r, g, b }: RGB): CMYK {
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  const c = (1 - rNorm - k) / (1 - k);
  const m = (1 - gNorm - k) / (1 - k);
  const y = (1 - bNorm - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

/**
 * CMYK to RGB
 */
export function cmykToRgb({ c, m, y, k }: CMYK): RGB {
  const cNorm = c / 100;
  const mNorm = m / 100;
  const yNorm = y / 100;
  const kNorm = k / 100;

  const r = 255 * (1 - cNorm) * (1 - kNorm);
  const g = 255 * (1 - mNorm) * (1 - kNorm);
  const b = 255 * (1 - yNorm) * (1 - kNorm);

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
}

/**
 * Calculate Relative Luminance for WCAG Contrast
 */
export function getLuminance({ r, g, b }: RGB): number {
  const a = [r, g, b].map(v => {
    const norm = v / 255;
    return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Contrast Ratio between two RGB colors (returns e.g. 4.5 for 4.5:1)
 */
export function getContrastRatio(rgb1: RGB, rgb2: RGB): number {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Determine if color is light (useful for text contrast over background)
 */
export function isLightColor(rgb: RGB): boolean {
  // Using perceived brightness formula
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128;
}

/**
 * Generate Shades (mixing with black)
 */
export function getShades(hex: string, steps: number = 10): Array<{ percent: number; hex: string; rgb: RGB }> {
  const rgb = hexToRgb(hex);
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const factor = 1 - i / steps;
    const shadedRgb: RGB = {
      r: Math.round(rgb.r * factor),
      g: Math.round(rgb.g * factor),
      b: Math.round(rgb.b * factor),
    };
    result.push({
      percent: Math.round((i / steps) * 100),
      hex: `#${rgbToHex(shadedRgb)}`,
      rgb: shadedRgb,
    });
  }
  return result;
}

/**
 * Generate Tints (mixing with white)
 */
export function getTints(hex: string, steps: number = 10): Array<{ percent: number; hex: string; rgb: RGB }> {
  const rgb = hexToRgb(hex);
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const factor = i / steps;
    const tintedRgb: RGB = {
      r: Math.round(rgb.r + (255 - rgb.r) * factor),
      g: Math.round(rgb.g + (255 - rgb.g) * factor),
      b: Math.round(rgb.b + (255 - rgb.b) * factor),
    };
    result.push({
      percent: Math.round((i / steps) * 100),
      hex: `#${rgbToHex(tintedRgb)}`,
      rgb: tintedRgb,
    });
  }
  return result;
}

/**
 * Generate Tones (mixing with gray 128)
 */
export function getTones(hex: string, steps: number = 10): Array<{ percent: number; hex: string; rgb: RGB }> {
  const rgb = hexToRgb(hex);
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const factor = i / steps;
    const tonedRgb: RGB = {
      r: Math.round(rgb.r + (128 - rgb.r) * factor),
      g: Math.round(rgb.g + (128 - rgb.g) * factor),
      b: Math.round(rgb.b + (128 - rgb.b) * factor),
    };
    result.push({
      percent: Math.round((i / steps) * 100),
      hex: `#${rgbToHex(tonedRgb)}`,
      rgb: tonedRgb,
    });
  }
  return result;
}

/**
 * Generate Color Harmonies
 */
export function getHarmonies(hex: string) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);

  const rotateHue = (degrees: number) => (hsl.h + degrees + 360) % 360;

  // Complementary (180 deg)
  const compHsl = { ...hsl, h: rotateHue(180) };
  const compRgb = hslToRgb(compHsl);

  // Analogous (+30, -30 deg)
  const ana1Hsl = { ...hsl, h: rotateHue(-30) };
  const ana2Hsl = { ...hsl, h: rotateHue(30) };

  // Triadic (+120, -120 deg)
  const tri1Hsl = { ...hsl, h: rotateHue(120) };
  const tri2Hsl = { ...hsl, h: rotateHue(240) };

  // Split Complementary (+150, -150 deg)
  const split1Hsl = { ...hsl, h: rotateHue(150) };
  const split2Hsl = { ...hsl, h: rotateHue(210) };

  // Monochromatic
  const mono1Hsl = { ...hsl, l: Math.max(10, hsl.l - 25) };
  const mono2Hsl = { ...hsl, l: Math.min(90, hsl.l + 25) };

  return {
    complementary: {
      name: 'Complementary',
      colors: [
        { hex: `#${normalizeHex(hex)}`, label: 'Base' },
        { hex: `#${rgbToHex(compRgb)}`, label: 'Complement' },
      ],
    },
    analogous: {
      name: 'Analogous',
      colors: [
        { hex: `#${rgbToHex(hslToRgb(ana1Hsl))}`, label: '-30°' },
        { hex: `#${normalizeHex(hex)}`, label: 'Base' },
        { hex: `#${rgbToHex(hslToRgb(ana2Hsl))}`, label: '+30°' },
      ],
    },
    triadic: {
      name: 'Triadic',
      colors: [
        { hex: `#${normalizeHex(hex)}`, label: 'Base' },
        { hex: `#${rgbToHex(hslToRgb(tri1Hsl))}`, label: '+120°' },
        { hex: `#${rgbToHex(hslToRgb(tri2Hsl))}`, label: '+240°' },
      ],
    },
    splitComplementary: {
      name: 'Split Complementary',
      colors: [
        { hex: `#${normalizeHex(hex)}`, label: 'Base' },
        { hex: `#${rgbToHex(hslToRgb(split1Hsl))}`, label: '+150°' },
        { hex: `#${rgbToHex(hslToRgb(split2Hsl))}`, label: '+210°' },
      ],
    },
    monochromatic: {
      name: 'Monochromatic',
      colors: [
        { hex: `#${rgbToHex(hslToRgb(mono1Hsl))}`, label: 'Darker' },
        { hex: `#${normalizeHex(hex)}`, label: 'Base' },
        { hex: `#${rgbToHex(hslToRgb(mono2Hsl))}`, label: 'Lighter' },
      ],
    },
  };
}

/**
 * Generate Random HEX code
 */
export function getRandomHex(): string {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Converts sRGB channel [0, 255] to Linear sRGB [0, 1]
 */
function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

/**
 * Converts Linear sRGB [0, 1] to standard sRGB channel [0, 255]
 */
function linearToSrgb(v: number): number {
  const clamped = Math.max(0, Math.min(1, v));
  const s = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(255, s * 255)));
}

/**
 * RGB to OKLab (Perceptually Uniform Color Space)
 */
export function rgbToOklab({ r, g, b }: RGB): OKLab {
  const rLin = srgbToLinear(r);
  const gLin = srgbToLinear(g);
  const bLin = srgbToLinear(b);

  const l = Math.cbrt(0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin);
  const m = Math.cbrt(0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin);
  const s = Math.cbrt(0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin);

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  return {
    l: Math.round(L * 1000) / 1000,
    a: Math.round(a * 1000) / 1000,
    b: Math.round(bVal * 1000) / 1000,
  };
}

/**
 * OKLab to RGB
 */
export function oklabToRgb({ l: L, a, b }: OKLab): RGB {
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.2914855480 * b, 3);

  const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return {
    r: linearToSrgb(rLin),
    g: linearToSrgb(gLin),
    b: linearToSrgb(bLin),
  };
}

/**
 * RGB to OKLCH (Lightness, Chroma, Hue)
 */
export function rgbToOklch(rgb: RGB): OKLCH {
  const lab = rgbToOklab(rgb);
  const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let h = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (h < 0) h += 360;
  if (c < 0.0001) h = 0;

  return {
    l: Math.round(lab.l * 1000) / 1000,
    c: Math.round(c * 1000) / 1000,
    h: Math.round(h * 10) / 10,
  };
}

/**
 * OKLCH to RGB
 */
export function oklchToRgb({ l, c, h }: OKLCH): RGB {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  return oklabToRgb({ l, a, b });
}

/**
 * HEX to OKLCH
 */
export function hexToOklch(hex: string): OKLCH {
  return rgbToOklch(hexToRgb(hex));
}

/**
 * OKLCH to HEX
 */
export function oklchToHex(oklch: OKLCH): string {
  return rgbToHex(oklchToRgb(oklch));
}

/**
 * HEX to OKLab
 */
export function hexToOklab(hex: string): OKLab {
  return rgbToOklab(hexToRgb(hex));
}

/**
 * OKLab to HEX
 */
export function oklabToHex(oklab: OKLab): string {
  return rgbToHex(oklabToRgb(oklab));
}

