'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Palette, Check, Sun, Moon, Droplets, Zap, Leaf } from 'lucide-react';
import { useTheme, Theme } from './ThemeProvider';

const themes = [
  {
    name: 'Light',
    value: 'light' as Theme,
    icon: Sun,
    description: 'Clean and bright theme',
    preview: 'bg-white border-gray-200 text-gray-900'
  },
  {
    name: 'Dark',
    value: 'dark' as Theme,
    icon: Moon,
    description: 'Easy on the eyes',
    preview: 'bg-gray-900 border-gray-700 text-gray-100'
  },
  {
    name: 'Blue',
    value: 'blue' as Theme,
    icon: Droplets,
    description: 'Ocean inspired theme',
    preview: 'bg-blue-50 border-blue-200 text-blue-900'
  },
  {
    name: 'Purple',
    value: 'purple' as Theme,
    icon: Zap,
    description: 'Creative and vibrant',
    preview: 'bg-purple-50 border-purple-200 text-purple-900'
  },
  {
    name: 'Green',
    value: 'green' as Theme,
    icon: Leaf,
    description: 'Nature inspired theme',
    preview: 'bg-green-50 border-green-200 text-green-900'
  }
];

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({ className = '' }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  const currentTheme = themes.find(t => t.value === theme);

  // Don't render portal until mounted to avoid SSR issues
  const modal = isOpen && mounted ? createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Choose Theme
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid gap-3">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.value;

            return (
              <button
                key={themeOption.value}
                onClick={() => handleThemeSelect(themeOption.value)}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${themeOption.preview}`}>
                  <Icon size={20} />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {themeOption.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {themeOption.description}
                  </div>
                </div>

                {isSelected && (
                  <Check size={20} className="text-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${className}`}
        aria-label="Change theme"
        title="Change theme"
      >
        {currentTheme ? <currentTheme.icon size={20} /> : <Palette size={20} />}
      </button>
      {modal}
    </>
  );
}