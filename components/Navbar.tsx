'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Palette,
  Search,
  Sliders,
  Sparkles,
  Layers,
  Pipette,
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
  const pathname = usePathname();

  const navLinks = [
    { href: '/tools/palette-generator', label: 'Palettes' },
    { href: '/tools', label: 'Colors' },
    { href: '/tools/converter', label: 'Converter' },
  ];

  const toolsList = [
    { href: '/tools/color-picker', label: 'HEX Color Picker', desc: 'Visual screen eyedropper & picker' },
    { href: '/tools/hex-to-rgb', label: 'RGB Converter', desc: 'Precision RGB color conversion' },
    { href: '/tools/hex-to-hsl', label: 'HSL Converter', desc: 'Hue, Saturation, Lightness values' },
    { href: '/tools/hex-to-hsv', label: 'HSV Converter', desc: 'Hue, Saturation, Value model' },
    { href: '/tools/hex-to-cmyk', label: 'CMYK Converter', desc: 'Print ready CMYK percentages' },
    { href: '/tools/gradient-generator', label: 'Gradient Generator', desc: 'CSS multi-stop linear & radial' },
    { href: '/tools/palette-generator', label: 'Palette Generator', desc: 'Harmonies & 5-color palettes' },
    { href: '/tools/color-contrast-checker', label: 'Contrast Checker', desc: 'WCAG 2.1 AA & AAA compliance' },
    { href: '/tools/color-shades-generator', label: 'Color Shades & Tints', desc: 'Shades, tints and tones scale' },
    { href: '/tools/color-names', label: 'Color Names Dictionary', desc: 'Search named shades & CSS names' },
    { href: '/tools/css-converter', label: 'CSS Color Converter', desc: 'CSS4, RGBA, HSLA, Tailwind & XML' },
    { href: '/tools/random-color', label: 'Random Color Generator', desc: 'Instant random color discovery' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/70 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-sm w-64 lg:w-80 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="flex-1 text-left truncate">Search color or HEX...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-400 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
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

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsToolsDropdownOpen(true)}
              onMouseLeave={() => setIsToolsDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <span>Tools</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isToolsDropdownOpen && (
                <div className="absolute right-0 top-full pt-1 w-80 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl grid grid-cols-1 gap-1">
                    {toolsList.map(t => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setIsToolsDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <div className="font-semibold text-slate-900 dark:text-white text-xs group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {t.label}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {t.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Actions & Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200"
              aria-label="Search colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <ThemeToggle />

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-1 py-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm ${
                    pathname === link.href
                      ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Color Tools
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {toolsList.map(t => (
                  <Link
                    key={t.href}
                    href={t.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-800/60"
                  >
                    <div className="font-semibold text-slate-900 dark:text-slate-200 text-xs">
                      {t.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
