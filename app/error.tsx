'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center text-center my-auto">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md">
          An unexpected error occurred while processing this color calculation. Try refreshing the view or returning to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl flex items-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
