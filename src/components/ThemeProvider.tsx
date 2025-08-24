'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'blue' | 'purple' | 'green';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  // Keep backward compatibility
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference, default to light (no system preference override)
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme && ['light', 'dark', 'blue', 'purple', 'green'].includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to light theme, no system preference detection
      setThemeState('light');
      applyTheme('light');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    // Remove all theme classes and data attributes
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-theme');
    
    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Keep dark class for backward compatibility with existing styles
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Backward compatibility for darkMode
  const darkMode = theme === 'dark';
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

