'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CopyButton } from './CopyButton';
import {
  ExtractedColor,
  ImageMetadata,
  validateImageFile,
  formatBytes,
  extractColorsFromImage,
  downloadPaletteAs,
} from '@/lib/image-color-extractor';
import {
  Upload,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Download,
  Trash2,
  FileCode,
  FileText,
  Layers,
  ArrowRight,
  AlertCircle,
  Maximize2,
  SlidersHorizontal,
} from 'lucide-react';

const SAMPLE_PRESETS = [
  {
    name: 'Sunset Nature',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    dimensions: '1920 × 1280',
    size: '1.2 MB',
  },
  {
    name: 'Neon Cyberpunk',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    dimensions: '1600 × 1066',
    size: '980 KB',
  },
  {
    name: 'Forest Mist',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    dimensions: '1800 × 1200',
    size: '1.4 MB',
  },
];

const COLOR_COUNT_OPTIONS = [5, 8, 10, 12, 16, 20];

export function ImageColorExtractorTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [colorCount, setColorCount] = useState<number>(8);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'json' | 'css' | 'txt'>('png');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const processLoadedImage = useCallback((img: HTMLImageElement, count: number) => {
    setIsAnalyzing(true);
    setErrorMsg(null);

    // Use requestAnimationFrame to prevent freezing UI on heavy images
    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          const colors = extractColorsFromImage(img, count);
          setExtractedColors(colors);
        } catch (err) {
          console.error('Extraction error:', err);
          setErrorMsg('Failed to process image colors. The image may be corrupted or blocked.');
        } finally {
          setIsAnalyzing(false);
        }
      }, 30);
    });
  }, []);

  const handleFile = useCallback((file: File) => {
    setErrorMsg(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrorMsg(validation.error || 'Invalid image file.');
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    setIsAnalyzing(true);

    img.onload = () => {
      loadedImageRef.current = img;
      setImageSrc(objectUrl);
      setMetadata({
        name: file.name,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        sizeBytes: file.size,
        sizeFormatted: formatBytes(file.size),
        type: file.type || 'image/jpeg',
      });
      processLoadedImage(img, colorCount);
    };

    img.onerror = () => {
      setIsAnalyzing(false);
      setErrorMsg('Failed to load image. Please verify the file is a valid image format.');
    };

    img.src = objectUrl;
  }, [colorCount, processLoadedImage]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle Clipboard Paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
              handleFile(file);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFile]);

  // Load sample image preset
  const loadPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setErrorMsg(null);
    setIsAnalyzing(true);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      loadedImageRef.current = img;
      setImageSrc(preset.url);
      setMetadata({
        name: `${preset.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        width: img.naturalWidth || 1920,
        height: img.naturalHeight || 1080,
        sizeBytes: 1200000,
        sizeFormatted: preset.size,
        type: 'image/jpeg',
      });
      processLoadedImage(img, colorCount);
    };

    img.onerror = () => {
      setIsAnalyzing(false);
      setErrorMsg('Failed to load sample image.');
    };

    img.src = preset.url;
  };

  // Handle Color Count Change
  const handleColorCountChange = (newCount: number) => {
    setColorCount(newCount);
    if (loadedImageRef.current) {
      processLoadedImage(loadedImageRef.current, newCount);
    }
  };

  // Reset / Remove Image
  const handleReset = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    loadedImageRef.current = null;
    setImageSrc(null);
    setMetadata(null);
    setExtractedColors([]);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle Download
  const handleDownload = async () => {
    if (extractedColors.length === 0) return;
    setIsDownloading(true);
    try {
      await downloadPaletteAs(downloadFormat, extractedColors, metadata);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy All HEXes as array
  const handleCopyAllHex = async () => {
    if (extractedColors.length === 0) return;
    const hexList = extractedColors.map(c => c.hex).join(', ');
    try {
      await navigator.clipboard.writeText(hexList);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy Notice Banner */}
      <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold">Privacy First:</strong> Your image is processed locally in your browser. It is never uploaded to any server or stored remotely.
        </p>
      </div>

      {/* Error Alert Message */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          <span className="flex-1">{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-xs font-semibold underline hover:no-underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        id="image-file-upload-input"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Main Upload or Active Workspace */}
      {!imageSrc ? (
        <div className="space-y-6">
          {/* Large Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-200 text-center ${
              isDragging
                ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/30 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 shadow-xs group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Drop your image here
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
              or <span className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2">click to browse</span> from your device • Supports paste from clipboard (Ctrl+V / ⌘V)
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono font-medium">JPG</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono font-medium">PNG</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono font-medium">WebP</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono font-medium">GIF</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono font-medium">AVIF</span>
              <span>• Max 10 MB</span>
            </div>
          </div>

          {/* Sample Preset Images Quick Try */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Or try with sample test images</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left cursor-pointer group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {preset.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {preset.dimensions}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ====================================================================
           ACTIVE IMAGE PREVIEW & EXTRACTED PALETTE DASHBOARD
           ==================================================================== */
        <div className="space-y-8">
          {/* Top Control Bar & Metadata Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              {/* Image Info Details */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={metadata?.name || 'Uploaded Source'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                    {metadata?.name || 'Uploaded Image'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {metadata && (
                      <>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {metadata.width} × {metadata.height} px
                        </span>
                        <span>•</span>
                        <span>{metadata.sizeFormatted}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Another Image</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Image</span>
                </button>
              </div>
            </div>

            {/* Color Count Selector & Re-analyze */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Dominant Colors to Extract:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {COLOR_COUNT_OPTIONS.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleColorCountChange(count)}
                    disabled={isAnalyzing}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      colorCount === count
                        ? 'bg-blue-600 text-white shadow-xs scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {count} colors
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Indicator for Heavy Images */}
          {isAnalyzing && (
            <div className="flex items-center justify-center gap-3 p-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/70 text-blue-700 dark:text-blue-300 animate-pulse">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-bold tracking-wide">
                Analyzing image & quantizing {colorCount} dominant colors...
              </span>
            </div>
          )}

          {/* Continuous Horizontal Palette Strip */}
          {extractedColors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Extracted Palette Strip ({extractedColors.length} Colors)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAllHex}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied All HEX!</span>
                    </>
                  ) : (
                    <>
                      <CopyButton textToCopy="" variant="ghost" size="sm" className="p-0 pointer-events-none" />
                      <span>Copy All HEX Array</span>
                    </>
                  )}
                </button>
              </div>

              {/* Clickable Horizontal Swatch Bar */}
              <div className="w-full h-16 sm:h-20 rounded-2xl overflow-hidden flex shadow-md border border-slate-200/80 dark:border-slate-800">
                {extractedColors.map((color, index) => (
                  <Link
                    key={`${color.cleanHex}-${index}`}
                    href={`/hex/${color.cleanHex}`}
                    title={`View #${color.cleanHex} (${color.name})`}
                    className="flex-1 h-full relative group transition-all duration-200 hover:flex-[1.5] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs ${
                        color.isLight ? 'text-slate-900 bg-white/30' : 'text-white bg-black/30'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold">{color.hex}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Export & Download Palette Bar */}
          {extractedColors.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Export & Download Palette
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Save extracted color scheme in PNG, JSON, CSS Variables, or plain text
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                  {(['png', 'json', 'css', 'txt'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setDownloadFormat(fmt)}
                      className={`px-3 py-1 text-xs font-semibold uppercase rounded-lg transition-colors cursor-pointer ${
                        downloadFormat === fmt
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloading ? 'Generating...' : `Download ${downloadFormat.toUpperCase()}`}</span>
                </button>
              </div>
            </div>
          )}

          {/* ====================================================================
             EXTRACTED COLOR CARDS GRID
             ==================================================================== */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Extracted Color Specifications
              </h3>
              <span className="text-xs font-semibold text-slate-400 font-mono">
                {extractedColors.length} unique colors extracted
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {extractedColors.map((color, index) => (
                <div
                  key={`${color.cleanHex}-${index}`}
                  id={`color-card-${color.cleanHex}`}
                  className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-200"
                >
                  {/* Large Color Swatch Box */}
                  <div
                    className="relative h-32 sm:h-36 w-full p-3.5 flex flex-col justify-between transition-transform duration-300"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-2xs ${
                          color.isLight
                            ? 'bg-black/15 text-slate-900 border border-black/10'
                            : 'bg-white/20 text-white border border-white/20'
                        }`}
                      >
                        #{index + 1} Dominant
                      </span>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-2xs ${
                          color.isLight
                            ? 'bg-black/15 text-slate-900 border border-black/10'
                            : 'bg-white/20 text-white border border-white/20'
                        }`}
                      >
                        {color.percent}%
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-2xs truncate max-w-[170px] ${
                          color.isLight
                            ? 'bg-black/10 text-slate-900 border border-black/10'
                            : 'bg-white/20 text-white border border-white/20'
                        }`}
                      >
                        {color.name}
                      </span>

                      <Link
                        href={`/hex/${color.cleanHex}`}
                        title={`Open #${color.cleanHex} full specifications`}
                        className={`p-1.5 rounded-lg backdrop-blur-md transition-transform group-hover:scale-110 ${
                          color.isLight
                            ? 'bg-black/15 hover:bg-black/30 text-slate-900'
                            : 'bg-white/20 hover:bg-white/40 text-white'
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Color Values & Copy Buttons */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between text-xs">
                    {/* HEX Value */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          HEX
                        </span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white truncate block">
                          {color.hex}
                        </span>
                      </div>
                      <CopyButton textToCopy={color.hex} label="" variant="ghost" size="sm" />
                    </div>

                    {/* RGB Value */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          RGB
                        </span>
                        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-[11px] truncate block">
                          {color.rgbString}
                        </span>
                      </div>
                      <CopyButton textToCopy={color.rgbString} label="" variant="ghost" size="sm" />
                    </div>

                    {/* HSL Value */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          HSL
                        </span>
                        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-[11px] truncate block">
                          {color.hslString}
                        </span>
                      </div>
                      <CopyButton textToCopy={color.hslString} label="" variant="ghost" size="sm" />
                    </div>

                    {/* CMYK Value */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          CMYK
                        </span>
                        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-[11px] truncate block">
                          {color.cmykString}
                        </span>
                      </div>
                      <CopyButton textToCopy={color.cmykString} label="" variant="ghost" size="sm" />
                    </div>

                    {/* Deep Link to Single Color Profile */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                      <Link
                        href={`/hex/${color.cleanHex}`}
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <span>Full Color Specs</span>
                        <span>→</span>
                      </Link>
                      <span className="text-slate-400">
                        {color.isLight ? 'Light Tone' : 'Dark Tone'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
