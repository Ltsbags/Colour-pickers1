'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const popularColorLinks = [
    { name: '#FF5733 Persimmon', href: '/hex/FF5733' },
    { name: '#3B82F6 Blue', href: '/hex/3B82F6' },
    { name: '#10B981 Emerald', href: '/hex/10B981' },
    { name: '#F59E0B Amber', href: '/hex/F59E0B' },
    { name: '#8B5CF6 Purple', href: '/hex/8B5CF6' },
    { name: '#EC4899 Pink', href: '/hex/EC4899' },
    { name: '#0F172A Dark Obsidian', href: '/hex/0F172A' },
  ];

  const toolsLinks = [
    { name: 'HEX Color Picker', href: '/tools/color-picker' },
    { name: 'RGB Converter', href: '/tools/hex-to-rgb' },
    { name: 'HSL Converter', href: '/tools/hex-to-hsl' },
    { name: 'HSV Converter', href: '/tools/hex-to-hsv' },
    { name: 'CMYK Converter', href: '/tools/hex-to-cmyk' },
    { name: 'Gradient Generator', href: '/tools/gradient-generator' },
    { name: 'Color Palette Generator', href: '/tools/palette-generator' },
    { name: 'Color Contrast Checker', href: '/tools/color-contrast-checker' },
    { name: 'Color Shades Generator', href: '/tools/color-shades-generator' },
    { name: 'Color Names Dictionary', href: '/tools/color-names' },
    { name: 'CSS Color Converter', href: '/tools/css-converter' },
  ];

  const companyLinks = [
    { name: 'About Color Pickers', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer
      id="main-footer"
      className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Logo size="md" variant="dark" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The modern, ultra-fast color suite for designers and developers. High precision
              HEX, RGB, HSL, HSV, CMYK conversions, gradient engine, and color harmonies.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Client-side zero-latency processing</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Color Tools</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {toolsLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Colors */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Popular Colors</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {popularColorLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition-colors font-mono"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Information</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {companyLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Color Pickers.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with precision for designers & developers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
