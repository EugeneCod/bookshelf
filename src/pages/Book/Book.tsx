import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { LikeBtn, Preloader } from '../../components';
import { useGetBookByIdQuery } from '../../app/store/books/booksApi';

import s from './Book.module.scss';

const Book = () => {
  const { id } = useParams();

  // TODO синхронизировать состояние лайка с хранилищем
  const [isLiked, setIsLiked] = useState(false);

  const { data: bookData, isLoading } = useGetBookByIdQuery(id);

  function handleLikeClick() {
    setIsLiked((pending) => !pending);
  }

  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>More about the book</h1>
        {!!bookData && (
          <div className={s['card']}>
            <div className={s['card__image-container']}>
              <LikeBtn isLiked={isLiked} onClick={handleLikeClick} />
              <img
                className={s['card__image']}
                src={bookData.imageLink}
                alt="Book Cover"
              />
            </div>
            <div className={s['card__props-container']}>
              <h2 className={s['card__title']}>{bookData.title}</h2>
              <span className={s['card__averageRating']}>
                {`★ : ${bookData.averageRating || 'n/a'}`}
              </span>
              <p
                className={s['card__authors']}
              >{`Authors: ${bookData.authors}`}</p>
              <p
                className={s['card__categories']}
              >{`Categories: ${bookData.categories}`}</p>
              <p
                className={s['card__published']}
              >{`Piblished: ${bookData.publishedDate}`}</p>
              <p
                className={s['card__page-count']}
              >{`Page count:  ${bookData.pageCount}`}</p>
              <a
                className={s['card__store-link']}
                href={bookData.previewLink || ''}
              >
                View in the online store
              </a>
            </div>
            <p className={s['card__description']}>{bookData.description}</p>
          </div>
        )}
        {isLoading && <Preloader />}
      </div>
    </main>
  );
};

export default Book;
