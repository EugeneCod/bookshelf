import { useParams } from 'react-router-dom';

import { useFavorites } from '../../hooks/useFavorites';
import { LikeBtn, Preloader } from '../../components';
import { useGetBookByIdQuery } from '../../app/store/books/booksApi';
import { Status } from '../../app/@types/';
import { useAppSelector } from '../../app/store/hooks';
import { selectUserIsAuth } from '../../app/store/user/selectors';

import s from './Book.module.scss';

const Book = () => {
  const { id } = useParams();
  const { checkIsLiked, status, addToFavorites, removeFromFavorites } =
    useFavorites();
  const { data: bookData, isLoading, isError } = useGetBookByIdQuery(id);

  const isAuth = useAppSelector(selectUserIsAuth);
  const isLiked = checkIsLiked(id);

  function handleLikeClick() {
    if (status === Status.LOADING || !bookData) {
      return;
    }
    if (!isLiked) {
      addToFavorites(bookData.id)
    } else {
      removeFromFavorites(bookData.id)
    }
  }

  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>More about the book</h1>
        {!!bookData && (
          <div className={s['card']}>
            <div className={s['card__image-container']}>
              {isAuth && (
                <LikeBtn isLiked={isLiked} onClick={handleLikeClick} />
              )}
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
        {isError && (
          <p className={s['page__error-message']}>
            An error occurred while uploading information about the book...
          </p>
        )}
      </div>
    </main>
  );
};

export default Book;
