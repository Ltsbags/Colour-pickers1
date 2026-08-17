'use client';

import { useEffect } from 'react';
import { addToColorHistory } from '@/lib/color-history';

interface TrackColorViewProps {
  hex: string;
  name?: string;
}

export function TrackColorView({ hex, name }: TrackColorViewProps) {
  useEffect(() => {
    if (hex) {
      addToColorHistory(hex, name);
    }
  }, [hex, name]);

  return null;
}
