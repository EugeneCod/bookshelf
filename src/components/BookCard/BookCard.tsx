import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/constants';
import { LikeBtn } from '../';
import { useFavorites } from '../../hooks/useFavorites';
import { Status } from '../../app/store/favorites/types';

import s from './BookCard.module.scss';

import type { LocalBookShortData } from '../../app/store/books/types';

interface Props {
  card: LocalBookShortData;
}

const BookCard = (props: Props) => {
  const { card } = props;
  const { status, addToFavorites, removeFromFavorites, checkIsLiked } =
    useFavorites();
  const isLiked = checkIsLiked(card.id);

  function handleLikeClick() {
    if (status === Status.LOADING) {
      return;
    }
    !isLiked ? addToFavorites(card) : removeFromFavorites(card.id);
  }

  return (
    <li className={s['card']}>
      <Link
        to={`${ROUTES.BOOK}/${card.id}`}
        className={s['card__image-container']}
        style={{ backgroundImage: `url(${card.imageLink})` }}
      />
      <div className={s['card__text-container']}>
        <p className={s['card__title']}>{card.title}</p>
        <p className={s['card__author']}>{card.authors}</p>
      </div>
      <LikeBtn
        className={s['card__button-like']}
        isLiked={isLiked}
        onClick={handleLikeClick}
      />
    </li>
  );
};

export default BookCard;
