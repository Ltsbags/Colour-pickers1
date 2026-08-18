'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy?: string;
  text?: string;
  label?: string;
  className?: string;
  variant?: 'outline' | 'ghost' | 'solid' | 'badge' | 'secondary' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

export function CopyButton({
  textToCopy,
  text,
  label,
  className = '',
  variant = 'outline',
  size = 'md',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const targetText = textToCopy || text || '';

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!targetText) return;
    try {
      await navigator.clipboard.writeText(targetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = targetText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const variantClasses: Record<string, string> = {
    outline:
      'border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200',
    ghost:
      'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300',
    solid:
      'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-xs',
    default:
      'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-xs',
    secondary:
      'border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200',
    badge:
      'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60',
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      id={`copy-btn-${targetText.replace(/[^a-zA-Z0-9]/g, '')}`}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all active:scale-95 cursor-pointer select-none ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.outline} ${className}`}
      title={`Copy ${targetText}`}
      aria-label={`Copy ${targetText}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 animate-in zoom-in-50 duration-150" />
          <span>{label || 'Copied!'}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 opacity-70" />
          <span>{label || 'Copy'}</span>
        </>
      )}
    </button>
  );
}
