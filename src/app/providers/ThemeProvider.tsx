import { useState, useEffect, useCallback, useMemo } from 'react';

import { ThemeContext, themes } from '../contexts/ThemeContext';

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`;
  if (Object.values(themes).includes(theme)) {
    return theme;
  }

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) {
    return themes.light;
  }

  return themes.dark;
};

interface Props {
  children: JSX.Element;
}

const ThemeProvider = (props: Props) => {
  const { children } = props;
  const [theme, setTheme] = useState(getTheme);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  let isDarkMode = true;
  switch (theme) {
    case 'light':
      isDarkMode = false;
      break;
    case 'dark':
      isDarkMode = true;
      break;
  }

  const cachedValue = useMemo(() => {
    return { isDarkMode, onToggleTheme: handleToggleTheme };
  }, [isDarkMode, handleToggleTheme]);

  return (
    <ThemeContext.Provider value={cachedValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
