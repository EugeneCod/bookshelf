import { BookCardFavorites } from '../';

import s from './CardListFavorires.module.scss';

interface Props {
  bookIds: string[];
}

const CardList = (props: Props) => {
  const { bookIds } = props;
  return (
    <ul className={s['card-list']}>
      {bookIds.map((bookId) => {
        return <BookCardFavorites key={bookId} bookId={bookId} />;
      })}
    </ul>
  );
};

export default CardList;
