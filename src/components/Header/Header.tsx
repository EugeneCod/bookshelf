import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthBtn, Navigation, SearchForm, Toggle as ThemeToggle } from '../';
import headerLogo from '../../assets/img/header_logo.svg';
import { ThemeContext } from '../../app/contexts/ThemeContext';
import { ROUTES } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { logout } from '../../utils/authApi';
import { selectUserIsAuth } from '../../app/store/user/selectors';
import { removeUser } from '../../app/store/user/slice';

import s from './Header.module.scss';

const Header = () => {
  const { isDarkMode, onToggleTheme } = useContext(ThemeContext);
  const isAuth = useAppSelector(selectUserIsAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleLogoutClick(): Promise<void> {
    logout()
      .then(() => {
        dispatch(removeUser());
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  function handleLoginClick(): void {
    navigate(ROUTES.SIGNIN);
  }
  function handleSignupClick(): void {
    navigate(ROUTES.SIGNUP);
  }

  const panelContent = isAuth ? (
    <div className={s['panel']}>
      <Navigation />
      <AuthBtn text="Log out" onClick={handleLogoutClick} />
    </div>
  ) : (
    <div className={s['panel']}>
      <AuthBtn text="Log in" onClick={handleLoginClick} />
      <AuthBtn text="Sign up" onClick={handleSignupClick} />
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
          <div className={s['search-container']}>
            <SearchForm />
          </div>
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
