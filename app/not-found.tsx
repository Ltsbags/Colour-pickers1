import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LogoIcon } from '@/components/Logo';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center text-center my-auto">
        <div className="mb-6">
          <LogoIcon className="w-20 h-20" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          404 - Color Code Not Found
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md">
          The color code or page you requested could not be located. Try searching for a valid HEX code like <code className="font-mono text-blue-600">#FF5733</code> or exploring our tools.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/tools"
            className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl transition-all"
          >
            Explore Tools Directory
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
