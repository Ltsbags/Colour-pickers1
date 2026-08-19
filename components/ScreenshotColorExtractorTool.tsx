'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CopyButton } from './CopyButton';
import {
  ExtractedColor,
  ScreenshotUiPalette,
  ImageMetadata,
  validateImageFile,
  formatBytes,
  extractScreenshotUiColors,
  downloadPaletteAs,
} from '@/lib/image-color-extractor';
import {
  Upload,
  Sparkles,
  ShieldCheck,
  Download,
  Trash2,
  RefreshCw,
  Info,
  ArrowRight,
  AlertCircle,
  Layout,
  Type,
  Check,
} from 'lucide-react';

const SAMPLE_SCREENSHOTS = [
  {
    name: 'SaaS Dashboard UI',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    dimensions: '1920 × 1080',
  },
  {
    name: 'Dark Mode App UI',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    dimensions: '1600 × 1066',
  },
  {
    name: 'E-commerce Store UI',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    dimensions: '1800 × 1200',
  },
];

export function ScreenshotColorExtractorTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [uiPalette, setUiPalette] = useState<ScreenshotUiPalette | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'json' | 'css' | 'txt'>('png');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

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

  const analyzeScreenshot = useCallback((img: HTMLImageElement) => {
    setIsAnalyzing(true);
    setErrorMsg(null);

    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          const result = extractScreenshotUiColors(img);
          setUiPalette(result);
        } catch (err) {
          console.error(err);
          setErrorMsg('Failed to analyze website screenshot colors.');
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
      setErrorMsg(check.error || 'Invalid image file.');
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
      analyzeScreenshot(img);
    };

    img.onerror = () => {
      setIsAnalyzing(false);
      setErrorMsg('Failed to read image file.');
    };

    img.src = objUrl;
  }, [analyzeScreenshot]);

  const handlePreset = (preset: typeof SAMPLE_SCREENSHOTS[0]) => {
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
      analyzeScreenshot(img);
    };

    img.onerror = () => {
      setIsAnalyzing(false);
      setErrorMsg('Failed to load sample screenshot.');
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
    setUiPalette(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = async () => {
    if (!uiPalette || uiPalette.allColors.length === 0) return;
    setIsDownloading(true);
    try {
      await downloadPaletteAs(downloadFormat, uiPalette.allColors, metadata);
    } finally {
      setIsDownloading(false);
    }
  };

  const uiSections = [
    { label: 'Primary Brand Color', key: 'primary', role: 'Main buttons, active tabs, brand logo accent', color: uiPalette?.primary },
    { label: 'Secondary Brand Color', key: 'secondary', role: 'Sub-navigation, secondary buttons, badges', color: uiPalette?.secondary },
    { label: 'Background Canvas', key: 'background', role: 'Main page background surface', color: uiPalette?.background },
    { label: 'Surface / Alternate Background', key: 'backgroundAlt', role: 'Cards, sidebars, container panels', color: uiPalette?.backgroundAlt },
    { label: 'Text & Headings', key: 'textColor', role: 'High-contrast typography and paragraph text', color: uiPalette?.textColor },
    { label: 'Accent / CTA Color', key: 'accent', role: 'Vibrant highlight tags, callouts, notifications', color: uiPalette?.accent },
  ];

  return (
    <div className="space-y-8">
      {/* Privacy Notice */}
      <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold">Client-Side Privacy:</strong> Screenshots are analyzed locally in your web browser. No screenshots are saved or uploaded to our servers.
        </p>
      </div>

      {/* Approximation Notice */}
      <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 text-blue-900 dark:text-blue-200 text-xs sm:text-sm">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
        <p className="leading-relaxed">
          <strong>Note:</strong> Extracted UI colors are automated approximations computed from pixel clustering across the uploaded screenshot.
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
        id="screenshot-file-upload"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />

      {!imageSrc ? (
        <div className="space-y-6">
          {/* Upload Drop Zone */}
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
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layout className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Upload Website Screenshot
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
              Drag & drop a website UI capture or <span className="text-blue-600 dark:text-blue-400 font-semibold underline">click to browse</span> • Supports clipboard paste (Ctrl+V / ⌘V)
            </p>
            <div className="text-xs text-slate-400 font-mono">PNG, JPG, WebP • Max 10 MB</div>
          </div>

          {/* Sample Screenshots */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Or try with sample UI screenshots</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_SCREENSHOTS.map((preset) => (
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
                    <div className="text-[10px] text-slate-400 font-mono">Sample Screenshot</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={metadata?.name || 'Screenshot'}
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
                <span>Upload Different Screenshot</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {isAnalyzing && (
            <div className="flex items-center justify-center gap-3 p-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 text-blue-700 dark:text-blue-300 animate-pulse">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-bold">Classifying UI design roles and color schemes...</span>
            </div>
          )}

          {/* Categorized UI Colors Grid */}
          {uiPalette && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Classified UI Color Roles
                  </h3>
                  <p className="text-xs text-slate-500">
                    Detected primary, secondary, canvas, typography, and accent tokens
                  </p>
                </div>

                {/* Export Dropdown */}
                <div className="flex items-center gap-2">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {uiSections.map((sec) => {
                  const c = sec.color;
                  if (!c) return null;
                  return (
                    <div
                      key={sec.key}
                      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
                    >
                      <div
                        className="h-32 p-4 flex flex-col justify-between"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md self-start ${
                            c.isLight ? 'bg-black/15 text-slate-900' : 'bg-white/20 text-white'
                          }`}
                        >
                          {sec.label}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md self-start truncate ${
                            c.isLight ? 'bg-black/15 text-slate-900' : 'bg-white/20 text-white'
                          }`}
                        >
                          {c.name}
                        </span>
                      </div>

                      <div className="p-4 space-y-2.5 text-xs">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {sec.role}
                        </p>

                        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{c.hex}</span>
                          <CopyButton textToCopy={c.hex} variant="ghost" size="sm" />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate max-w-[170px]">{c.rgbString}</span>
                          <CopyButton textToCopy={c.rgbString} variant="ghost" size="sm" />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate max-w-[170px]">{c.hslString}</span>
                          <CopyButton textToCopy={c.hslString} variant="ghost" size="sm" />
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <Link
                            href={`/hex/${c.cleanHex}`}
                            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <span>Inspect Hex</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
