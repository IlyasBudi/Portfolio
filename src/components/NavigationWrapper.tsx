'use client';

import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { useLegacyTheme } from './ThemeProvider';

/**
 * NavigationWrapper component that provides backward compatibility
 * while using the new multi-theme system
 */
export default function NavigationWrapper() {
  const [mounted, setMounted] = useState(false);
  const { darkMode, toggleDarkMode } = useLegacyTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <Navigation darkMode={false} toggleDarkMode={() => {}} />;
  }

  return <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
}

