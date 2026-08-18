'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { ToolSeoContent } from '@/components/ToolSeoContent';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import {
  rgbToHex,
  hexToRgb,
  rgbToHsl,
  rgbToHsv,
  rgbToCmyk,
  getContrastRatio,
  isLightColor,
} from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { addToColorHistory } from '@/lib/color-history';
import {
  Upload,
  Pipette,
  Layers,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Sparkles,
  Sliders,
  ShieldCheck,
  ArrowRight,
  ZoomIn,
} from 'lucide-react';

export default function ImageColorPickerPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<{
    hex: string;
    rgb: { r: number; g: number; b: number };
    name: string;
  }>({
    hex: '3B82F6',
    rgb: { r: 59, g: 130, b: 246 },
    name: 'Bright Blue',
  });
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([
    '3B82F6',
    '10B981',
    'F59E0B',
    'EF4444',
    'EC4899',
    '8B5CF6',
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const renderImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Scale canvas to fit max width while preserving aspect ratio
    const maxWidth = 800;
    const scale = Math.min(1, maxWidth / img.width);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  const extractPaletteFromImage = useCallback((img: HTMLImageElement) => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    if (!tempCtx) return;

    // Downscale for fast quantization
    tempCanvas.width = 100;
    tempCanvas.height = 100;
    tempCtx.drawImage(img, 0, 0, 100, 100);

    const imgData = tempCtx.getImageData(0, 0, 100, 100).data;
    const colorCounts: { [hex: string]: number } = {};

    for (let i = 0; i < imgData.length; i += 16) {
      const r = Math.round(imgData[i] / 16) * 16;
      const g = Math.round(imgData[i + 1] / 16) * 16;
      const b = Math.round(imgData[i + 2] / 16) * 16;
      const a = imgData[i + 3];

      // Ignore transparent pixels
      if (a < 128) continue;

      const hex = rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b));
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }

    const sorted = Object.keys(colorCounts).sort(
      (a, b) => colorCounts[b] - colorCounts[a]
    );

    const extracted = sorted.slice(0, 8);
    if (extracted.length > 0) {
      setPalette(extracted);
    }
  }, []);

  // Default sample image on load
  useEffect(() => {
    // Generate a default pleasant abstract canvas image for immediate usability
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 600, 360);
      grad.addColorStop(0, '#3B82F6');
      grad.addColorStop(0.35, '#8B5CF6');
      grad.addColorStop(0.7, '#EC4899');
      grad.addColorStop(1, '#F59E0B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 360);

      // Add soft circles for sample diversity
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.arc(150, 180, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.beginPath();
      ctx.arc(450, 180, 90, 0, Math.PI * 2);
      ctx.fill();

      const defaultDataUrl = canvas.toDataURL('image/png');
      const timer = setTimeout(() => {
        setImageSrc(defaultDataUrl);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  // When imageSrc changes, draw to canvas and extract dominant colors
  useEffect(() => {
    if (!imageSrc) return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      renderImageToCanvas(img);
      extractPaletteFromImage(img);
    };
    img.src = imageSrc;
  }, [imageSrc, renderImageToCanvas, extractPaletteFromImage]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    const name = getClosestColorName(hex).name;

    setPickedColor({
      hex,
      rgb: { r: pixel[0], g: pixel[1], b: pixel[2] },
      name,
    });
    addToColorHistory(hex, name);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      setHoverColor(rgbToHex(pixel[0], pixel[1], pixel[2]));
    }
  };

  const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((touch.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((touch.clientY - rect.top) * (canvas.height / rect.height));

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      const name = getClosestColorName(hex).name;
      setPickedColor({
        hex,
        rgb: { r: pixel[0], g: pixel[1], b: pixel[2] },
        name,
      });
      addToColorHistory(hex, name);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WEBP, SVG, GIF).');
      return;
    }

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = e => {
      if (typeof e.target?.result === 'string') {
        setImageSrc(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const hsl = rgbToHsl(pickedColor.rgb);
  const hsv = rgbToHsv(pickedColor.rgb);
  const cmyk = rgbToCmyk(pickedColor.rgb);
  const isLight = isLightColor(pickedColor.rgb);
  const contrastWhite = getContrastRatio(pickedColor.rgb, { r: 255, g: 255, b: 255 });
  const contrastBlack = getContrastRatio(pickedColor.rgb, { r: 0, g: 0, b: 0 });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Image Color Picker' },
          ]}
        />

        {/* Hero Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Image Eyedropper & Palette Extractor</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Image Color Picker
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Upload any image (JPG, PNG, WEBP, SVG) to extract exact pixel hex colors, generate dominant color palettes, and inspect full color conversions completely in your browser.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Interactive Image Upload & Canvas Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Upload Area & Canvas */}
          <div className="lg:col-span-8 space-y-6">
            {/* Upload Box */}
            <div
              onDragOver={e => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`p-6 border-2 border-dashed rounded-3xl text-center transition-all bg-white dark:bg-slate-900 ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <input
                type="file"
                id="image-file-input"
                accept="image/*"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="image-file-input"
                    className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Click to upload an image
                  </label>
                  <span className="text-xs text-slate-400 block">
                    or drag & drop your file here (PNG, JPG, WEBP, SVG)
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  🔒 Images are processed locally in your browser and are not uploaded to our servers.
                </div>
              </div>

              {errorMsg && (
                <div className="mt-3 text-xs text-red-500 font-semibold">{errorMsg}</div>
              )}
            </div>

            {/* Interactive Image Canvas Display */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Pipette className="w-4 h-4 text-blue-600" />
                  <span>Click anywhere on the image to sample a color</span>
                </div>
                {hoverColor && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Hovering:</span>
                    <div
                      className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: `#${hoverColor}` }}
                    />
                    <span className="font-mono font-bold">#{hoverColor}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-2xl p-4 overflow-hidden min-h-[300px]">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseLeave={() => setHoverColor(null)}
                  onTouchStart={handleCanvasTouch}
                  onTouchMove={handleCanvasTouch}
                  className="max-w-full h-auto cursor-crosshair rounded-xl shadow-md transition-shadow hover:shadow-lg touch-none"
                />
              </div>
            </div>

            {/* Extracted Dominant Palette */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Extracted Dominant Color Palette
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  {palette.length} Dominant Swatches
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {palette.map(hex => (
                  <div
                    key={hex}
                    onClick={() => {
                      const rgb = hexToRgb(hex);
                      const name = getClosestColorName(hex).name;
                      setPickedColor({ hex, rgb, name });
                      addToColorHistory(hex, name);
                    }}
                    className={`group p-2 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${
                      pickedColor.hex.toLowerCase() === hex.toLowerCase()
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded-xl shadow-2xs border border-black/5 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: `#${hex}` }}
                    />
                    <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                      #{hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Picked Color Specs Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Selected Color
                </span>
                <Link
                  href={`/hex/${pickedColor.hex}`}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Large Color Swatch */}
              <div
                className="w-full h-32 rounded-2xl shadow-inner border border-black/10 flex flex-col justify-end p-4 transition-all"
                style={{ backgroundColor: `#${pickedColor.hex}` }}
              >
                <div
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md inline-self-start ${
                    isLight ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                  }`}
                >
                  {pickedColor.name}
                </div>
              </div>

              {/* Values List */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-500">HEX:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      #{pickedColor.hex}
                    </span>
                    <CopyButton text={`#${pickedColor.hex}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-500">RGB:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      rgb({pickedColor.rgb.r}, {pickedColor.rgb.g}, {pickedColor.rgb.b})
                    </span>
                    <CopyButton
                      text={`rgb(${pickedColor.rgb.r}, ${pickedColor.rgb.g}, ${pickedColor.rgb.b})`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-500">HSL:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </span>
                    <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-500">CMYK:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
                    </span>
                    <CopyButton
                      text={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                    />
                  </div>
                </div>
              </div>

              {/* WCAG Contrast Ratings */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Contrast on White:</span>
                  <span className="font-bold font-mono">{contrastWhite.toFixed(2)}:1</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Contrast on Black:</span>
                  <span className="font-bold font-mono">{contrastBlack.toFixed(2)}:1</span>
                </div>
              </div>

              <Link
                href={`/hex/${pickedColor.hex}`}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center block transition-all shadow-xs"
              >
                Inspect #{pickedColor.hex} Harmonies & Shades
              </Link>
            </div>
          </div>
        </div>

        <AdSlot type="in-content" />

        {/* Educational SEO & FAQ Section */}
        <ToolSeoContent
          toolName="Image Color Picker"
          category="Extraction & Eyedropper"
          description="How to extract colors and palettes from images directly in your browser without uploading to any server."
          features={[
            'Sample exact pixel colors from any uploaded photo, screenshot, or graphic with a crosshair cursor.',
            'Automatic dominant color palette extraction powered by HTML5 Canvas image quantization.',
            'Instant calculation of HEX, RGB, HSL, HSV, CMYK values, and closest named color match.',
            'Images are processed locally in your browser and are not uploaded to our servers.',
          ]}
          howToUse={[
            'Drag and drop an image file (PNG, JPG, WEBP, SVG) into the drop zone, or click to upload.',
            'Move your cursor over the image preview to see real-time color sampling in the top corner.',
            'Click anywhere on the image to select the pixel color and view its complete specifications.',
            'Click any color swatch in the Extracted Dominant Palette to inspect its harmonies and shades.',
          ]}
          faqList={[
            {
              question: 'Are my uploaded images saved on your servers?',
              answer:
                'No. The Color Pickers Image Color Picker executes entirely in your web browser using client-side HTML5 Canvas. Images are processed locally in your browser and are not uploaded to our servers.',
            },
            {
              question: 'How does the dominant palette extraction work?',
              answer:
                'Our algorithm downscales the image and performs color frequency quantization across non-transparent pixels, grouping similar chromatic tones to identify the primary color themes of the photo.',
            },
            {
              question: 'Can I copy the extracted colors to my clipboard?',
              answer:
                'Yes. You can copy individual HEX, RGB, HSL, or CMYK codes with one click, or visit the color detail page for full CSS variables, shades, tints, and harmony combinations.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
