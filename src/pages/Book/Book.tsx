import {  useState } from 'react';

import { LikeBtn, Preloader } from '../../components';
import stubImage from '../../assets/img/stub-image.png';

import s from './Book.module.scss';

// TODO убрать заглушку
const bookData = {
  title: 'Мастер и Маргарита',
  authors: 'М.А. Булгаков',
  id: '666',
  averageRating: '4.5',
  categories: 'Fiction',
  description:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi corrupti voluptatem accusantium quo quisquam illum deleniti tempora magni quibusdam assumenda quasi consequatur, consequuntur, dolorem fugit inventore quidem asperiores officia. Enim voluptatem repellat suscipit vero! Pariatur unde nam at quibusdam ut distinctio eveniet nemo blanditiis illo alias? Iusto, recusandae nemo fugit labore accusamus nulla magni.',
  imageLinks: {
    smallThumbnail:
      'https://clipart-library.com/images_k/book-stack-transparent-background/book-stack-transparent-background-18.jpg',
    thumbnail:
      'https://clipart-library.com/images_k/book-stack-transparent-background/book-stack-transparent-background-18.jpg',
  },
  pageCount: '500',
  publishedDate: '1939-10-30',
  previewLink:
    'https://books.google.ru/books?id=R6t0zQEACAAJ&dq=alfabet&hl=&as_brr=7&cd=7&source=gbs_api',
};

const Book = () => {
  const isLoading = false;
  // TODO синхронизировать состояние лайка с хранилищем
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked((pending) => !pending);
  }

  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>More about the book</h1>
        {isLoading ? (
          <Preloader />
        ) : (
          <div className={s['card']}>
            <div className={s['card__image-container']}>
              <LikeBtn isLiked={isLiked} onClick={handleLikeClick} />
              <img
                className={s['card__image']}
                src={bookData.imageLinks.thumbnail || stubImage}
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
            <p className={s['card__description']}>
              {bookData.description}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Book;
