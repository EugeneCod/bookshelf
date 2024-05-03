import s from './SearchCurrent.module.scss';

const SearchCurrent = () => {
  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>The result of the request</h1>
      </div>
    </main>
  )
}

export default SearchCurrent