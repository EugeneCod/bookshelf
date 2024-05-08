import {
  selectFavoritesStatus,
  selectFavoritesError,
  selectFavoritesIds,
} from '../app/store/favorites/selectors';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { selectUserId } from '../app/store/user/selectors';
import {
  addFavoritesId,
  removeFavoritesId,
} from '../app/store/favorites/slice';

export const useFavorites = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const favorites = useAppSelector(selectFavoritesIds);
  const status = useAppSelector(selectFavoritesStatus);
  const error = useAppSelector(selectFavoritesError);

  function addToFavorites(bookId: string) {
    userId && dispatch(addFavoritesId({ userId, bookId }));
  }

  function removeFromFavorites(bookId: string) {
    userId && dispatch(removeFavoritesId({ userId, bookId }));
  }

  function checkIsLiked(bookId: string | undefined) {
    return bookId ? favorites.includes(bookId) : false;
  }

  return {
    favorites,
    status,
    error,
    addToFavorites,
    removeFromFavorites,
    checkIsLiked,
  };
};
