import { normalizeHex, isValidHex } from './color-utils';
import { getClosestColorName } from './color-names';
import { RECENT_COLORS_DEFAULT } from './popular-colors';

export const COLOR_HISTORY_STORAGE_KEY = 'color_pickers_history';
export const MAX_HISTORY_ITEMS = 10;

export interface ColorHistoryItem {
  hex: string; // 6-char uppercase hex without '#'
  name: string;
  timestamp: number;
}

export const DEFAULT_FALLBACK_ITEMS: ColorHistoryItem[] = RECENT_COLORS_DEFAULT.slice(0, MAX_HISTORY_ITEMS).map((hex, idx) => ({
  hex: hex.toUpperCase(),
  name: getClosestColorName(hex).name,
  timestamp: 1700000000000 + idx,
}));

let memoryCache: ColorHistoryItem[] | null = null;

function readFromStorage(): ColorHistoryItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_FALLBACK_ITEMS;
  }

  try {
    const raw = localStorage.getItem(COLOR_HISTORY_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_FALLBACK_ITEMS;
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const validItems: ColorHistoryItem[] = [];
      for (const item of parsed) {
        if (typeof item === 'string') {
          const clean = item.replace('#', '').toUpperCase();
          if (isValidHex(clean)) {
            const normalized = normalizeHex(clean);
            validItems.push({
              hex: normalized,
              name: getClosestColorName(normalized).name,
              timestamp: 0,
            });
          }
        } else if (item && typeof item === 'object' && item.hex) {
          const clean = String(item.hex).replace('#', '').toUpperCase();
          if (isValidHex(clean)) {
            const normalized = normalizeHex(clean);
            validItems.push({
              hex: normalized,
              name: typeof item.name === 'string' && item.name ? item.name : getClosestColorName(normalized).name,
              timestamp: typeof item.timestamp === 'number' ? item.timestamp : 0,
            });
          }
        }
      }
      return validItems.slice(0, MAX_HISTORY_ITEMS);
    }
  } catch (err) {
    console.error('Failed to read color history from localStorage', err);
  }

  return DEFAULT_FALLBACK_ITEMS;
}

/**
 * Returns a stable cached snapshot of history for useSyncExternalStore
 */
export function getColorHistory(): ColorHistoryItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_FALLBACK_ITEMS;
  }
  if (memoryCache === null) {
    memoryCache = readFromStorage();
  }
  return memoryCache;
}

/**
 * Invalidate and re-read cache
 */
export function refreshColorHistoryCache(): ColorHistoryItem[] {
  memoryCache = readFromStorage();
  return memoryCache;
}

/**
 * Add a color to the global history and notify subscribers
 */
export function addToColorHistory(hexInput: string, customName?: string): ColorHistoryItem[] {
  if (!hexInput) return getColorHistory();

  const clean = hexInput.replace('#', '').trim();
  if (!isValidHex(clean)) return getColorHistory();

  const normalized = normalizeHex(clean);
  const colorName = customName || getClosestColorName(normalized).name;
  const newItem: ColorHistoryItem = {
    hex: normalized,
    name: colorName,
    timestamp: Date.now(),
  };

  if (typeof window === 'undefined') {
    return [newItem];
  }

  try {
    const current = getColorHistory();
    const filtered = current.filter(item => item.hex.toUpperCase() !== normalized.toUpperCase());
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

    memoryCache = updated;
    localStorage.setItem(COLOR_HISTORY_STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent('color-history-updated', {
        detail: updated,
      })
    );

    return updated;
  } catch (err) {
    console.error('Failed to save color history to localStorage', err);
    return memoryCache || DEFAULT_FALLBACK_ITEMS;
  }
}

/**
 * Remove a specific color by hex code from history
 */
export function removeFromColorHistory(hexInput: string): ColorHistoryItem[] {
  if (typeof window === 'undefined') return [];

  const clean = hexInput.replace('#', '').toUpperCase();
  try {
    const current = getColorHistory();
    const updated = current.filter(item => item.hex.toUpperCase() !== clean);

    memoryCache = updated;
    localStorage.setItem(COLOR_HISTORY_STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent('color-history-updated', {
        detail: updated,
      })
    );

    return updated;
  } catch (err) {
    console.error('Failed to remove item from color history', err);
    return memoryCache || [];
  }
}

/**
 * Clear all color history
 */
export function clearColorHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    memoryCache = [];
    localStorage.setItem(COLOR_HISTORY_STORAGE_KEY, JSON.stringify([]));

    window.dispatchEvent(
      new CustomEvent('color-history-updated', {
        detail: [],
      })
    );
  } catch (err) {
    console.error('Failed to clear color history', err);
  }
}
