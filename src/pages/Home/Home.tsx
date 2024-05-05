import { Preloader, CardList } from '../../components';
import { useGetBooksQuery } from '../../app/store/books/booksApi';

import s from './Home.module.scss';

const Home = () => {
  const { data: booksData, isLoading } = useGetBooksQuery({
    search: 'незнайка',
  });

  return (
    <main className={s['home']}>
      <div className={s['home__container']}>
        <h1 className={s['home__title']}>Collection of books</h1>
        {!!booksData && <CardList books={booksData} />}
        {isLoading && <Preloader />}
      </div>
    </main>
  );
};

export default Home;
