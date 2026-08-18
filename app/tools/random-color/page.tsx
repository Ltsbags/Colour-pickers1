'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { getRandomHex, hexToRgb, isLightColor } from '@/lib/color-utils';
import { getClosestColorName } from '@/lib/color-names';
import { Shuffle, History, ArrowRight } from 'lucide-react';

export default function RandomColorPage() {
  const [currentHex, setCurrentHex] = useState('FF5733');
  const [history, setHistory] = useState<string[]>(['FF5733', '3B82F6', '10B981', '8B5CF6']);

  const handleGenerate = () => {
    const nextHex = getRandomHex();
    setCurrentHex(nextHex);
    setHistory(prev => [nextHex, ...prev.slice(0, 11)]);
  };

  const rgb = hexToRgb(currentHex);
  const name = getClosestColorName(currentHex).name;
  const isLight = isLightColor(rgb);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Random Color Generator' },
          ]}
        />

        <div className="my-6 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Random Color Generator
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Discover unique color inspiration with a single click.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Display Banner */}
        <div className="my-8 max-w-3xl mx-auto flex flex-col gap-6">
          <div
            className="w-full h-80 sm:h-96 rounded-3xl p-8 flex flex-col justify-between shadow-lg border border-black/10 transition-all duration-300"
            style={{ backgroundColor: `#${currentHex}` }}
          >
            <div className="flex justify-between items-start">
              <span
                className={`text-sm font-bold px-4 py-1.5 rounded-full border shadow-2xs backdrop-blur-md ${
                  isLight
                    ? 'bg-black/10 border-black/10 text-slate-900'
                    : 'bg-white/20 border-white/20 text-white'
                }`}
              >
                {name}
              </span>
              <CopyButton textToCopy={`#${currentHex}`} label={`#${currentHex}`} variant="badge" size="md" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <div className={`font-mono text-4xl sm:text-6xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  #{currentHex}
                </div>
                <div className={`text-sm font-semibold opacity-90 mt-1 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </div>
              </div>

              <Link
                href={`/hex/${currentHex}`}
                className="px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-xs transition-all"
              >
                Explore Details →
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <Shuffle className="w-5 h-5" />
            <span>Generate Next Random Color</span>
          </button>
        </div>

        {/* History Log */}
        <section className="my-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200 font-bold text-lg">
            <History className="w-5 h-5 text-blue-500" />
            <h2>Recently Generated History</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {history.map((hex, idx) => (
              <button
                key={idx + hex}
                onClick={() => setCurrentHex(hex)}
                className="flex flex-col p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer group text-left"
              >
                <div
                  className="w-full h-14 rounded-lg shadow-inner mb-2 border border-black/10 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: `#${hex}` }}
                />
                <span className="font-mono font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                  #{hex}
                </span>
              </button>
            ))}
          </div>
        </section>

        <AdSlot type="in-content" />
      </main>

      <Footer />
    </div>
  );
}
