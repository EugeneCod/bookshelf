import { useSearchParams } from 'react-router-dom';

import { CardList, Preloader } from '../../components';
import { useGetBooksQuery } from '../../app/store/books/booksApi';

import s from './SearchCurrent.module.scss';

const SearchCurrent = () => {
  const [URLSearchParams] = useSearchParams();
  const searchQuery = URLSearchParams.get('q') ?? '';

  const { data: booksData, isLoading } = useGetBooksQuery(
    {
      search: searchQuery,
    },
    { skip: !searchQuery },
  );
  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>The result of the request</h1>
        {!!booksData && !!booksData.length ? (
          <CardList books={booksData} />
        ) : (
          <p className={s['page__message']}>
            Nothing was found for your query...
          </p>
        )}
        {isLoading && <Preloader />}
      </div>
    </main>
  );
};

export default SearchCurrent;
