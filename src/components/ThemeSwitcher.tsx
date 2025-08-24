'use client';

import { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { ThemeContext } from '@/components/ThemeProvider';
import { ThemeName } from '@/types/theme';
// import ThemeModal from './ThemeModal';
import ThemeModalPortal from './ThemeModalPortal';

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
 * - Modal popup for theme selection (rendered at root level)
 * - Visual theme indicators with icons and colors
 * - Smooth animations and transitions
 * - Responsive design for mobile and desktop
 * - ARIA labels for accessibility
 * - Click outside to close
 * - Escape key support
 */
export default function ThemeSwitcher() {
  const themeContext = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const { currentTheme, themes } = themeContext;
  const currentThemeData = themes.find(t => t.name === currentTheme);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={handleOpenModal}
        className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm hover:scale-105 active:scale-95"
        aria-label={`Current theme: ${currentThemeData?.displayName}. Click to open theme selector`}
      >
        <Palette size={20} className="text-gray-500 dark:text-gray-400" />
      </button>

      {/* Theme Modal - Rendered separately */}
      <ThemeModalPortal isOpen={isModalOpen} onClose={handleCloseModal} />
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