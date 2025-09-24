/**
 * Dark mode utility for ShopMeco site
 * Provides functionality to handle dark mode detection and toggling
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Check if dark mode is currently active
 */
export function isDarkMode(): boolean {
  if (!isBrowser) return false;
  return document.documentElement.classList.contains('dark');
}

/**
 * Initialize dark mode based on system preference and saved preference
 */
export function initDarkMode(): void {
  if (!isBrowser) return;
  
  // Check localStorage first
  const savedPreference = localStorage.getItem('color-theme');
  
  // If user has explicitly chosen a preference
  if (savedPreference === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedPreference === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // If no saved preference, check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

/**
 * Toggle dark mode on/off and save preference
 */
export function toggleDarkMode(): void {
  if (!isBrowser) return;
  
  // Toggle dark class
  if (isDarkMode()) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  }
}

/**
 * Reset dark mode preference to system default
 */
export function resetDarkModePreference(): void {
  if (!isBrowser) return;
  
  // Remove saved preference
  localStorage.removeItem('color-theme');
  
  // Set based on system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Set up listener for system color scheme changes
 */
export function listenForColorSchemeChange(): () => void {
  if (!isBrowser) return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent): void => {
    // Only apply system preference if user hasn't set a preference
    if (!localStorage.getItem('color-theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  // Add listener
  mediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handleChange);
}
