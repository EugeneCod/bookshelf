import { createContext } from 'react';

export const themes = {
  dark: 'dark',
  light: 'light',
};

interface ThemeContextType {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>(undefined!);
