import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const selectFavorites = (state: RootState) => state.favorites;

export const selectFavoritesStatus = createSelector(
  selectFavorites,
  (favorites) => {
    return favorites.status;
  },
);

export const selectFavoritesError = createSelector(
  selectFavorites,
  (favorites) => {
    return favorites.error;
  },
);

export const selectFavoritesIds = createSelector(
  selectFavorites,
  (favorites) => {
    return favorites.favoritesIds;
  },
);
