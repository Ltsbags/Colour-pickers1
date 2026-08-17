'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate JSON-LD BreadcrumbList Schema
  const schemaList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: process.env.NEXT_PUBLIC_APP_URL || 'https://colourlab.app',
    },
    ...items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 2,
      name: item.label,
      item: item.href
        ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://colourlab.app'}${item.href}`
        : undefined,
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaList,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        id="breadcrumbs-nav"
        aria-label="Breadcrumb navigation"
        className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400 py-2 mb-4"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize truncate max-w-[200px]">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
