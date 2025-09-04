/**
 * Theme system types and interfaces
 * Supports multiple color themes with proper TypeScript typing
 */

export type ThemeName = 'light' | 'dark' | 'blue' | 'solarized' | 'purple' | 'dracula' | 'green';

export interface ThemeColors {
  // Background colors
  background: string;
  foreground: string;
  
  // Primary colors
  primary: string;
  primaryForeground: string;
  
  // Secondary colors
  secondary: string;
  secondaryForeground: string;
  
  // Accent colors
  accent: string;
  accentForeground: string;
  
  // Muted colors
  muted: string;
  mutedForeground: string;
  
  // Card colors
  card: string;
  cardForeground: string;
  cards: string;
  
  // Border colors
  border: string;
  
  // Input colors
  input: string;
  
  // Ring color for focus states
  ring: string;
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
}

export interface ThemeContextType {
  currentTheme: ThemeName;
  theme: Theme;
  setTheme: (theme: ThemeName) => void;
  themes: Theme[];
}

/**
 * CSS custom property names for theme variables
 */
export const CSS_VARIABLES = {
  background: '--background',
  foreground: '--foreground',
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  accent: '--accent',
  accentForeground: '--accent-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  card: '--card',
  cards: '--cards',
  cardForeground: '--card-foreground',
  border: '--border',
  input: '--input',
  ring: '--ring',
} as const;