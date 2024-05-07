import { get, set, ref, remove } from 'firebase/database';

import { db } from '../firebase';

import type { LocalBookShortData } from '../app/store/books/types';

function getBooksRef(userId: string, bookId?: string) {
  return arguments.length === 1
    ? ref(db, `users/${userId}/books`)
    : ref(db, `users/${userId}/books/${bookId}`);
}

export const addFavotitesBookToFS = async (
  userId: string,
  bookData: LocalBookShortData,
) => {
  try {
    const bookByIdRef = getBooksRef(userId, bookData.id);
    await set(bookByIdRef, bookData);
    return 'ok';
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeFavotitesBookFromFS = async (
  userId: string,
  bookId: string,
) => {
  try {
    const bookByIdRef = getBooksRef(userId, bookId);
    await remove(bookByIdRef);
    return 'ok';
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFavotitesBooksFromFS = async (userId: string) => {
  try {
    const booksRef = getBooksRef(userId);
    const snapshot = await get(booksRef);
    const snapshotValue: Record<string, LocalBookShortData> | null =
      snapshot.val();
    return snapshotValue ? Object.values(snapshotValue) : [];
  } catch (error) {
    return Promise.reject(error);
  }
};
