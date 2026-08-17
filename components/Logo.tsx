import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
  variant?: 'auto' | 'light' | 'dark';
}

export function LogoIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300 group-hover:scale-105`}
    >
      <defs>
        <linearGradient id="c-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="25%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="75%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Colorful Gradient Ring forming 'C' shape */}
      <circle
        cx="50"
        cy="50"
        r="36"
        stroke="url(#c-gradient)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeDasharray="200 60"
        strokeDashoffset="15"
      />
    </svg>
  );
}

export function Logo({
  size = 'md',
  showText = true,
  className = '',
  textColor,
  variant = 'auto',
}: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const colorClass =
    textColor ||
    (variant === 'dark'
      ? 'text-white'
      : variant === 'light'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white');

  return (
    <Link href="/" className={`flex items-center gap-2 group cursor-pointer select-none ${className}`}>
      <LogoIcon className={iconSizes[size]} />

      {showText && (
        <span className={`font-bold tracking-tight ${colorClass} ${textSizes[size]}`}>
          Color <span className="font-extrabold opacity-90">Pickers</span>
        </span>
      )}
    </Link>
  );
}
