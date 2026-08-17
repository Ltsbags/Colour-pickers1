'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { PALETTE_PRESETS } from '@/lib/palette-presets';
import { getRandomHex, isLightColor, hexToRgb } from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { Lock, Unlock, Shuffle, Share2, Layers, Download, Check } from 'lucide-react';

interface ColorSlot {
  hex: string; // "3B82F6"
  locked: boolean;
}

export default function PaletteGeneratorPage() {
  const [slots, setSlots] = useState<ColorSlot[]>([
    { hex: '0F172A', locked: false },
    { hex: '1E293B', locked: false },
    { hex: '3B82F6', locked: false },
    { hex: '60A5FA', locked: false },
    { hex: 'F8FAFC', locked: false },
  ]);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const generateNewPalette = React.useCallback(() => {
    setSlots(prevSlots =>
      prevSlots.map(slot => (slot.locked ? slot : { ...slot, hex: getRandomHex() }))
    );
  }, []);

  // Spacebar keyboard listener to generate palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generateNewPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateNewPalette]);

  const toggleLock = (index: number) => {
    setSlots(
      slots.map((slot, i) => (i === index ? { ...slot, locked: !slot.locked } : slot))
    );
  };

  const handleColorChange = (index: number, newHex: string) => {
    const clean = newHex.replace('#', '').toUpperCase();
    setSlots(slots.map((slot, i) => (i === index ? { ...slot, hex: clean } : slot)));
  };

  const handleShareUrl = async () => {
    const hexCodes = slots.map(s => s.hex).join('-');
    const url = `${window.location.origin}/tools/palette-generator?palette=${hexCodes}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // Fallback
    }
  };

  const cssExport = slots.map((s, i) => `--color-${i + 1}: #${s.hex};`).join('\n');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Color Palette Generator' },
          ]}
        />

        <div className="my-6 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            5-Color Palette Generator
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Press <kbd className="px-2 py-0.5 font-mono text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded shadow-2xs">SPACEBAR</kbd> to generate harmonious color schemes. Lock colors you love.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Toolbar Header */}
        <div className="my-6 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-4 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={generateNewPalette}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Generate (Space)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareUrl}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'URL Copied!' : 'Share Palette'}</span>
            </button>

            <CopyButton textToCopy={cssExport} label="Copy CSS Vars" variant="badge" size="sm" />
          </div>
        </div>

        {/* Palette Columns Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-[480px] sm:h-[520px] my-6">
          {slots.map((slot, index) => {
            const rgb = hexToRgb(slot.hex);
            const isLight = isLightColor(rgb);
            const name = getClosestColorName(slot.hex).name;

            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between p-4 rounded-2xl shadow-md border border-black/10 transition-all duration-300"
                style={{ backgroundColor: `#${slot.hex}` }}
              >
                {/* Lock Action Button */}
                <div className="flex justify-between items-start">
                  <button
                    type="button"
                    onClick={() => toggleLock(index)}
                    className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                      isLight
                        ? 'bg-black/10 text-slate-900 hover:bg-black/20'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    title={slot.locked ? 'Unlock color' : 'Lock color'}
                  >
                    {slot.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>

                  <input
                    type="color"
                    value={`#${slot.hex}`}
                    onChange={e => handleColorChange(index, e.target.value)}
                    className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                  />
                </div>

                {/* Color Details & Link */}
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-xs font-semibold truncate ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {name}
                  </span>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/hex/${slot.hex}`}
                      className={`font-mono text-xl sm:text-2xl font-extrabold tracking-tight hover:underline ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      #{slot.hex}
                    </Link>
                    <CopyButton
                      textToCopy={`#${slot.hex}`}
                      label=""
                      variant="ghost"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curated Presets */}
        <section className="my-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Curated Color Palettes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {PALETTE_PRESETS.map(preset => (
              <div
                key={preset.id}
                onClick={() =>
                  setSlots(
                    preset.colors.map(c => ({
                      hex: c.replace('#', '').toUpperCase(),
                      locked: false,
                    }))
                  )
                }
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-blue-500 transition-all cursor-pointer group"
              >
                <div className="flex h-16 rounded-xl overflow-hidden mb-3 border border-black/10">
                  {preset.colors.map((c, i) => (
                    <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-400 capitalize">{preset.category}</div>
              </div>
            ))}
          </div>
        </section>

        <AdSlot type="in-content" />
      </main>

      <Footer />
    </div>
  );
}
