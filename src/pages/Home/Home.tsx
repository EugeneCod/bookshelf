import { Preloader, BookCard } from '../../components';
import { useGetBooksQuery } from '../../app/store/books/booksApi';

import s from './Home.module.scss';

import type { LocalBookShortData } from '../../app/store/books/types';

const Home = () => {
  const { data = [], isLoading } = useGetBooksQuery({ search: 'незнайка' });

  function handleCardLike(bookData: LocalBookShortData) {}

  return (
    <main className={s['home']}>
      <div className={s['home__container']}>
        <h1 className={s['home__title']}>Collection of books</h1>
        {isLoading ? (
          <Preloader />
        ) : (
          <ul className={s['card-list']}>
            {data.map((book) => {
              return (
                <BookCard
                  key={book.id}
                  card={book}
                  onCardLike={handleCardLike}
                />
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Home;
