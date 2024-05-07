import { get, set, ref, remove } from 'firebase/database';

import { db } from '../firebase';

function getBooksRef(userId: string, bookId?: string) {
  return arguments.length === 1
    ? ref(db, `users/${userId}/books`)
    : ref(db, `users/${userId}/books/${bookId}`);
}

export const addFavotitesId = async (
  userId: string,
  bookId: string,
) => {
  try {
    const bookByIdRef = getBooksRef(userId, bookId);
    await set(bookByIdRef, bookId);
    return 'ok';
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeFavotitesId = async (
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

export const getFavotitesIds = async (userId: string) => {
  try {
    const booksRef = getBooksRef(userId);
    const snapshot = await get(booksRef);
    const snapshotValue: Record<string, string> | null =
      snapshot.val();
    return snapshotValue ? Object.values(snapshotValue) : [];
  } catch (error) {
    return Promise.reject(error);
  }
};
