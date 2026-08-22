'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CopyButton } from '@/components/CopyButton';
import { COLOR_NAMES, ColorNameEntry } from '@/lib/color-names';
import { hexToRgb } from '@/lib/color-utils';
import {
  Search,
  Palette,
  Sparkles,
  Filter,
  ArrowUpDown,
  Sliders,
} from 'lucide-react';
import Link from 'next/link';
import { ToolSeoContent } from '@/components/ToolSeoContent';

export default function ColorNamesDictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'hex'>('name');

  const categories = ['All', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Brown', 'Neutral'];

  const filteredColors = useMemo(() => {
    return COLOR_NAMES.filter(color => {
      const matchesSearch =
        color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.hex.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'All' || color.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.hex.localeCompare(b.hex);
    });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Color Tools', href: '/tools' },
            { label: 'Color Names Dictionary' },
          ]}
        />

        <div className="my-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Color Names Dictionary & Reference
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Browse through named shades, standard W3C CSS / HTML color names, and curated hex swatches with interactive search and one-click copy.
          </p>
        </div>

        <AdSlot type="header" />

        {/* Filter & Search Toolbar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs my-6 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search color by name (e.g. Crimson, Teal, Orchid) or hex (#FF5733)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'name' | 'hex')}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="hex">HEX Code</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories Pill Selector */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between my-4 text-xs text-slate-500">
          <span>Showing <strong>{filteredColors.length}</strong> colors</span>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 my-6">
          {filteredColors.map((color, index) => {
            const rgb = hexToRgb(color.hex);
            const isDark = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 < 128;

            return (
              <div
                key={`${color.hex}-${index}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-md transition-all hover:scale-[1.02]"
              >
                <div
                  className="h-28 w-full flex items-center justify-center relative transition-transform"
                  style={{ backgroundColor: `#${color.hex}` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton textToCopy={`#${color.hex}`} />
                  </div>
                </div>

                <div className="p-3 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {color.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <Link
                        href={`/hex/${color.hex}`}
                        className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        #{color.hex}
                      </Link>
                      {color.category && (
                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          {color.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>RGB({rgb.r}, {rgb.g}, {rgb.b})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <AdSlot type="in-content" />

        {/* In-Depth SEO Landing Page Content */}
        <ToolSeoContent
          toolTitle="Color Names Dictionary & Standard HTML/CSS Reference"
          toolSlug="color-names"
          category="Color Reference & Taxonomy"
          overviewTitle="The Comprehensive Guide to Named Colors in Design & Web Standards"
          overviewParagraphs={[
            'Throughout design history, human beings have assigned evocative names to colors—from earthy natural pigments like Ochre and Umber to modern CSS named keywords like Crimson, RebeccaPurple, and AliceBlue.',
            'In web browsers, the W3C CSS specification recognizes 140+ official named colors that can be declared directly in stylesheets without requiring hexadecimal (#) or rgb() numerical codes. In addition, design libraries categorize thousands of distinct shades into memorable color families.',
            'Our Color Names Dictionary lets you search by name or hex code, filter across color families (Red, Blue, Emerald, Neutral, Pastel), sort alphabetically, and copy verified hexadecimal codes and RGB triplets for web development.',
          ]}
          howToSteps={[
            {
              step: 'Search by Keyword or Hex',
              description: 'Type any color name keyword (e.g. "coral", "slate", "royal") or partial hex fragment.',
            },
            {
              step: 'Filter by Color Family',
              description: 'Click category pills (Red, Orange, Green, Blue, Purple, Neutral) to isolate specific spectrums.',
            },
            {
              step: 'Sort & Compare Swatches',
              description: 'Toggle sorting between alphabetical color names and ascending hexadecimal values.',
            },
            {
              step: 'Copy or Deep Dive into Specs',
              description: 'Hover over swatches to copy exact hex values or click through to full RGB/HSL/CMYK profiles.',
            },
          ]}
          features={[
            {
              title: 'Curated 150+ Standard & Extended Names',
              description: 'Includes standard CSS3/CSS4 keyword colors plus curated modern UI naming references.',
            },
            {
              title: 'Real-Time Search Filter',
              description: 'Fast client-side filtering across color names and hexadecimal values.',
            },
            {
              title: 'Family Spectrum Categorization',
              description: 'Organized into 10 primary intuitive tonal families for easy discovery.',
            },
            {
              title: 'One-Click Clipboard Copying',
              description: 'Copy standard #RRGGBB tokens directly to clipboard with visual confirmation.',
            },
            {
              title: 'Deep Conversion Links',
              description: 'Direct links to individual hex color pages with full contrast, CMYK, and tint breakdowns.',
            },
          ]}
          comparisonTable={{
            headers: ['Color Family', 'Representative Name', 'Hex Code', 'RGB Equivalent'],
            rows: [
              ['Red', 'Crimson', '#DC143C', 'rgb(220, 20, 60)'],
              ['Blue', 'Royal Blue', '#4169E1', 'rgb(65, 105, 225)'],
              ['Green', 'Sea Green', '#2E8B57', 'rgb(46, 139, 87)'],
              ['Orange', 'Coral', '#FF7F50', 'rgb(255, 127, 80)'],
              ['Purple', 'Rebecca Purple', '#663399', 'rgb(102, 51, 153)'],
            ],
          }}
          faqs={[
            {
              question: 'Are CSS color names case-sensitive?',
              answer: 'No. CSS color names are case-insensitive. `crimson`, `Crimson`, and `CRIMSON` are parsed identically by all standard web browsers.',
            },
            {
              question: 'How many named colors are supported natively in HTML/CSS?',
              answer: 'The modern CSS Color specification natively supports 148 color names (147 unique named colors plus `transparent`).',
            },
            {
              question: 'Why was "rebeccapurple" added to CSS?',
              answer: '`rebeccapurple` (#663399) was added to CSS Color Module Level 4 in honor of Rebecca Alison Meyer, daughter of CSS pioneer Eric Meyer, to memorialize her after her passing on her sixth birthday.',
            },
          ]}
          relatedTools={[
            {
              name: 'HEX Color Picker',
              href: '/tools/color-picker',
              desc: 'Pick any arbitrary color and discover its nearest named shade.',
            },
            {
              name: 'Color Palette Generator',
              href: '/tools/palette-generator',
              desc: 'Assemble named colors into harmonious 5-shade design palettes.',
            },
            {
              name: 'HEX to RGB Converter',
              href: '/tools/hex-to-rgb',
              desc: 'Convert any named hex code into precise RGB integer channels.',
            },
          ]}
        />

        <AdSlot type="footer" />
      </main>

      <Footer />
    </div>
  );
}
