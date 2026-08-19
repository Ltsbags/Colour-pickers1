'use client';

import { useSyncExternalStore, useCallback } from 'react';
import {
  ColorHistoryItem,
  DEFAULT_FALLBACK_ITEMS,
  getColorHistory,
  refreshColorHistoryCache,
  addToColorHistory as addColorHelper,
  removeFromColorHistory as removeColorHelper,
  clearColorHistory as clearColorHelper,
} from '@/lib/color-history';

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = () => {
    refreshColorHistoryCache();
    callback();
  };

  window.addEventListener('color-history-updated', handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener('color-history-updated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}

function getSnapshot(): ColorHistoryItem[] {
  return getColorHistory();
}

function getServerSnapshot(): ColorHistoryItem[] {
  return DEFAULT_FALLBACK_ITEMS;
}

export function useColorHistory() {
  const isClient = useIsClient();
  const history = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addColor = useCallback((hex: string, name?: string) => {
    addColorHelper(hex, name);
  }, []);

  const removeColor = useCallback((hex: string) => {
    removeColorHelper(hex);
  }, []);

  const clearHistory = useCallback(() => {
    clearColorHelper();
  }, []);

  return {
    history: isClient ? history : DEFAULT_FALLBACK_ITEMS,
    isLoaded: isClient,
    addColor,
    removeColor,
    clearHistory,
  };
}

