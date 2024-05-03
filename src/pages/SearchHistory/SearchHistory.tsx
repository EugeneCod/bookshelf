import s from './SearchHistory.module.scss';

const SearchHistory = () => {
  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>Your past search queries</h1>
      </div>
    </main>
  );
};

export default SearchHistory;
