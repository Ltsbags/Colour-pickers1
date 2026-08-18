'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  const toolsLinks = [
    { name: 'HEX Color Picker', href: '/tools/color-picker' },
    { name: 'Image Color Picker', href: '/tools/image-color-picker' },
    { name: 'Gradient Generator', href: '/tools/gradient-generator' },
    { name: 'Palette Generator', href: '/tools/palette-generator' },
    { name: 'Contrast Checker (WCAG)', href: '/tools/color-contrast-checker' },
    { name: 'Color Mixer & Blender', href: '/tools/color-mixer' },
    { name: 'Color Harmonies', href: '/tools/color-harmonies' },
    { name: 'Shades & Tints Generator', href: '/tools/shades-generator' },
    { name: 'Color Names Dictionary', href: '/tools/color-names' },
    { name: 'CSS & Tailwind Converter', href: '/tools/css-converter' },
  ];

  const convertersLinks = [
    { name: 'Universal Color Converter', href: '/tools/converter' },
    { name: 'HEX to RGB Converter', href: '/tools/hex-to-rgb' },
    { name: 'HEX to HSL Converter', href: '/tools/hex-to-hsl' },
    { name: 'HEX to HSV Converter', href: '/tools/hex-to-hsv' },
    { name: 'HEX to CMYK Converter', href: '/tools/hex-to-cmyk' },
    { name: 'All Converters Hub', href: '/converters' },
  ];

  const guidesLinks = [
    { name: 'What is a HEX Color?', href: '/guides/what-is-a-hex-color' },
    { name: 'HEX vs RGB Color Models', href: '/guides/hex-vs-rgb' },
    { name: 'RGB vs CMYK for Print', href: '/guides/rgb-vs-cmyk' },
    { name: 'What is HSL Color?', href: '/guides/what-is-hsl-color' },
    { name: 'WCAG Color Contrast Guide', href: '/guides/wcag-color-contrast-guide' },
    { name: 'Website Palette 60-30-10 Rule', href: '/guides/how-to-choose-a-website-color-palette' },
    { name: 'Color Psychology in Design', href: '/guides/color-psychology-guide' },
    { name: 'Modern CSS Color Guide', href: '/guides/css-color-guide' },
    { name: 'All Guides & Tutorials', href: '/guides' },
  ];

  const popularColors = [
    { name: '#3B82F6 Royal Blue', href: '/hex/3B82F6' },
    { name: '#10B981 Emerald Green', href: '/hex/10B981' },
    { name: '#F59E0B Amber Gold', href: '/hex/F59E0B' },
    { name: '#8B5CF6 Purple Accent', href: '/hex/8B5CF6' },
    { name: '#EC4899 Hot Pink', href: '/hex/EC4899' },
    { name: '#FF5733 Persimmon Red', href: '/hex/FF5733' },
    { name: '#0F172A Dark Obsidian', href: '/hex/0F172A' },
    { name: 'Full Color Spectrum', href: '/colors' },
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
      className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Logo size="md" variant="dark" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The premier zero-latency color suite for web designers and software engineers. High-precision HEX, RGB, HSL, HSV, CMYK conversions, gradient generators, harmonies, and WCAG accessibility standards.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% Client-Side Processing • Zero Data Transmitted</span>
            </div>
          </div>

          {/* Color Tools */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Color Tools
            </h3>
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

          {/* Converters */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Converters
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {convertersLinks.map(link => (
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

            <h3 className="font-bold text-white text-xs uppercase tracking-wider mt-6 mb-3">
              Popular Colors
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {popularColors.slice(0, 4).map(link => (
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

          {/* Educational Guides */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Guides & Theory
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {guidesLinks.map(link => (
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

          {/* Legal & Trust */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Company & Legal
            </h3>
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

            <div className="mt-8 p-3 rounded-xl bg-slate-800/60 border border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-slate-300 block mb-1">AdSense Disclosure:</span>
              Third-party cookies and Google advertising cookies are used in compliance with GDPR, CCPA, and Google Publisher Policies.
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Color Pickers. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="hover:underline">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
