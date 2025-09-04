/**
 * Theme configuration with predefined color palettes
 * Contains 5 themes: Light, Dark, Blue, Purple, and Green
 */

import { Theme, ThemeName } from '@/types/theme';

/**
 * Light theme configuration
 */
const lightTheme: Theme = {
  name: 'light',
  displayName: 'Light',
  colors: {
    background: '#ffffff',
    foreground: '#171717',
    primary: '#2563eb',
    primaryForeground: '#ffffff',
    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',
    accent: '#f1f5f9',
    accentForeground: '#0f172a',
    muted: '#f8fafc',
    mutedForeground: '#64748b',
    card: '#ffffff',
    cards: '255, 255, 255',
    cardForeground: '#171717',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#2563eb',
  },
};

/**
 * Dark theme configuration
 */
// const darkTheme: Theme = {
//   name: 'dark',
//   displayName: 'Dark',
//   colors: {
//     background: '#0a0a0a',
//     foreground: '#ededed',
//     primary: '#60a5fa',
//     primaryForeground: '#0f172a',
//     secondary: '#1e293b',
//     secondaryForeground: '#f8fafc',
//     accent: '#1e293b',
//     accentForeground: '#f8fafc',
//     muted: '#1e293b',
//     mutedForeground: '#94a3b8',
//     card: '#0a0a0a',
//     cardForeground: '#ededed',
//     border: '#1e293b',
//     input: '#1e293b',
//     ring: '#60a5fa',
//   },
// };

const darkTheme: Theme = {
  name: 'dark',
  displayName: 'Dark',
  colors: {
    background: '#111827',
    foreground: '#ededed',
    primary: '#60a5fa',
    primaryForeground: '#0f172a',
    secondary: '#1f2937',
    secondaryForeground: '#f8fafc',
    accent: '#1e293b',
    accentForeground: '#93c5fd',
    muted: '#111827',
    mutedForeground: '#94a3b8',
    card: '#111827',
    cards: '17, 24, 39',
    cardForeground: '#ededed',
    border: '#374151',
    input: '#1e293b',
    ring: '#60a5fa',
  },
};

/**
 * Blue theme configuration
 */
const blueTheme: Theme = {
  name: 'blue',
  displayName: 'Ocean Blue',
  colors: {
    background: '#f0f9ff',
    foreground: '#0c4a6e',
    primary: '#0ea5e9',
    primaryForeground: '#ffffff',
    secondary: '#e0f2fe',
    secondaryForeground: '#0c4a6e',
    accent: '#bae6fd',
    accentForeground: '#0c4a6e',
    muted: '#f0f9ff',
    mutedForeground: '#0369a1',
    card: '#ffffff',
    cards: '255, 255, 255',
    cardForeground: '#0c4a6e',
    border: '#bae6fd',
    input: '#e0f2fe',
    ring: '#0ea5e9',
  },
};

/**
 * Solarized theme configuration
 */
const solarizedTheme: Theme = {
  name: 'solarized',
  displayName: 'Solarized',
  colors: {
  background: '#fdf7e2',
  foreground: '#073541',
  primary: '#278cd3',
  primaryForeground: '#fdf7e2',
  secondary: '#dad6ce',
  secondaryForeground: '#073541',
  accent: '#ff9500',
  accentForeground: '#fdf7e2',
  muted: '#fdf7e2',
  mutedForeground: '#93a0a0',
  card: '#fdf7e2',
  cards: '253, 247, 226',
  cardForeground: '#073541',
  border: '#dad6ce',
  input: '#dad6ce',
  ring: '#278cd3',
  },
};

/**
 * Purple theme configuration
 */
const purpleTheme: Theme = {
  name: 'purple',
  displayName: 'Royal Purple',
  colors: {
    background: '#faf5ff',
    foreground: '#581c87',
    primary: '#a855f7',
    primaryForeground: '#ffffff',
    secondary: '#f3e8ff',
    secondaryForeground: '#581c87',
    accent: '#ddd6fe',
    accentForeground: '#581c87',
    muted: '#faf5ff',
    mutedForeground: '#7c3aed',
    card: '#ffffff',
    cards: '255, 255, 255',
    cardForeground: '#581c87',
    border: '#ddd6fe',
    input: '#f3e8ff',
    ring: '#a855f7',
  },
};

/**
 * Dracula theme configuration
 */
const DraculaTheme: Theme = {
  name: 'dracula',
  displayName: 'Dracula',
  colors: {
  background: '#272935',
  foreground: '#bf95fa',
  primary: '#ff7ac6',
  primaryForeground: '#272935',
  secondary: '#44475a',
  secondaryForeground: '#272935',
  accent: '#bf95fa',
  accentForeground: '#272935',
  muted: '#272935',
  mutedForeground: '#abb0bf',
  card: '#272935',
  cards: '39, 41, 53',
  cardForeground: '#f8f8f2',
  border: '#44475a',
  input: '#44475a',
  ring: '#bf95fa',
  },
};

/**
 * Green theme configuration
 */
const greenTheme: Theme = {
  name: 'green',
  displayName: 'Forest Green',
  colors: {
    background: '#f0fdf4',
    foreground: '#14532d',
    primary: '#22c55e',
    primaryForeground: '#ffffff',
    secondary: '#dcfce7',
    secondaryForeground: '#14532d',
    accent: '#bbf7d0',
    accentForeground: '#14532d',
    muted: '#f0fdf4',
    mutedForeground: '#15803d',
    card: '#ffffff',
    cards: '255, 255, 255',
    cardForeground: '#14532d',
    border: '#bbf7d0',
    input: '#dcfce7',
    ring: '#22c55e',
  },
};

/**
 * All available themes
 */
export const themes: Theme[] = [
  lightTheme,
  darkTheme,
  blueTheme,
  solarizedTheme,
  purpleTheme,
  DraculaTheme,
  greenTheme,
];

/**
 * Get theme by name with fallback to light theme
 */
export const getTheme = (themeName: ThemeName): Theme => {
  const theme = themes.find(t => t.name === themeName);
  return theme || lightTheme;
};

/**
 * Get system preference for dark mode
 */
export const getSystemTheme = (): ThemeName => {
  if (typeof window === 'undefined') return 'light';
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

/**
 * Default theme name
 */
export const DEFAULT_THEME: ThemeName = 'light';

/**
 * Local storage key for theme preference
 */
export const THEME_STORAGE_KEY = 'portfolio-theme';