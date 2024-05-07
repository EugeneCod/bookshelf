import { BookCard } from '../';

import s from './CardList.module.scss';

import type { LocalBookShortData } from '../../app/store/books/types';

interface Props {
  books: LocalBookShortData[];
}

const CardList = (props: Props) => {
  const { books } = props;
  return (
    <ul className={s['card-list']}>
      {books.map((book) => {
        return <BookCard key={book.id} card={book} />;
      })}
    </ul>
  );
};

export default CardList;
