'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Palette, Check } from 'lucide-react';
import { ThemeContext } from '@/components/ThemeProvider';
import { ThemeName } from '@/types/theme';

/**
 * Theme icons for visual representation
 */
const themeIcons: Record<ThemeName, string> = {
  light: '☀️',
  dark: '🌙',
  blue: '🌊',
  purple: '🔮',
  green: '🌿',
};

/**
 * ThemeSwitcher component with dropdown functionality
 * Features:
 * - Accessible dropdown with keyboard navigation
 * - Visual theme indicators with icons
 * - Smooth animations and transitions
 * - Responsive design for mobile and desktop
 * - ARIA labels for screen readers
 */
export default function ThemeSwitcher() {
  const themeContext = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle case where ThemeProvider is not available
  if (!themeContext) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 min-w-[140px]">
        <Palette size={16} className="text-gray-500 dark:text-gray-400" />
        <span className="hidden sm:inline text-sm font-medium">Light</span>
        <span className="sm:hidden text-lg" aria-hidden="true">☀️</span>
      </div>
    );
  }

  const { currentTheme, setTheme, themes } = themeContext;

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  /**
   * Handle theme selection
   */
  const handleThemeSelect = (themeName: ThemeName) => {
    setTheme(themeName);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const currentThemeData = themes.find(t => t.name === currentTheme);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm min-w-[140px] justify-between"
        aria-label={`Current theme: ${currentThemeData?.displayName}. Click to open theme selector`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center space-x-2">
          <Palette size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="hidden sm:inline text-sm font-medium">
            {currentThemeData?.displayName}
          </span>
          <span className="sm:hidden text-lg" aria-hidden="true">
            {themeIcons[currentTheme]}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg backdrop-blur-sm z-50"
            role="listbox"
            aria-label="Theme options"
          >
            <div className="py-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeSelect(theme.name)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  role="option"
                  aria-selected={currentTheme === theme.name}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg" aria-hidden="true">
                      {themeIcons[theme.name]}
                    </span>
                    <span className="font-medium">{theme.displayName}</span>
                  </div>
                  {currentTheme === theme.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check size={16} className="text-blue-500" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Compact version of ThemeSwitcher for mobile navigation
 */
export function ThemeSwitcherCompact() {
  const themeContext = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  // Handle case where ThemeProvider is not available
  if (!themeContext) {
    return (
      <button
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        aria-label="Theme switcher"
      >
        <span className="text-xl">☀️</span>
      </button>
    );
  }

  const { currentTheme, setTheme, themes } = themeContext;

  const handleThemeSelect = (themeName: ThemeName) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={`Current theme: ${themes.find(t => t.name === currentTheme)?.displayName}`}
      >
        <span className="text-xl">{themeIcons[currentTheme]}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
          >
            <div className="p-2 grid grid-cols-5 gap-1">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeSelect(theme.name)}
                  className={`p-2 rounded text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    currentTheme === theme.name ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                  title={theme.displayName}
                >
                  {themeIcons[theme.name]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}