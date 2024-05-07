import {
  selectFavoritesStatus,
  selectFavoritesError,
  selectFavoritesBooks,
} from '../app/store/favorites/selectors';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { selectUserId } from '../app/store/user/selectors';
import {
  addFavoritesBook,
  removeFavoritesBook,
} from '../app/store/favorites/slice';

import type { LocalBookShortData } from '../app/store/books/types';

export const useFavorites = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const favorites = useAppSelector(selectFavoritesBooks);
  const status = useAppSelector(selectFavoritesStatus);
  const error = useAppSelector(selectFavoritesError);

  function addToFavorites(bookData: LocalBookShortData) {
    userId && dispatch(addFavoritesBook({ userId, bookData }));
  }

  function removeFromFavorites(bookId: string) {
    userId && dispatch(removeFavoritesBook({ userId, bookId }));
  }

  return { favorites, status, error, addToFavorites, removeFromFavorites };
};
