import { useEffect, useState } from 'react';

import { Header } from './components';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const bgColorHeader = `var(--bg-header-theme-${isDarkMode ? 'dark' : 'light'})`;
    const bgColorMain = `var(--bg-main-theme-${isDarkMode ? 'dark' : 'light'})`;

    document.body.style.setProperty('--bg-color-header', bgColorHeader);
    document.body.style.setProperty('--bg-color-main', bgColorMain);
  }, [isDarkMode]);

  function heandleChangeColorTheme() {
    setIsDarkMode((prev) => !prev);
  }
  return (
    <div className="app">
      <Header isDarkMode={isDarkMode} onThemeChange={heandleChangeColorTheme} />
    </div>
  );
};

export default App;
