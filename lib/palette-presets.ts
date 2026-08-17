// Curated Color Palettes for Palette Generator Tool

export interface PalettePreset {
  id: string;
  name: string;
  category: 'SaaS' | 'Brand' | 'Retro' | 'Nature' | 'Dark' | 'Minimal';
  colors: string[]; // array of 5 hex codes e.g. ["#1E293B", ...]
}

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    id: 'modern-saas',
    name: 'Modern SaaS UI',
    category: 'SaaS',
    colors: ['#0F172A', '#1E293B', '#3B82F6', '#60A5FA', '#F8FAFC'],
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Horizon',
    category: 'Nature',
    colors: ['#2D00F7', '#6B00F7', '#A100F7', '#F700A1', '#FF70A6'],
  },
  {
    id: 'nordic-frost',
    name: 'Nordic Frost',
    category: 'Minimal',
    colors: ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429'],
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    category: 'Nature',
    colors: ['#064E3B', '#047857', '#10B981', '#6EE7B7', '#ECFDF5'],
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    category: 'Retro',
    colors: ['#0D0221', '#0F52BA', '#00F5D4', '#7B2CBF', '#F72585'],
  },
  {
    id: 'warm-sand',
    name: 'Warm Sandstone',
    category: 'Minimal',
    colors: ['#4A3E3D', '#A3816A', '#E8D2C0', '#F3E9DC', '#FFFFFF'],
  },
  {
    id: 'deep-obsidian',
    name: 'Deep Obsidian',
    category: 'Dark',
    colors: ['#0B0F19', '#111827', '#1F2937', '#374151', '#60A5FA'],
  },
  {
    id: 'royal-velvet',
    name: 'Royal Velvet',
    category: 'Brand',
    colors: ['#240046', '#3C096C', '#5A189A', '#7B2CBF', '#9D4EDD'],
  },
];
