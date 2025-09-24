'use client';

import { useEffect } from 'react';
import { initDarkMode, listenForColorSchemeChange, resetDarkModePreference } from '@/lib/dark-mode';

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize dark mode on component mount
    initDarkMode();
    
    // Set up listener for system color scheme changes
    const cleanup = listenForColorSchemeChange();
    
    // Cleanup on unmount
    return cleanup;
  }, []);
  
  return <>{children}</>;
}
