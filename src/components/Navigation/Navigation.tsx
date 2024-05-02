import { NavLink } from 'react-router-dom';

import favouritesIcon from '../../assets/img/heart-icon.svg';
import searchHistoryIcon from '../../assets/img/history-icon.svg';

import s from './Navigation.module.scss';

const Navigation = () => {
  function setNavLinkClass(props: { isActive: boolean }): string {
    return props.isActive
      ? `${s['nav__link']} ${s['nav__link-active']}`
      : s['nav__link'];
  }

  return (
    <nav className={s['nav']}>
      <ul className={s['nav__list']}>
        <li className={s['nav__list-item']}>
          <NavLink className={setNavLinkClass} to="favorites">
            <img
              className={s['nav__icon']}
              src={favouritesIcon}
              alt="favourites"
            />
            <span className={s['nav__text']}>Favorites</span>
          </NavLink>
        </li>
        <li className={s['nav__list-item']}>
          <NavLink className={setNavLinkClass} to="history">
            <img
              className={s['nav__icon']}
              src={searchHistoryIcon}
              alt="search history"
            />
            <span className={s['nav__text']}>Search history</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
