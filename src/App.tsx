import { useContext, useEffect, useState } from 'react';

import { Header } from './components';
import { ThemeContext } from './app/contexts/ThemeContext';

const App = () => {
  // const [isDarkMode, setIsDarkMode] = useState(true);
  // const {theme, onToggleTheme} = useContext(ThemeContext);

  // useEffect(() => {
  //   const bgColorHeader = `var(--bg-header-theme-${isDarkMode ? 'dark' : 'light'})`;
  //   const bgColorMain = `var(--bg-main-theme-${isDarkMode ? 'dark' : 'light'})`;

  //   document.body.style.setProperty('--bg-color-header', bgColorHeader);
  //   document.body.style.setProperty('--bg-color-main', bgColorMain);
  // }, [isDarkMode]);

  // function heandleChangeColorTheme() {
  //   setTheme((prev) => !prev);
  // }
  return (
    <div className="app">
      <Header />
    </div>
  );
};

export default App;
