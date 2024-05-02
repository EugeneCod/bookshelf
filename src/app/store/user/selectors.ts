import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export const selectUser = (state: RootState) => state.user;

export const selectUserIsAuth = createSelector(selectUser, (user) => {
  return !!user.email;
});

export const selectUserIsLoading = createSelector(selectUser, (user) => {
  return user.isLoading;
});


