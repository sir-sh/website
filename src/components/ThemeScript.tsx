'use client';

import { useEffect } from 'react';

export function ThemeScript() {
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'true' || (!stored && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  
  return null;
}