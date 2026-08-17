// Curated Popular, Trending, Pastels, and Material Color Collections

export interface ColorItem {
  hex: string; // e.g. "FF5733" or "#FF5733"
  name: string;
  category: string;
  tags?: string[];
}

export const POPULAR_COLORS: ColorItem[] = [
  { hex: 'FF5733', name: 'Persimmon Red', category: 'Red', tags: ['vibrant', 'warm', 'sunset'] },
  { hex: '3B82F6', name: 'Bright Blue', category: 'Blue', tags: ['modern', 'tailwind', 'primary'] },
  { hex: '10B981', name: 'Emerald Green', category: 'Green', tags: ['fresh', 'nature', 'success'] },
  { hex: 'F59E0B', name: 'Amber Glow', category: 'Yellow', tags: ['warm', 'gold', 'warning'] },
  { hex: '8B5CF6', name: 'Vivid Purple', category: 'Purple', tags: ['creative', 'royal', 'accent'] },
  { hex: 'EC4899', name: 'Pink Rose', category: 'Pink', tags: ['playful', 'soft', 'vibrant'] },
  { hex: '6366F1', name: 'Indigo Night', category: 'Purple', tags: ['deep', 'tech', 'sleek'] },
  { hex: '14B8A6', name: 'Teal Mint', category: 'Green', tags: ['calm', 'clean', 'ocean'] },
  { hex: 'EF4444', name: 'Coral Red', category: 'Red', tags: ['danger', 'bold', 'punchy'] },
  { hex: '06B6D4', name: 'Cyan Wave', category: 'Blue', tags: ['electric', 'fresh', 'sky'] },
  { hex: '64748B', name: 'Slate Gray', category: 'Neutral', tags: ['modern', 'corporate', 'muted'] },
  { hex: '0F172A', name: 'Midnight Obsidian', category: 'Neutral', tags: ['dark mode', 'deep', 'sleek'] },
  { hex: 'F8FAFC', name: 'Pure Ice', category: 'Neutral', tags: ['clean', 'light mode', 'background'] },
  { hex: '84CC16', name: 'Lime Punch', category: 'Green', tags: ['energetic', 'bright', 'summer'] },
  { hex: 'F43F5E', name: 'Crimson Rose', category: 'Red', tags: ['passion', 'vibrant', 'modern'] },
  { hex: 'D97706', name: 'Burnt Amber', category: 'Orange', tags: ['autumn', 'rich', 'vintage'] },
];

export const TRENDING_COLORS: ColorItem[] = [
  { hex: '4F46E5', name: 'Electric Indigo', category: 'Purple', tags: ['saas', 'trendy', '2026'] },
  { hex: '0D9488', name: 'Deep Teal', category: 'Green', tags: ['luxury', 'calm', 'editorial'] },
  { hex: 'E11D48', name: 'Berry Punch', category: 'Red', tags: ['bold', 'youthful', 'striking'] },
  { hex: 'D946EF', name: 'Fuchsia Neon', category: 'Pink', tags: ['cyberpunk', 'vibrant', 'retro'] },
  { hex: '0284C7', name: 'Ocean Sapphire', category: 'Blue', tags: ['trustworthy', 'corporate', 'clean'] },
  { hex: 'CA8A04', name: 'Mustard Gold', category: 'Yellow', tags: ['vintage', 'warm', 'editorial'] },
  { hex: '16A34A', name: 'Forest Green', category: 'Green', tags: ['sustainability', 'organic', 'nature'] },
  { hex: 'EA580C', name: 'Solar Flare', category: 'Orange', tags: ['high energy', 'cta', 'warmth'] },
  { hex: '7C3AED', name: 'Deep Amethyst', category: 'Purple', tags: ['mystic', 'premium', 'lux'] },
  { hex: '2563EB', name: 'Royal Sapphire', category: 'Blue', tags: ['ui kit', 'standard', 'brand'] },
  { hex: '9333EA', name: 'Cyber Purple', category: 'Purple', tags: ['neon', 'future', 'web3'] },
  { hex: '059669', name: 'Jade Mint', category: 'Green', tags: ['wellness', 'soft', 'medical'] },
];

export const PASTEL_COLORS: ColorItem[] = [
  { hex: 'FFB3BA', name: 'Pastel Pink', category: 'Pink' },
  { hex: 'FFDFBA', name: 'Pastel Peach', category: 'Orange' },
  { hex: 'FFFFBA', name: 'Pastel Yellow', category: 'Yellow' },
  { hex: 'BAFFC9', name: 'Pastel Mint', category: 'Green' },
  { hex: 'BAE1FF', name: 'Pastel Sky', category: 'Blue' },
  { hex: 'E8AEFF', name: 'Pastel Lavender', category: 'Purple' },
  { hex: 'FCD5CE', name: 'Pastel Coral', category: 'Pink' },
  { hex: 'F8EDEB', name: 'Pastel Cream', category: 'Neutral' },
];

export const RECENT_COLORS_DEFAULT: string[] = [
  '3B82F6', 'FF5733', '10B981', '8B5CF6', 'F59E0B', 'EC4899', '06B6D4', '64748B'
];
