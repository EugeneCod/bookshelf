import s from './Favorites.module.scss';

const Favorites = () => {
  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>Your selected books</h1>
      </div>
    </main>
  );
};

export default Favorites;
