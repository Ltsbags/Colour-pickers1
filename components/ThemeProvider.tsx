'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

let cachedTheme: Theme | null = null;

function readThemeFromStorage(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = (localStorage.getItem('colour-lab-theme') || localStorage.getItem('chroma-theme')) as Theme | null;
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Ignore
  }
  return 'light';
}

function getThemeSnapshot(): Theme {
  if (typeof window === 'undefined') return 'light';
  if (cachedTheme === null) {
    cachedTheme = readThemeFromStorage();
  }
  return cachedTheme;
}

function getServerThemeSnapshot(): Theme {
  return 'light';
}

function subscribeTheme(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = () => {
    cachedTheme = readThemeFromStorage();
    callback();
  };

  window.addEventListener('theme-changed', handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener('theme-changed', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    cachedTheme = newTheme;
    try {
      localStorage.setItem('colour-lab-theme', newTheme);
    } catch {
      // Ignore
    }
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('theme-changed'));
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
