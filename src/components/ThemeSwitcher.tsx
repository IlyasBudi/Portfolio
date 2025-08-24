'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, X } from 'lucide-react';
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
 * ThemeSwitcher component with modal functionality
 * Features:
 * - Icon-based trigger button
 * - Modal popup for theme selection
 * - Visual theme indicators with icons and colors
 * - Smooth animations and transitions
 * - Responsive design for mobile and desktop
 * - ARIA labels for accessibility
 * - Click outside to close
 * - Escape key support
 */
export default function ThemeSwitcher() {
  const themeContext = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Close modal when clicking outside or pressing Escape
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Handle case where ThemeProvider is not available
  if (!themeContext) {
    return (
      <button
        className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm"
        aria-label="Theme switcher"
      >
        <Palette size={20} className="text-gray-500 dark:text-gray-400" />
      </button>
    );
  }

  const { currentTheme, setTheme, themes } = themeContext;

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
    <>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm hover:scale-105 active:scale-95"
        aria-label={`Current theme: ${currentThemeData?.displayName}. Click to open theme selector`}
      >
        <Palette size={20} className="text-gray-500 dark:text-gray-400" />
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-modal-title"
          >
            {/* Modal Content */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Palette size={24} className="text-blue-500" />
                  <h2 id="theme-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                    Choose Theme
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Close theme selector"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Theme Options */}
              <div className="p-6">
                <div className="grid grid-cols-1 gap-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.name}
                      onClick={() => handleThemeSelect(theme.name)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                        currentTheme === theme.name
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      whileTap={{ scale: 0.98 }}
                      role="option"
                      aria-selected={currentTheme === theme.name}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl" aria-hidden="true">
                          {themeIcons[theme.name]}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {theme.displayName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {theme.name} theme
                          </div>
                        </div>
                      </div>
                      
                      {/* Color Preview */}
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" 
                            style={{ backgroundColor: theme.colors.background }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" 
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" 
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                        </div>
                        
                        {currentTheme === theme.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check size={20} className="text-blue-500" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Your theme preference will be saved automatically
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
        <Palette size={20} />
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
        <Palette size={20} />
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