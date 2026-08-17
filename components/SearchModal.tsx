'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Palette, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchColorNames, COLOR_NAMES } from '@/lib/color-names';
import { normalizeHex, isValidHex, hexToRgb, rgbToHex } from '@/lib/color-utils';
import { addToColorHistory } from '@/lib/color-history';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  // Keyboard navigation & trigger modal with Cmd+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open signal can be handled at layout level or trigger callback
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Process search query
  let parsedHex = '';
  if (query.trim()) {
    const raw = query.trim().replace(/^#/, '');
    if (isValidHex(raw)) {
      parsedHex = normalizeHex(raw);
    } else {
      // Check rgb format e.g. rgb(255, 87, 51)
      const rgbMatch = query.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1], 10);
        const g = parseInt(rgbMatch[2], 10);
        const b = parseInt(rgbMatch[3], 10);
        if (r <= 255 && g <= 255 && b <= 255) {
          parsedHex = rgbToHex({ r, g, b });
        }
      }
    }
  }

  const nameResults = searchColorNames(query, 8);

  const handleSelect = (hexCode: string, name?: string) => {
    const clean = hexCode.replace('#', '');
    addToColorHistory(clean, name);
    handleClose();
    router.push(`/hex/${clean}`);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (parsedHex) {
        handleSelect(parsedHex);
      } else if (nameResults.length > 0) {
        const safeIdx = ((selectedIndex % nameResults.length) + nameResults.length) % nameResults.length;
        const item = nameResults[safeIdx];
        if (item?.hex) {
          handleSelect(item.hex, item.name);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (nameResults.length > 0) {
        setSelectedIndex(prev => (prev + 1) % nameResults.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (nameResults.length > 0) {
        setSelectedIndex(prev => (prev - 1 + nameResults.length) % nameResults.length);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInput}
            placeholder="Search by HEX (#FF5733), RGB (255, 87, 51), or Name (Coral)..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none text-base sm:text-lg font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800">
          {/* Direct HEX Match Preview */}
          {parsedHex && (
            <div className="pb-3 mb-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                Exact Color Code Match
              </div>
              <button
                onClick={() => handleSelect(parsedHex)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 hover:border-blue-500 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg shadow-inner border border-black/10 shrink-0"
                    style={{ backgroundColor: `#${parsedHex}` }}
                  />
                  <div>
                    <div className="font-mono font-bold text-slate-900 dark:text-white text-base">
                      #{parsedHex}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      RGB: {hexToRgb(parsedHex).r}, {hexToRgb(parsedHex).g},{' '}
                      {hexToRgb(parsedHex).b}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          )}

          {/* Color Name Search Results */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
              {query ? 'Color Name Matches' : 'Popular Color Names'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {nameResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.hex + item.name}
                    onClick={() => handleSelect(item.hex, item.name)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-slate-800/90 ring-1 ring-slate-300 dark:ring-slate-700'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-md shadow-xs border border-black/10 shrink-0"
                      style={{ backgroundColor: `#${item.hex}` }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
                        {item.name}
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        #{item.hex}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono">
                ↓
              </kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono">
                <CornerDownLeft className="w-2.5 h-2.5 inline" />
              </kbd>
              <span>Select</span>
            </span>
          </div>
          <span className="text-slate-400">Fast Sub-Millisecond Color Engine</span>
        </div>
      </div>
    </div>
  );
}
