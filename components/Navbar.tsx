'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';
import { Logo } from './Logo';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isConvertersDropdownOpen, setIsConvertersDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/colors', label: 'Colors' },
    { href: '/palettes', label: 'Palettes' },
    { href: '/gradients', label: 'Gradients' },
    { href: '/guides', label: 'Guides' },
    { href: '/faq', label: 'FAQ' },
  ];

  const toolsList = [
    { href: '/tools/color-picker', label: 'HEX Color Picker', desc: 'Visual screen eyedropper & picker' },
    { href: '/tools/image-color-picker', label: 'Image Color Picker', desc: 'Extract colors & palettes from images' },
    { href: '/tools/gradient-generator', label: 'Gradient Generator', desc: 'CSS multi-stop linear & radial' },
    { href: '/tools/palette-generator', label: 'Palette Generator', desc: 'Harmonies & 5-color palettes' },
    { href: '/tools/color-contrast-checker', label: 'Contrast Checker', desc: 'WCAG 2.1 AA & AAA compliance' },
    { href: '/tools/color-mixer', label: 'Color Mixer', desc: 'Blend 2 colors across ratio percentages' },
    { href: '/tools/color-harmonies', label: 'Color Harmonies', desc: 'Complementary, triadic & analogous' },
    { href: '/tools/color-shades-generator', label: 'Shades & Tints', desc: 'Tonal lightness & darkness scales' },
    { href: '/tools/color-names', label: 'Color Names', desc: 'Search 150+ named CSS shades' },
  ];

  const convertersList = [
    { href: '/tools/converter', label: 'Universal Converter', desc: 'Matrix for all color formats' },
    { href: '/tools/hex-to-rgb', label: 'HEX to RGB', desc: '0–255 integer light channels' },
    { href: '/tools/hex-to-hsl', label: 'HEX to HSL', desc: 'Hue, Saturation, Lightness values' },
    { href: '/tools/hex-to-hsv', label: 'HEX to HSV', desc: 'Figma & Photoshop color model' },
    { href: '/tools/hex-to-cmyk', label: 'HEX to CMYK', desc: 'Print ink percentages' },
    { href: '/tools/css-converter', label: 'CSS & Tailwind', desc: 'Variables, RGBA, HSLA tokens' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/70 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-sm w-56 lg:w-72 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="flex-1 text-left truncate">Search color or HEX...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-400 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsToolsDropdownOpen(true)}
              onMouseLeave={() => setIsToolsDropdownOpen(false)}
            >
              <Link
                href="/tools"
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {isToolsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 grid grid-cols-1 gap-1">
                  {toolsList.map(t => (
                    <Link
                      key={t.href}
                      href={t.href}
                      onClick={() => setIsToolsDropdownOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors block"
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{t.label}</div>
                      <div className="text-[11px] text-slate-400">{t.desc}</div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href="/tools"
                      onClick={() => setIsToolsDropdownOpen(false)}
                      className="p-2 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline block"
                    >
                      View All Tools Directory →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Converters Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsConvertersDropdownOpen(true)}
              onMouseLeave={() => setIsConvertersDropdownOpen(false)}
            >
              <Link
                href="/converters"
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <span>Converters</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isConvertersDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {isConvertersDropdownOpen && (
                <div className="absolute top-full left-0 w-72 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 grid grid-cols-1 gap-1">
                  {convertersList.map(c => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setIsConvertersDropdownOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors block"
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{c.label}</div>
                      <div className="text-[11px] text-slate-400">{c.desc}</div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href="/converters"
                      onClick={() => setIsConvertersDropdownOpen(false)}
                      className="p-2 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline block"
                    >
                      All Converters Hub →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            {navLinks.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search colors"
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400 px-3 py-1">Main Sections</div>
              <Link
                href="/colors"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm text-slate-900 dark:text-white"
              >
                <span>Colors Directory</span>
              </Link>
              <Link
                href="/converters"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm text-slate-900 dark:text-white"
              >
                <span>Converters Suite</span>
              </Link>
              <Link
                href="/palettes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm text-slate-900 dark:text-white"
              >
                <span>Color Palettes</span>
              </Link>
              <Link
                href="/gradients"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm text-slate-900 dark:text-white"
              >
                <span>CSS Gradients</span>
              </Link>
              <Link
                href="/guides"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm text-slate-900 dark:text-white"
              >
                <span>Guides & Education</span>
              </Link>
            </div>

            <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[10px] font-bold uppercase text-slate-400 px-3 py-1">Popular Color Tools</div>
              {toolsList.map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <span>{tool.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
