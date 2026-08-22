// Automated Verification Test Suite for Color Math and Resolver
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToCmyk,
  cmykToRgb,
  getLuminance,
  getContrastRatio,
  rgbToOklab,
  rgbToOklch,
  getShades,
  getTints,
  getTones,
  getHarmonies,
  normalizeHex,
  isValidHex,
} from '../lib/color-utils.ts';
import {
  getColorResolution,
  getExactCssColor,
  getClosestColorName,
  CSS_NAMED_COLORS,
  COLOR_NAMES,
} from '../lib/color-names.ts';

const testColors = [
  { hex: '000000', expectedRgb: { r: 0, g: 0, b: 0 }, expectedHsl: { h: 0, s: 0, l: 0 }, isCss: true, cssName: 'Black' },
  { hex: 'FFFFFF', expectedRgb: { r: 255, g: 255, b: 255 }, expectedHsl: { h: 0, s: 0, l: 100 }, isCss: true, cssName: 'White' },
  { hex: 'FF0000', expectedRgb: { r: 255, g: 0, b: 0 }, expectedHsl: { h: 0, s: 100, l: 50 }, isCss: true, cssName: 'Red' },
  { hex: '00FF00', expectedRgb: { r: 0, g: 255, b: 0 }, expectedHsl: { h: 120, s: 100, l: 50 }, isCss: true, cssName: 'Lime' },
  { hex: '0000FF', expectedRgb: { r: 0, g: 0, b: 255 }, expectedHsl: { h: 240, s: 100, l: 50 }, isCss: true, cssName: 'Blue' },
  { hex: '808080', expectedRgb: { r: 128, g: 128, b: 128 }, expectedHsl: { h: 0, s: 0, l: 50 }, isCss: true, cssName: 'Gray' },
  { hex: 'FF5733', expectedRgb: { r: 255, g: 87, b: 51 }, isCss: false },
  { hex: '3B82F6', expectedRgb: { r: 59, g: 130, b: 246 }, isCss: false },
  { hex: '10B981', expectedRgb: { r: 16, g: 185, b: 129 }, isCss: false },
];

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    errors++;
  } else {
    console.log(`✅ ${message}`);
  }
}

console.log('--- 1. Validation & Normalization Tests ---');
assert(isValidHex('#FF5733') === true, 'isValidHex #FF5733');
assert(isValidHex('3B82F6') === true, 'isValidHex 3B82F6');
assert(isValidHex('fff') === true, 'isValidHex 3-digit fff');
assert(isValidHex('#f03') === true, 'isValidHex 3-digit #f03');
assert(isValidHex('invalid') === false, 'isValidHex invalid rejected');
assert(isValidHex('12345') === false, 'isValidHex 5-digit rejected');
assert(isValidHex('1234567') === false, 'isValidHex 7-digit rejected');

assert(normalizeHex('fff') === 'FFFFFF', 'normalizeHex 3-digit expands correctly');
assert(normalizeHex('#3b82f6') === '3B82F6', 'normalizeHex uppercase canonicalization');
assert(normalizeHex('   #FF5733  ') === 'FF5733', 'normalizeHex whitespace trimming');

console.log('\n--- 2. Color Conversions & Roundtrips ---');
for (const tc of testColors) {
  const clean = tc.hex;
  const rgb = hexToRgb(clean);
  assert(rgb.r === tc.expectedRgb.r && rgb.g === tc.expectedRgb.g && rgb.b === tc.expectedRgb.b, `HEX -> RGB for #${clean}: got rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);

  const hexBack = rgbToHex(rgb);
  assert(hexBack === clean, `RGB -> HEX roundtrip for #${clean}: got #${hexBack}`);

  const hsl = rgbToHsl(rgb);
  if (tc.expectedHsl) {
    assert(hsl.h === tc.expectedHsl.h && hsl.s === tc.expectedHsl.s && hsl.l === tc.expectedHsl.l, `RGB -> HSL for #${clean}: got hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
  }

  const rgbFromHsl = hslToRgb(hsl);
  assert(Math.abs(rgbFromHsl.r - rgb.r) <= 2 && Math.abs(rgbFromHsl.g - rgb.g) <= 2 && Math.abs(rgbFromHsl.b - rgb.b) <= 2, `HSL -> RGB roundtrip for #${clean}`);

  const hsv = rgbToHsv(rgb);
  const rgbFromHsv = hsvToRgb(hsv);
  assert(Math.abs(rgbFromHsv.r - rgb.r) <= 1 && Math.abs(rgbFromHsv.g - rgb.g) <= 1 && Math.abs(rgbFromHsv.b - rgb.b) <= 1, `HSV -> RGB roundtrip for #${clean}`);

  const cmyk = rgbToCmyk(rgb);
  const rgbFromCmyk = cmykToRgb(cmyk);
  assert(Math.abs(rgbFromCmyk.r - rgb.r) <= 2 && Math.abs(rgbFromCmyk.g - rgb.g) <= 2 && Math.abs(rgbFromCmyk.b - rgb.b) <= 2, `CMYK -> RGB roundtrip for #${clean}`);

  const oklab = rgbToOklab(rgb);
  assert(typeof oklab.l === 'number' && typeof oklab.a === 'number' && typeof oklab.b === 'number', `OKLab for #${clean}`);

  const oklch = rgbToOklch(rgb);
  assert(typeof oklch.l === 'number' && typeof oklch.c === 'number' && typeof oklch.h === 'number', `OKLCH for #${clean}`);
}

console.log('\n--- 3. WCAG Luminance & Contrast Tests ---');
const lumBlack = getLuminance({ r: 0, g: 0, b: 0 });
const lumWhite = getLuminance({ r: 255, g: 255, b: 255 });
assert(Math.abs(lumBlack - 0.0) < 0.001, `Black relative luminance is 0.0 (got ${lumBlack})`);
assert(Math.abs(lumWhite - 1.0) < 0.001, `White relative luminance is 1.0 (got ${lumWhite})`);

const contrastBlackWhite = getContrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
assert(contrastBlackWhite === 21, `Black on White contrast ratio is 21:1 (got ${contrastBlackWhite})`);

const contrastWhiteWhite = getContrastRatio({ r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 });
assert(contrastWhiteWhite === 1, `White on White contrast ratio is 1:1 (got ${contrastWhiteWhite})`);

console.log('\n--- 4. Color Harmonies, Shades, Tints, Tones ---');
const shades = getShades('3B82F6', 10);
assert(shades.length === 11, `Shades returns 11 stops (got ${shades.length})`);
assert(shades[0].hex === '#3B82F6', 'Shades start at base color');
assert(shades[10].hex === '#000000', 'Shades end at pure black');

const tints = getTints('3B82F6', 10);
assert(tints.length === 11, `Tints returns 11 stops (got ${tints.length})`);
assert(tints[0].hex === '#3B82F6', 'Tints start at base color');
assert(tints[10].hex === '#FFFFFF', 'Tints end at pure white');

const harmonies = getHarmonies('FF0000');
assert(harmonies.complementary.colors[1].hex.toUpperCase() === '#00FFFF', 'Complement of Pure Red (#FF0000) is Cyan (#00FFFF)');
assert(harmonies.triadic.colors.length === 3, 'Triadic has 3 colors');

console.log('\n--- 5. Color Names & Resolver Verification ---');
for (const tc of testColors) {
  const res = getColorResolution(tc.hex);
  if (tc.isCss) {
    assert(res.isExactCss === true, `#${tc.hex} is identified as exact CSS standard color`);
    assert(res.cssName?.toLowerCase() === tc.cssName?.toLowerCase(), `#${tc.hex} CSS name is ${tc.cssName} (got ${res.cssName})`);
  } else {
    assert(res.isExactCss === false, `#${tc.hex} is correctly NOT identified as exact CSS standard color`);
    assert(res.isDescriptive === true, `#${tc.hex} is marked as descriptive/approximate`);
  }
}

console.log(`\nVerification Complete! Errors: ${errors}`);
if (errors > 0) process.exit(1);
