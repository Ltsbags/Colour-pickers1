// Gradient Presets for Gradient Generator Tool

export interface GradientPreset {
  id: string;
  name: string;
  type: 'linear' | 'radial' | 'conic';
  angle: number;
  stops: Array<{ color: string; position: number }>;
  category: 'Popular' | 'Sunset' | 'Ocean' | 'Neon' | 'Minimal' | 'Dark';
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: 'hyper-blue',
    name: 'Hyper Blue',
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#3B82F6', position: 0 },
      { color: '#8B5CF6', position: 100 },
    ],
    category: 'Popular',
  },
  {
    id: 'sunset-vibes',
    name: 'Sunset Vibes',
    type: 'linear',
    angle: 90,
    stops: [
      { color: '#FF5733', position: 0 },
      { color: '#F59E0B', position: 50 },
      { color: '#EC4899', position: 100 },
    ],
    category: 'Sunset',
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    type: 'linear',
    angle: 180,
    stops: [
      { color: '#06B6D4', position: 0 },
      { color: '#3B82F6', position: 50 },
      { color: '#1E1B4B', position: 100 },
    ],
    category: 'Ocean',
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    type: 'linear',
    angle: 45,
    stops: [
      { color: '#10B981', position: 0 },
      { color: '#06B6D4', position: 50 },
      { color: '#3B82F6', position: 100 },
    ],
    category: 'Neon',
  },
  {
    id: 'peach-dream',
    name: 'Peach Dream',
    type: 'linear',
    angle: 120,
    stops: [
      { color: '#FFD166', position: 0 },
      { color: '#FF70A6', position: 100 },
    ],
    category: 'Minimal',
  },
  {
    id: 'dark-obsidian',
    name: 'Dark Obsidian',
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#1E293B', position: 0 },
      { color: '#0F172A', position: 100 },
    ],
    category: 'Dark',
  },
  {
    id: 'emerald-aurora',
    name: 'Emerald Aurora',
    type: 'linear',
    angle: 90,
    stops: [
      { color: '#10B981', position: 0 },
      { color: '#84CC16', position: 100 },
    ],
    category: 'Ocean',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    type: 'linear',
    angle: 45,
    stops: [
      { color: '#F43F5E', position: 0 },
      { color: '#FB7185', position: 50 },
      { color: '#FECDD3', position: 100 },
    ],
    category: 'Sunset',
  },
];

export function generateGradientCss(preset: {
  type: 'linear' | 'radial' | 'conic';
  angle: number;
  stops: Array<{ color: string; position: number }>;
}): string {
  const sortedStops = [...preset.stops].sort((a, b) => a.position - b.position);
  const stopsCss = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

  if (preset.type === 'linear') {
    return `linear-gradient(${preset.angle}deg, ${stopsCss})`;
  } else if (preset.type === 'radial') {
    return `radial-gradient(circle at center, ${stopsCss})`;
  } else {
    return `conic-gradient(from ${preset.angle}deg at 50% 50%, ${stopsCss})`;
  }
}
