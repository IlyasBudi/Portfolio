'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType, ThemeName, CSS_VARIABLES } from '@/types/theme';
import { 
  themes, 
  getTheme, 
  getSystemTheme, 
  DEFAULT_THEME, 
  THEME_STORAGE_KEY 
} from '@/lib/themes';

/**
 * Theme context for managing multiple themes across the application
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Apply theme colors to CSS custom properties
 * This enables smooth theme transitions and consistent styling
 */
const applyTheme = (themeName: ThemeName) => {
  const theme = getTheme(themeName);
  const root = document.documentElement;
  
  // Remove any existing theme classes first
  root.className = root.className.replace(/theme-\w+/g, '').replace(/\bdark\b/g, '');
  
  // Add the new theme class
  root.classList.add(`theme-${themeName}`);
  
  // Apply all theme colors as CSS custom properties with high priority
  Object.entries(CSS_VARIABLES).forEach(([key, cssVar]) => {
    const colorValue = theme.colors[key as keyof typeof theme.colors];
    if (colorValue) {
      root.style.setProperty(cssVar, colorValue, 'important');
    }
  });
  
  // Keep backward compatibility with dark class
  if (themeName === 'dark') {
    root.classList.add('dark');
  }
};

/**
 * Enhanced ThemeProvider component supporting multiple themes
 * Features:
 * - 5 predefined themes (Light, Dark, Blue, Purple, Green)
 * - localStorage persistence
 * - System preference detection
 * - Smooth theme transitions
 * - Hydration-safe rendering
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  /**
   * Initialize theme on component mount
   * Checks localStorage first, then system preference
   */
  useEffect(() => {
    setMounted(true);
    
    try {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
      
      if (savedTheme && themes.some(t => t.name === savedTheme)) {
        setCurrentTheme(savedTheme);
        applyTheme(savedTheme);
      } else {
        // Fall back to system preference
        const systemTheme = getSystemTheme();
        setCurrentTheme(systemTheme);
        applyTheme(systemTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
      // Fall back to default theme
      setCurrentTheme(DEFAULT_THEME);
      applyTheme(DEFAULT_THEME);
    }
  }, []);

  /**
   * Set new theme and persist to localStorage
   * Includes error handling for localStorage operations
   */
  const setTheme = (themeName: ThemeName) => {
    try {
      setCurrentTheme(themeName);
      applyTheme(themeName);
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
      // Still apply the theme even if localStorage fails
      setCurrentTheme(themeName);
      applyTheme(themeName);
    }
  };

  /**
   * Prevent hydration mismatch by not rendering theme-dependent content
   * until after client-side hydration is complete
   */
  if (!mounted) {
    return <>{children}</>;
  }

  const contextValue: ThemeContextType = {
    currentTheme,
    theme: getTheme(currentTheme),
    setTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * Provides type-safe access to theme state and functions
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Legacy hook for backward compatibility
 * Returns boolean dark mode state and toggle function
 */
export function useLegacyTheme() {
  const context = useContext(ThemeContext);
  
  // Provide safe defaults if context is not available
  if (!context) {
    return {
      darkMode: false,
      toggleDarkMode: () => {
        console.warn('toggleDarkMode called outside of ThemeProvider');
      }
    };
  }
  
  const { currentTheme, setTheme } = context;
  
  return {
    darkMode: currentTheme === 'dark',
    toggleDarkMode: () => {
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
  };
}

