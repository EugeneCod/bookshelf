import { useEffect, useState } from 'react';

import BookCard from '../../components/BookCard/BookCard';
import stubImage from '../../assets/img/stub-image.png';

import s from './Home.module.scss';

import type { BooksApiData, LocalBookFullData } from '../../@types.ts/booksApi';

const Home = () => {
  const [books, setBooks] = useState<LocalBookFullData[]>([]);

  async function getBooks() {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=alfabet&startIndex=0&maxResults=12&key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
    );
    return response.ok ? await response.json() : Promise.reject(response);
  }

  useEffect(() => {
    getBooks().then((booksData: BooksApiData) => {
      const localBookData: LocalBookFullData[] = booksData.items.map((item) => {
        const imageLinks = item.volumeInfo.imageLinks || {
          smallThumbnail: stubImage,
          thumbnail: stubImage,
        };
        const result = {
          title: item.volumeInfo.title,
          authors:
            item.volumeInfo.authors?.join(', ') ||
            'The authors is not specified',
          id: item.id,
          imageLinks,
          averageRating: String(item.volumeInfo.averageRating) || 'n/a',
          categories:
            item.volumeInfo.categories?.join(', ') ||
            'Categories are not specified',
          description:
            item.volumeInfo.description || 'The description is not specified',
          pageCount: item.volumeInfo.pageCount?.toString() || 'n/a',
          publishedDate:
            item.volumeInfo.publishedDate ||
            'The publication date is not specified',
          previewLink: item.volumeInfo.previewLink || '/',
        };
        return result;
      });
      setBooks(localBookData);
    });
  }, []);

  function handleCardLike(bookData: LocalBookFullData) {}

  return (
    <main className={s['home']}>
      <div className={s['home__container']}>
        <h1 className={s['home__title']}>Collection of books</h1>
        <ul className={s['card-list']}>
          {books.map((book) => {
            return (
              <BookCard
                key={book.id}
                card={book}
                onCardLike={handleCardLike}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Home;
