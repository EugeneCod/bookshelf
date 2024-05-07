import { CardList } from '../../components';
import { useFavorites } from '../../hooks/useFavorites';

import s from './Favorites.module.scss';

const Favorites = () => {
  const { favorites, error } = useFavorites();
  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>Your favorites books</h1>
        <CardList books={favorites} />
        {favorites.length === 0 && (
          <p className={s['page__no-data-message']}>
            There is nothing here at the moment...
          </p>
        )}
        {!!error && <p className={s['page__error-message']}>{error}</p>}
      </div>
    </main>
  );
};

export default Favorites;
