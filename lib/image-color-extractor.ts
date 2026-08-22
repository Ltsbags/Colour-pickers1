import {
  RGB,
  HSL,
  CMYK,
  rgbToHex,
  rgbToHsl,
  rgbToCmyk,
  isLightColor,
} from './color-utils';
import { getClosestColorName } from './color-names';

export interface ExtractedColor {
  hex: string;          // '#3B82F6'
  cleanHex: string;     // '3B82F6'
  rgb: RGB;             // { r: 59, g: 130, b: 246 }
  rgbString: string;    // 'rgb(59, 130, 246)'
  hsl: HSL;             // { h: 217, s: 91, l: 60 }
  hslString: string;    // 'hsl(217, 91%, 60%)'
  cmyk: CMYK;           // { c: 76, m: 47, y: 0, k: 4 }
  cmykString: string;   // 'cmyk(76%, 47%, 0%, 4%)'
  name: string;         // 'Dodger Blue'
  population: number;   // pixel count in cluster
  percent: number;      // percentage of total sampled pixels
  isLight: boolean;
}

export interface ScreenshotUiPalette {
  primary: ExtractedColor | null;
  secondary: ExtractedColor | null;
  background: ExtractedColor | null;
  backgroundAlt: ExtractedColor | null;
  textColor: ExtractedColor | null;
  accent: ExtractedColor | null;
  allColors: ExtractedColor[];
}

export interface ImageMetadata {
  name: string;
  width: number;
  height: number;
  sizeBytes: number;
  sizeFormatted: string;
  type: string;
}

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const SUPPORTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
];

export const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file was provided.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10 MB limit (${formatBytes(file.size)}). Please upload a smaller image.`,
    };
  }

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  const isTypeSupported =
    SUPPORTED_MIME_TYPES.includes(fileType) ||
    SUPPORTED_EXTENSIONS.some(ext => fileName.endsWith(ext));

  if (!isTypeSupported && fileType !== '') {
    return {
      valid: false,
      error: 'Unsupported image format. Please upload a JPG, PNG, WebP, GIF, or AVIF image.',
    };
  }

  return { valid: true };
}

interface Pixel {
  r: number;
  g: number;
  b: number;
}

interface ColorBox {
  pixels: Pixel[];
  rMin: number;
  rMax: number;
  gMin: number;
  gMax: number;
  bMin: number;
  bMax: number;
}

function createBox(pixels: Pixel[]): ColorBox {
  let rMin = 255, rMax = 0;
  let gMin = 255, gMax = 0;
  let bMin = 255, bMax = 0;

  for (let i = 0; i < pixels.length; i++) {
    const p = pixels[i];
    if (p.r < rMin) rMin = p.r;
    if (p.r > rMax) rMax = p.r;
    if (p.g < gMin) gMin = p.g;
    if (p.g > gMax) gMax = p.g;
    if (p.b < bMin) bMin = p.b;
    if (p.b > bMax) bMax = p.b;
  }

  return {
    pixels,
    rMin, rMax,
    gMin, gMax,
    bMin, bMax,
  };
}

function getBoxRange(box: ColorBox): { range: number; channel: 'r' | 'g' | 'b' } {
  const rRange = box.rMax - box.rMin;
  const gRange = box.gMax - box.gMin;
  const bRange = box.bMax - box.bMin;

  if (rRange >= gRange && rRange >= bRange) {
    return { range: rRange, channel: 'r' };
  }
  if (gRange >= rRange && gRange >= bRange) {
    return { range: gRange, channel: 'g' };
  }
  return { range: bRange, channel: 'b' };
}

function splitBox(box: ColorBox): [ColorBox, ColorBox] {
  if (box.pixels.length <= 1) {
    return [box, createBox([])];
  }

  const { channel } = getBoxRange(box);
  box.pixels.sort((a, b) => a[channel] - b[channel]);

  const medianIndex = Math.floor(box.pixels.length / 2);
  const part1 = box.pixels.slice(0, medianIndex);
  const part2 = box.pixels.slice(medianIndex);

  return [createBox(part1), createBox(part2)];
}

function colorDistance(p1: RGB, p2: RGB): number {
  // Euclidean distance in RGB space
  const dr = p1.r - p2.r;
  const dg = p1.g - p2.g;
  const db = p1.b - p2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Extracts dominant representative colors from an HTMLImageElement using Median Cut quantization.
 */
export function extractColorsFromImage(
  img: HTMLImageElement,
  targetCount: number = 8
): ExtractedColor[] {
  // Downsample to max dimension of 220px for fast, efficient, low-memory extraction
  const maxDim = 220;
  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height, 1));
  const canvasWidth = Math.max(1, Math.round((img.naturalWidth || img.width) * scale));
  const canvasHeight = Math.max(1, Math.round((img.naturalHeight || img.height) * scale));

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('Canvas 2D context is not supported in this browser.');
  }

  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  const imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;

  // Sample pixels, ignoring fully transparent ones (alpha < 64)
  const pixels: Pixel[] = [];
  // Sample step for performance
  const step = imgData.length > 50000 * 4 ? 4 : 1;

  for (let i = 0; i < imgData.length; i += 4 * step) {
    const a = imgData[i + 3];
    if (a < 64) continue; // Skip transparent
    pixels.push({
      r: imgData[i],
      g: imgData[i + 1],
      b: imgData[i + 2],
    });
  }

  if (pixels.length === 0) {
    // Fallback if image was purely transparent
    return [
      buildExtractedColor({ r: 59, g: 130, b: 246 }, 1, 1),
      buildExtractedColor({ r: 16, g: 185, b: 129 }, 1, 1),
      buildExtractedColor({ r: 245, g: 158, b: 11 }, 1, 1),
      buildExtractedColor({ r: 239, g: 68, b: 68 }, 1, 1),
      buildExtractedColor({ r: 139, g: 92, b: 246 }, 1, 1),
    ].slice(0, targetCount);
  }

  // Median Cut subdivision
  const boxes: ColorBox[] = [createBox(pixels)];

  // Request more initial boxes to allow room for deduplication
  const requestedBoxes = Math.min(pixels.length, Math.max(targetCount * 2, 16));

  while (boxes.length < requestedBoxes) {
    // Find box with greatest range and more than 1 pixel
    let maxRange = -1;
    let boxToSplitIdx = -1;

    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].pixels.length > 1) {
        const { range } = getBoxRange(boxes[i]);
        if (range > maxRange) {
          maxRange = range;
          boxToSplitIdx = i;
        }
      }
    }

    if (boxToSplitIdx === -1 || maxRange <= 0) {
      break; // Cannot split further
    }

    const [box1, box2] = splitBox(boxes[boxIdx(boxToSplitIdx)]);
    boxes.splice(boxToSplitIdx, 1);
    if (box1.pixels.length > 0) boxes.push(box1);
    if (box2.pixels.length > 0) boxes.push(box2);
  }

  function boxIdx(idx: number) {
    return idx;
  }

  // Calculate average RGB and population for each box
  const rawClusters: { rgb: RGB; population: number }[] = [];
  for (const box of boxes) {
    if (box.pixels.length === 0) continue;
    let rSum = 0, gSum = 0, bSum = 0;
    for (const p of box.pixels) {
      rSum += p.r;
      gSum += p.g;
      bSum += p.b;
    }
    const count = box.pixels.length;
    rawClusters.push({
      rgb: {
        r: Math.round(rSum / count),
        g: Math.round(gSum / count),
        b: Math.round(bSum / count),
      },
      population: count,
    });
  }

  // Sort by population (descending)
  rawClusters.sort((a, b) => b.population - a.population);

  // Deduplicate colors that are visually too close (Euclidean distance < 24)
  const distinctClusters: { rgb: RGB; population: number }[] = [];
  const minDistance = 24;

  for (const cluster of rawClusters) {
    const isTooClose = distinctClusters.some(
      existing => colorDistance(existing.rgb, cluster.rgb) < minDistance
    );
    if (!isTooClose) {
      distinctClusters.push(cluster);
    } else {
      // Merge population into closest
      const closest = distinctClusters.find(
        existing => colorDistance(existing.rgb, cluster.rgb) < minDistance
      );
      if (closest) {
        closest.population += cluster.population;
      }
    }
  }

  // If deduplication left fewer than targetCount, fill with highest population remaining
  if (distinctClusters.length < targetCount) {
    for (const cluster of rawClusters) {
      if (distinctClusters.length >= targetCount) break;
      const isAlreadyIn = distinctClusters.some(
        c => c.rgb.r === cluster.rgb.r && c.rgb.g === cluster.rgb.g && c.rgb.b === cluster.rgb.b
      );
      if (!isAlreadyIn) {
        distinctClusters.push(cluster);
      }
    }
  }

  const finalClusters = distinctClusters.slice(0, targetCount);
  const totalSampledPixels = pixels.length;

  return finalClusters.map(c => buildExtractedColor(c.rgb, c.population, totalSampledPixels));
}

function buildExtractedColor(rgb: RGB, population: number, total: number): ExtractedColor {
  const cleanHex = rgbToHex(rgb);
  const hex = `#${cleanHex}`;
  const hsl = rgbToHsl(rgb);
  const cmyk = rgbToCmyk(rgb);
  const name = getClosestColorName(cleanHex).name;
  const isLight = isLightColor(rgb);
  const percent = total > 0 ? Math.round((population / total) * 1000) / 10 : 0;

  return {
    hex,
    cleanHex,
    rgb,
    rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl,
    hslString: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    cmyk,
    cmykString: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    name,
    population,
    percent,
    isLight,
  };
}

export function extractScreenshotUiColors(img: HTMLImageElement): ScreenshotUiPalette {
  const allColors = extractColorsFromImage(img, 16);

  if (allColors.length === 0) {
    return {
      primary: null,
      secondary: null,
      background: null,
      backgroundAlt: null,
      textColor: null,
      accent: null,
      allColors: [],
    };
  }

  // Identify background: highest population or extreme lightness (near white or near black)
  const neutralCandidates = allColors.filter(c => c.hsl.s < 20 || c.hsl.l > 88 || c.hsl.l < 15);
  const vibrantCandidates = allColors.filter(c => c.hsl.s >= 20 && c.hsl.l >= 15 && c.hsl.l <= 88);

  const background: ExtractedColor | null = neutralCandidates.length > 0 ? neutralCandidates[0] : allColors[0];
  const backgroundAlt: ExtractedColor | null = neutralCandidates.length > 1 ? neutralCandidates[1] : null;

  // Primary brand: most prominent vibrant hue
  const primary: ExtractedColor | null = vibrantCandidates.length > 0 ? vibrantCandidates[0] : allColors[0];

  // Secondary brand: second distinct vibrant hue
  let secondary: ExtractedColor | null = null;
  if (primary && vibrantCandidates.length > 1) {
    for (let i = 1; i < vibrantCandidates.length; i++) {
      const cand = vibrantCandidates[i];
      if (Math.abs(cand.hsl.h - primary.hsl.h) > 25 || Math.abs(cand.hsl.l - primary.hsl.l) > 25) {
        secondary = cand;
        break;
      }
    }
  }
  if (!secondary && allColors.length > 1) {
    secondary = allColors[1] !== primary ? allColors[1] : allColors[2] || null;
  }

  // Accent: highest saturation vibrant color or brightest warm color
  let accent: ExtractedColor | null = null;
  const highSaturation = [...vibrantCandidates].sort((a, b) => b.hsl.s - a.hsl.s);
  if (highSaturation.length > 0 && highSaturation[0] !== primary) {
    accent = highSaturation[0];
  } else if (highSaturation.length > 1) {
    accent = highSaturation[1];
  } else if (allColors.length > 2) {
    accent = allColors[2];
  }

  // Text color: extreme contrast against detected background
  let textColor: ExtractedColor | null = null;
  const isBgLight = background ? background.isLight : true;

  if (isBgLight) {
    // Look for darkest shade
    const darkColors = [...allColors].sort((a, b) => a.hsl.l - b.hsl.l);
    textColor = darkColors[0] || null;
  } else {
    // Look for lightest shade
    const lightColors = [...allColors].sort((a, b) => b.hsl.l - a.hsl.l);
    textColor = lightColors[0] || null;
  }

  return {
    primary,
    secondary,
    background,
    backgroundAlt,
    textColor,
    accent,
    allColors,
  };
}

/**
 * Download extracted palette in multiple standard developer & designer formats.
 */
export async function downloadPaletteAs(
  format: 'png' | 'json' | 'css' | 'txt',
  colors: ExtractedColor[],
  metadata: ImageMetadata | null
): Promise<void> {
  const baseName = metadata?.name
    ? metadata.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
    : 'extracted_palette';

  if (format === 'json') {
    const data = colors.map(c => ({
      hex: c.hex,
      rgb: c.rgbString,
      hsl: c.hslString,
      cmyk: c.cmykString,
      name: c.name,
      populationPercent: `${c.percent}%`,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    triggerDownload(blob, `${baseName}_palette.json`);
    return;
  }

  if (format === 'css') {
    let cssText = `/* Extracted Color Palette from ${metadata?.name || 'Image'} */\n:root {\n`;
    colors.forEach((c, idx) => {
      cssText += `  --color-${idx + 1}: ${c.hex}; /* ${c.name} | ${c.rgbString} */\n`;
    });
    cssText += `}\n`;
    const blob = new Blob([cssText], { type: 'text/css' });
    triggerDownload(blob, `${baseName}_palette.css`);
    return;
  }

  if (format === 'txt') {
    let txt = `Color Pickers - Image Color Extractor\n`;
    txt += `Source Image: ${metadata?.name || 'Uploaded Image'}\n`;
    if (metadata) {
      txt += `Dimensions: ${metadata.width} x ${metadata.height} px | Size: ${metadata.sizeFormatted}\n`;
    }
    txt += `Extracted Colors (${colors.length}):\n`;
    txt += `----------------------------------------------------------\n`;
    colors.forEach((c, idx) => {
      txt += `#${idx + 1}: ${c.hex.padEnd(8)} | ${c.rgbString.padEnd(20)} | ${c.hslString.padEnd(20)} | ${c.cmykString.padEnd(24)} | ${c.name}\n`;
    });
    const blob = new Blob([txt], { type: 'text/plain' });
    triggerDownload(blob, `${baseName}_palette.txt`);
    return;
  }

  if (format === 'png') {
    // Generate high-resolution canvas card
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0F172A'; // Slate 900
    ctx.fillRect(0, 0, width, height);

    // Header Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Color Pickers — Image Color Extractor', 48, 64);

    // Subtitle
    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const subText = metadata
      ? `${metadata.name} (${metadata.width}×${metadata.height}px)`
      : 'Extracted Palette Swatches';
    ctx.fillText(subText, 48, 96);

    // Swatches Layout
    const paddingX = 48;
    const startY = 130;
    const totalSwatchesWidth = width - paddingX * 2;
    const swatchWidth = totalSwatchesWidth / colors.length;
    const swatchHeight = 360;

    colors.forEach((c, i) => {
      const x = paddingX + i * swatchWidth;

      // Draw swatch rectangle
      ctx.fillStyle = c.hex;
      ctx.fillRect(x, startY, swatchWidth, swatchHeight);

      // Card bottom details area
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(x, startY + swatchHeight, swatchWidth, 90);

      // Border between cards
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, startY, swatchWidth, swatchHeight + 90);

      // Hex code label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(c.hex, x + swatchWidth / 2, startY + swatchHeight + 35);

      // Color name label
      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const truncatedName = c.name.length > 14 ? c.name.slice(0, 12) + '...' : c.name;
      ctx.fillText(truncatedName, x + swatchWidth / 2, startY + swatchHeight + 62);
    });

    // Reset text align
    ctx.textAlign = 'left';

    // Footer branding
    ctx.fillStyle = '#64748B';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('color-pickers.com • Browser-Based Color Tools', 48, height - 30);

    canvas.toBlob(blob => {
      if (blob) {
        triggerDownload(blob, `${baseName}_palette.png`);
      }
    }, 'image/png');
  }
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
