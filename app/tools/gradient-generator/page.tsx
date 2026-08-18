'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { ToolSeoContent } from '@/components/ToolSeoContent';
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
            { label: 'Color Tools', href: '/tools' },
            { label: 'CSS Gradient Generator' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            CSS Gradient Generator & Background Maker
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Craft linear, radial, and conic CSS gradients with multi-color stop controls, angle dials, curated aesthetic presets, and instant clipboard CSS export.
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
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs flex flex-col gap-6">
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
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Angle Slider (for Linear/Conic) */}
            {gradientType !== 'radial' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Angle</label>
                  <span className="font-mono text-xs font-bold text-blue-600">{angle}°</span>
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

            {/* Color Stops Manager */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold uppercase text-slate-400">
                  Color Stops ({stops.length}/5)
                </label>
                {stops.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Stop
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {stops.map((stop, idx) => (
                  <div
                    key={stop.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                  >
                    <input
                      type="color"
                      value={stop.color}
                      onChange={e => handleStopChange(stop.id, 'color', e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
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

        {/* In-Depth SEO Landing Page Section */}
        <ToolSeoContent
          toolTitle="CSS Gradient Generator & Background Designer"
          toolSlug="gradient-generator"
          category="Design & CSS"
          overviewTitle="Mastering CSS Gradients: Linear, Radial & Conic"
          overviewParagraphs={[
            'CSS gradients allow developers and UI designers to create smooth color transitions between two or more colors without requiring heavy image assets. Because gradients are generated dynamically by the browser rendering engine, they scale cleanly across resolutions without bitmap image overhead.',
            'There are three primary types of CSS gradients: Linear gradients (smooth transitions along a straight directional line or angle), Radial gradients (transitions radiating outward from a central focal point or shape), and Conic gradients (transitions swept 360 degrees around a central axis, often used for color wheels and pie charts).',
            'Our interactive CSS Gradient Generator lets you customize multiple color stops, fine-tune degree angles, test real-time background previews, and immediately copy production-ready CSS and Tailwind code.',
          ]}
          howToSteps={[
            {
              step: 'Select Gradient Geometry',
              description: 'Choose between Linear, Radial, or Conic gradient projection styles.',
            },
            {
              step: 'Set Directional Angle',
              description: 'Use the 0°–360° angle slider to specify the flow direction of the linear or conic gradient.',
            },
            {
              step: 'Add & Adjust Color Stops',
              description: 'Add up to 5 color points, tweak hex colors, and drag stop positions along the 0%–100% spectrum.',
            },
            {
              step: 'Copy CSS background Code',
              description: 'Click "Copy CSS" to grab clean, cross-browser CSS code directly into your stylesheet.',
            },
          ]}
          features={[
            {
              title: 'Multi-Stop Color Interpolation',
              description: 'Blend up to 5 individual color stops for complex, modern mesh-like aesthetic gradients.',
            },
            {
              title: '360° Angle Dial',
              description: 'Set exact mathematical degree angles for standard diagonal, vertical, or horizontal gradients.',
            },
            {
              title: 'Curated Designer Presets',
              description: 'Includes handpicked trending color ramps (Sunset, Hyper, Ocean, Neon) for rapid prototyping.',
            },
            {
              title: 'One-Click Randomizer',
              description: 'Generate fresh harmonious color combinations with a single click or spacebar trigger.',
            },
            {
              title: 'Clean CSS Export',
              description: 'Generates standard, un-bloated background properties compatible with all modern browsers.',
            },
          ]}
          faqs={[
            {
              question: 'How do I use this gradient in Tailwind CSS?',
              answer: 'In Tailwind CSS v3+, you can use arbitrary values like `bg-[linear-gradient(135deg,#3B82F6_0%,#8B5CF6_100%)]` or create a reusable utility in your CSS file.',
            },
            {
              question: 'What is the performance impact of CSS gradients vs background images?',
              answer: 'CSS gradients avoid additional HTTP image requests, reducing page load times and Largest Contentful Paint (LCP) metrics compared to JPEG/PNG image assets.',
            },
            {
              question: 'Can I animate CSS gradients?',
              answer: 'While you cannot directly transition the `background-image` property smoothly in standard CSS, you can animate gradients by shifting `background-size` and `background-position`, or using CSS `@property` Houdini registration.',
            },
          ]}
          relatedTools={[
            {
              name: 'Color Palette Generator',
              href: '/tools/palette-generator',
              desc: 'Create complementary 5-color schemes to use as gradient stops.',
            },
            {
              name: 'Color Shades Generator',
              href: '/tools/color-shades-generator',
              desc: 'Generate monochromatic tints and shades for smooth ombre gradients.',
            },
            {
              name: 'HEX to RGB Converter',
              href: '/tools/hex-to-rgb',
              desc: 'Convert gradient hex colors into rgba() for opacity effects.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
