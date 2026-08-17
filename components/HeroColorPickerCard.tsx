'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { hsvToRgb, rgbToHex, hexToRgb, rgbToHsv, normalizeHex } from '@/lib/color-utils';

interface HeroColorPickerCardProps {
  currentHex: string;
  onColorChange: (hex: string) => void;
}

export function HeroColorPickerCard({
  currentHex,
  onColorChange,
}: HeroColorPickerCardProps) {
  const [hsv, setHsv] = useState({ h: 217, s: 76, v: 96 }); // Default blue #3B82F6
  const [isCopied, setIsCopied] = useState(false);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const hueBarRef = useRef<HTMLDivElement>(null);

  // Sync internal HSV when currentHex prop changes externally
  const lastEmittedHexRef = useRef('');

  useEffect(() => {
    if (currentHex && currentHex.toUpperCase() !== lastEmittedHexRef.current.toUpperCase()) {
      const clean = normalizeHex(currentHex);
      const rgb = hexToRgb(clean);
      setHsv(rgbToHsv(rgb));
    }
  }, [currentHex]);

  const hsvRef = useRef(hsv);
  useEffect(() => {
    hsvRef.current = hsv;
  }, [hsv]);

  // Update color calculation
  const updateHsv = useCallback(
    (newHsv: { h: number; s: number; v: number }) => {
      setHsv(newHsv);
      const rgb = hsvToRgb(newHsv);
      const hex = rgbToHex(rgb);
      lastEmittedHexRef.current = hex;
      onColorChange(hex);
    },
    [onColorChange]
  );

  // Handle Saturation / Value Canvas Mouse/Touch
  const handleCanvasPointer = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

      const s = Math.round((x / rect.width) * 100);
      const v = Math.round((1 - y / rect.height) * 100);

      updateHsv({ ...hsvRef.current, s, v });
    },
    [updateHsv]
  );

  // Handle Hue Slider Mouse/Touch
  const handleHuePointer = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!hueBarRef.current) return;
      const rect = hueBarRef.current.getBoundingClientRect();
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

      const h = Math.round((y / rect.height) * 360);
      updateHsv({ ...hsvRef.current, h: h >= 360 ? 359 : h });
    },
    [updateHsv]
  );

  // Dragging event listeners for window
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDraggingCanvas) {
        handleCanvasPointer(e);
      } else if (isDraggingHue) {
        handleHuePointer(e);
      }
    };

    const handlePointerUp = () => {
      setIsDraggingCanvas(false);
      setIsDraggingHue(false);
    };

    if (isDraggingCanvas || isDraggingHue) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingCanvas, isDraggingHue, handleCanvasPointer, handleHuePointer]);

  const activeRgb = hsvToRgb(hsv);
  const activeHex = rgbToHex(activeRgb);

  // Background hue color for the 2D picker gradient
  const pureHueRgb = hsvToRgb({ h: hsv.h, s: 100, v: 100 });
  const pureHueHex = rgbToHex(pureHueRgb);

  const handleCopyHex = async () => {
    try {
      await navigator.clipboard.writeText(`#${activeHex}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Swatch presets matching screenshot layout
  const monochromeSwatches = [
    { hex: '000000' },
    { hex: '333333' },
    { hex: '666666' },
    { hex: '999999' },
    { hex: 'CCCCCC' },
    { hex: 'E5E7EB' },
    { hex: 'FFFFFF' },
  ];

  const colorSwatches = [
    { hex: 'FF3B30' }, // Red
    { hex: '78350F' }, // Warm Brown / Terracotta
    { hex: 'D97706' }, // Gold / Orange
    { hex: '84CC16' }, // Lime Green
    { hex: '0284C7' }, // Blue
    { hex: '312E81' }, // Indigo / Dark Purple
    { hex: 'C026D3' }, // Pink / Magenta
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
      {/* 2D Canvas & Rainbow Hue Bar Container */}
      <div className="flex gap-3 h-52 sm:h-60 select-none">
        {/* Saturation/Value 2D Gradient Canvas */}
        <div
          ref={canvasRef}
          onPointerDown={e => {
            setIsDraggingCanvas(true);
            handleCanvasPointer(e);
          }}
          className="relative flex-1 rounded-2xl cursor-crosshair overflow-hidden shadow-inner border border-black/5"
          style={{ backgroundColor: `#${pureHueHex}` }}
        >
          {/* White to transparent horizontal gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
          {/* Transparent to black vertical gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

          {/* Selector Pointer Circle */}
          <div
            className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-2 border-white shadow-md pointer-events-none transition-transform duration-75"
            style={{
              left: `${hsv.s}%`,
              top: `${100 - hsv.v}%`,
              backgroundColor: `#${activeHex}`,
            }}
          />
        </div>

        {/* Rainbow Vertical Hue Bar */}
        <div
          ref={hueBarRef}
          onPointerDown={e => {
            setIsDraggingHue(true);
            handleHuePointer(e);
          }}
          className="relative w-7 h-full rounded-2xl cursor-pointer overflow-hidden shadow-inner border border-black/5 shrink-0"
          style={{
            background:
              'linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
          }}
        >
          {/* Hue Pointer Ring Thumb */}
          <div
            className="absolute left-0 right-0 w-6 h-6 -ml-0.5 -mt-3 rounded-full border-2 border-white shadow-lg pointer-events-none"
            style={{
              top: `${(hsv.h / 360) * 100}%`,
              backgroundColor: `#${pureHueHex}`,
            }}
          />
        </div>
      </div>

      {/* Hex Output Box */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center justify-center px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl text-center font-mono font-bold text-slate-900 dark:text-white text-base shadow-2xs">
          #{activeHex}
        </div>
        <button
          type="button"
          onClick={handleCopyHex}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          title="Copy HEX Code"
        >
          {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Swatch Presets Grid */}
      <div className="space-y-2 pt-1">
        {/* Row 1: Monochrome */}
        <div className="grid grid-cols-7 gap-2">
          {monochromeSwatches.map(swatch => {
            const isActive = activeHex.toUpperCase() === swatch.hex.toUpperCase();
            return (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => {
                  const rgb = hexToRgb(swatch.hex);
                  updateHsv(rgbToHsv(rgb));
                }}
                className={`h-8 rounded-lg border transition-all cursor-pointer relative flex items-center justify-center ${
                  swatch.hex === 'FFFFFF'
                    ? 'border-slate-300 dark:border-slate-600'
                    : 'border-transparent'
                } ${isActive ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : 'hover:scale-105'}`}
                style={{ backgroundColor: `#${swatch.hex}` }}
              >
                {isActive && (
                  <Check
                    className={`w-4 h-4 ${
                      swatch.hex === 'FFFFFF' || swatch.hex === 'E5E7EB'
                        ? 'text-slate-900'
                        : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Row 2: Vivid Colors */}
        <div className="grid grid-cols-7 gap-2">
          {colorSwatches.map(swatch => {
            const isActive = activeHex.toUpperCase() === swatch.hex.toUpperCase();
            return (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => {
                  const rgb = hexToRgb(swatch.hex);
                  updateHsv(rgbToHsv(rgb));
                }}
                className={`h-8 rounded-lg transition-all cursor-pointer relative flex items-center justify-center ${
                  isActive ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: `#${swatch.hex}` }}
              >
                {isActive && <Check className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
