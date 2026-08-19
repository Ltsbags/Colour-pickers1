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
  Sparkles,
  ShieldCheck,
  Download,
  Trash2,
  RefreshCw,
  Layers,
  ArrowRight,
  AlertCircle,
  Palette,
  Check,
} from 'lucide-react';

const PRESETS = [
  {
    name: 'Ocean Waves',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    dimensions: '1920 × 1280',
  },
  {
    name: 'Autumn Foliage',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    dimensions: '1600 × 1066',
  },
  {
    name: 'Alpine Forest',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    dimensions: '1800 × 1200',
  },
];

export function ImagePaletteGeneratorTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [paletteSize, setPaletteSize] = useState<5 | 10>(5);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'json' | 'css' | 'txt'>('png');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadedImgRef = useRef<HTMLImageElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const analyzeImage = useCallback((img: HTMLImageElement, size: number) => {
    setIsAnalyzing(true);
    setErrorMsg(null);

    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          const result = extractColorsFromImage(img, size);
          setColors(result);
        } catch (err) {
          console.error(err);
          setErrorMsg('Failed to generate color palette from this image.');
        } finally {
          setIsAnalyzing(false);
        }
      }, 30);
    });
  }, []);

  const handleFile = useCallback((file: File) => {
    setErrorMsg(null);
    const check = validateImageFile(file);
    if (!check.valid) {
      setErrorMsg(check.error || 'Invalid file.');
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objUrl = URL.createObjectURL(file);
    objectUrlRef.current = objUrl;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    setIsAnalyzing(true);

    img.onload = () => {
      loadedImgRef.current = img;
      setImageSrc(objUrl);
      setMetadata({
        name: file.name,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        sizeBytes: file.size,
        sizeFormatted: formatBytes(file.size),
        type: file.type,
      });
      analyzeImage(img, paletteSize);
    };

    img.onerror = () => {
      setIsAnalyzing(false);
      setErrorMsg('Failed to load image file.');
    };

    img.src = objUrl;
  }, [paletteSize, analyzeImage]);

  const handleSizeChange = (size: 5 | 10) => {
    setPaletteSize(size);
    if (loadedImgRef.current) {
      analyzeImage(loadedImgRef.current, size);
    }
  };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setErrorMsg(null);
    setIsAnalyzing(true);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      loadedImgRef.current = img;
      setImageSrc(preset.url);
      setMetadata({
        name: `${preset.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        width: img.naturalWidth || 1920,
        height: img.naturalHeight || 1080,
        sizeBytes: 1200000,
        sizeFormatted: '1.2 MB',
        type: 'image/jpeg',
      });
      analyzeImage(img, paletteSize);
    };

    img.onerror = () => {
      setIsAnalyzing(false);
      setErrorMsg('Failed to load preset image.');
    };

    img.src = preset.url;
  };

  const handleReset = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    loadedImgRef.current = null;
    setImageSrc(null);
    setMetadata(null);
    setColors([]);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = async () => {
    if (colors.length === 0) return;
    setIsDownloading(true);
    try {
      await downloadPaletteAs(downloadFormat, colors, metadata);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyAll = async () => {
    if (colors.length === 0) return;
    const hexList = colors.map(c => c.hex).join(', ');
    try {
      await navigator.clipboard.writeText(hexList);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy Guarantee */}
      <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold">Local & Private:</strong> Uploaded images are processed client-side inside your browser and never uploaded to any remote server.
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          <span className="flex-1">{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-xs font-semibold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        id="palette-image-upload"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {!imageSrc ? (
        <div className="space-y-6">
          {/* Upload Drop Box */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`group flex flex-col items-center justify-center p-8 sm:p-14 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-200 text-center ${
              isDragging
                ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/30'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Upload Image for Color Palette
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
              Drag and drop your photo or <span className="text-blue-600 dark:text-blue-400 font-semibold underline">browse file</span> • Supports JPG, PNG, WebP, GIF, AVIF
            </p>
            <div className="text-xs text-slate-400 font-mono">Max 10 MB • Instant local generation</div>
          </div>

          {/* Quick Presets */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Or try with sample photography</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left cursor-pointer group"
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
                    <div className="text-[10px] text-slate-400 font-mono">Sample Image</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={metadata?.name || 'Uploaded Source'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {metadata?.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono">
                    {metadata?.width} × {metadata?.height} px • {metadata?.sizeFormatted}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Change Image</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Size selector: 5 colors or 10 colors */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Palette className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Palette Scheme Size:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSizeChange(5)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    paletteSize === 5
                      ? 'bg-blue-600 text-white shadow-xs scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  5 Dominant Colors
                </button>
                <button
                  type="button"
                  onClick={() => handleSizeChange(10)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    paletteSize === 10
                      ? 'bg-blue-600 text-white shadow-xs scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  10 Dominant Colors
                </button>
              </div>
            </div>
          </div>

          {isAnalyzing && (
            <div className="flex items-center justify-center gap-3 p-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 text-blue-700 dark:text-blue-300 animate-pulse">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-bold">Generating balanced color palette...</span>
            </div>
          )}

          {/* Full-width Palette Color Strip */}
          {colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Harmonious Palette Bar</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 cursor-pointer flex items-center gap-1.5"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : null}
                  <span>{copiedAll ? 'Copied All HEX!' : 'Copy All HEX'}</span>
                </button>
              </div>

              <div className="w-full h-20 sm:h-24 rounded-2xl overflow-hidden flex shadow-md border border-slate-200 dark:border-slate-800">
                {colors.map((c, i) => (
                  <Link
                    key={`${c.cleanHex}-${i}`}
                    href={`/hex/${c.cleanHex}`}
                    className="flex-1 h-full relative group transition-all duration-200 hover:flex-[1.5]"
                    style={{ backgroundColor: c.hex }}
                    title={`View #${c.cleanHex} (${c.name})`}
                  >
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs ${
                        c.isLight ? 'text-slate-900 bg-white/30' : 'text-white bg-black/30'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">{c.hex}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Export Bar */}
          {colors.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Export & Download Palette</h4>
                <p className="text-xs text-slate-500">Save as PNG graphic, CSS variables, JSON data, or TXT</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                  {(['png', 'css', 'json', 'txt'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setDownloadFormat(fmt)}
                      className={`px-3 py-1 text-xs font-semibold uppercase rounded-lg cursor-pointer ${
                        downloadFormat === fmt
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloading ? 'Saving...' : `Download ${downloadFormat.toUpperCase()}`}</span>
                </button>
              </div>
            </div>
          )}

          {/* Individual Color Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Palette Color Values ({colors.length} Colors)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {colors.map((c, idx) => (
                <div
                  key={`${c.cleanHex}-${idx}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div
                    className="h-28 p-3 flex flex-col justify-between"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md self-start ${
                        c.isLight ? 'bg-black/15 text-slate-900' : 'bg-white/20 text-white'
                      }`}
                    >
                      Color #{idx + 1}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md truncate self-start ${
                        c.isLight ? 'bg-black/15 text-slate-900' : 'bg-white/20 text-white'
                      }`}
                    >
                      {c.name}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{c.hex}</span>
                      <CopyButton textToCopy={c.hex} variant="ghost" size="sm" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-mono truncate max-w-[130px]">{c.rgbString}</span>
                      <CopyButton textToCopy={c.rgbString} variant="ghost" size="sm" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-mono truncate max-w-[130px]">{c.hslString}</span>
                      <CopyButton textToCopy={c.hslString} variant="ghost" size="sm" />
                    </div>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href={`/hex/${c.cleanHex}`}
                        className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
                      >
                        <span>Full Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
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
