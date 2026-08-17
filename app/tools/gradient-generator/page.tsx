'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { GRADIENT_PRESETS, generateGradientCss } from '@/lib/gradient-presets';
import { getRandomHex } from '@/lib/color-utils';
import { Sparkles, Plus, Trash2, RotateCw, Shuffle } from 'lucide-react';

export default function GradientGeneratorPage() {
  const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Array<{ id: string; color: string; position: number }>>([
    { id: '1', color: '#3B82F6', position: 0 },
    { id: '2', color: '#8B5CF6', position: 100 },
  ]);

  const cssCode = generateGradientCss({ type: gradientType, angle, stops });

  const handleAddStop = () => {
    if (stops.length >= 5) return;
    const newStop = {
      id: Date.now().toString(),
      color: `#${getRandomHex()}`,
      position: 50,
    };
    setStops([...stops, newStop].sort((a, b) => a.position - b.position));
  };

  const handleRemoveStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const handleStopChange = (id: string, key: 'color' | 'position', value: string | number) => {
    setStops(
      stops.map(s => (s.id === id ? { ...s, [key]: value } : s))
    );
  };

  const handleRandomize = () => {
    setStops([
      { id: '1', color: `#${getRandomHex()}`, position: 0 },
      { id: '2', color: `#${getRandomHex()}`, position: 100 },
    ]);
    setAngle(Math.floor(Math.random() * 360));
  };

  const handlePresetSelect = (preset: typeof GRADIENT_PRESETS[0]) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    setStops(
      preset.stops.map((s, idx) => ({
        id: idx.toString(),
        color: s.color,
        position: s.position,
      }))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Gradient Generator' },
          ]}
        />

        <div className="my-6 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            CSS Gradient Generator
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Create beautiful multi-stop linear, radial, and conic gradients with instant CSS & Tailwind export.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Generator Main Canvas & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Live Preview Stage */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div
              className="w-full h-80 sm:h-96 rounded-3xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 relative p-6 flex flex-col justify-between"
              style={{ background: cssCode }}
            >
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/30 backdrop-blur-md text-white border border-white/20">
                  {gradientType.toUpperCase()} ({angle}°)
                </span>
                <button
                  type="button"
                  onClick={handleRandomize}
                  className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-900 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Randomize</span>
                </button>
              </div>
            </div>

            {/* Generated Code Output */}
            <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 font-mono text-xs space-y-3">
              <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
                <span>CSS Output</span>
                <CopyButton textToCopy={`background: ${cssCode};`} label="Copy CSS" variant="ghost" size="sm" />
              </div>
              <code className="block break-all text-blue-300">
                background: {cssCode};
              </code>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Gradient Controls
            </h2>

            {/* Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                Gradient Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['linear', 'radial', 'conic'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setGradientType(type)}
                    className={`py-2 text-xs font-bold rounded-xl capitalize transition-all cursor-pointer ${
                      gradientType === type
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Angle Slider */}
            {gradientType !== 'radial' && (
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Angle</span>
                  <span className="font-mono">{angle}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={e => setAngle(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>
            )}

            {/* Color Stops List */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold uppercase text-slate-400">
                  Color Stops ({stops.length}/5)
                </label>
                {stops.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Stop</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {stops.map(stop => (
                  <div
                    key={stop.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                  >
                    <input
                      type="color"
                      value={stop.color}
                      onChange={e => handleStopChange(stop.id, 'color', e.target.value)}
                      className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={stop.color}
                      onChange={e => handleStopChange(stop.id, 'color', e.target.value)}
                      className="w-20 px-2 py-1 font-mono text-xs font-bold uppercase bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md"
                    />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={e =>
                        handleStopChange(stop.id, 'position', parseInt(e.target.value, 10))
                      }
                      className="flex-1 accent-blue-600"
                    />
                    <span className="font-mono text-xs w-8 text-right font-semibold">
                      {stop.position}%
                    </span>
                    {stops.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStop(stop.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Presets Library */}
        <section className="my-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Curated Gradient Presets
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GRADIENT_PRESETS.map(preset => {
              const presetCss = generateGradientCss(preset);
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className="group flex flex-col p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-blue-500 transition-all cursor-pointer"
                >
                  <div
                    className="w-full h-24 rounded-xl shadow-inner mb-2 group-hover:scale-[1.02] transition-transform"
                    style={{ background: presetCss }}
                  />
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {preset.name}
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize">{preset.category}</span>
                </button>
              );
            })}
          </div>
        </section>

        <AdSlot type="in-content" />
      </main>

      <Footer />
    </div>
  );
}
