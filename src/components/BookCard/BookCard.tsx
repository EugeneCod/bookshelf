import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/constants';
import LikeBtn from '../LikeBtn/LikeBtn';

import s from './BookCard.module.scss';

import type { LocalBookShortData } from '../../app/store/books/types';

interface Props {
  card: LocalBookShortData;
  onCardLike: (card: LocalBookShortData) => void;
}

const BookCard = (props: Props) => {
  const { card, onCardLike } = props;
  // TODO синхронизировать состояние лайка с хранилищем
  // const isLiked = useAppSelector((state) => state.favorites.some(item.id === props.card.id))
  const [isLiked, setIsLiked] = useState(false);


  function handleLikeClick() {
    setIsLiked((pending) => !pending);
    onCardLike(card);
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
