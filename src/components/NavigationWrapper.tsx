'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import Navigation from './Navigation';

export default function NavigationWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Navigation darkMode={false} toggleDarkMode={() => {}} />;
  }

  return <NavigationWrapperClient />;
}

function NavigationWrapperClient() {
  const { darkMode, toggleDarkMode } = useTheme();
  return <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
}

