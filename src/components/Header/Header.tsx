import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { AuthBtn, Navigation, Toggle as ThemeToggle } from '../';
import headerLogo from '../../assets/img/header_logo.svg';
import { ThemeContext } from '../../app/contexts/ThemeContext';
import { ROUTES } from '../../utils/constants';

import s from './Header.module.scss';


const Header = () => {
  const {isDarkMode, onToggleTheme} = useContext(ThemeContext);
  const [isAuth, setIsAuth] = useState(true);

  function handleLogout() {
    setIsAuth(false);
  }
  function handleLogin() {
    // <Navigate to={`/${ROUTES.SIGNIN}`}/>
  }
  function handleSignup() {}

  const panelContent = isAuth ? (
    <div className={s['panel']}>
      <Navigation />
      <AuthBtn text="Log out" onClick={handleLogout} />
    </div>
  ) : (
    <div className={s['panel']}>
      <AuthBtn text="Log in" onClick={handleLogin} />
      <AuthBtn text="Sign up" onClick={handleSignup} />
    </div>
  );
  return (
    <>
      <header className={s['header']}>
        <div className={s['container']}>
          <Link to={ROUTES.MAIN} className={s['logo']}>
            <img className={s['logo__image']} src={headerLogo} alt="logo" />
            <p className={s['logo__text']}>Bookshelf</p>
          </Link>
          <form className={s['search']}>
            <input
              className={s['search__input']}
              placeholder="Search on the bookshelf"
            />
            <button className={s['search__btn']} type="button">
              Find
            </button>
          </form>
          {panelContent}
          <div className={s['toggle-theme-container']}>
            <p className={s['toggle-theme-text']}>Switch theme</p>
            <ThemeToggle value={isDarkMode} onChange={onToggleTheme} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
