import { createListenerMiddleware } from '@reduxjs/toolkit';

import { clearFaforites, getFavoritesBooks } from '../favorites/slice';
import { clearHistory, getUserHistory } from '../history/slice';
import { removeUser, setUser } from '../user/slice';

import type { TypedStartListening } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../store';

export const checkAuthMiddleware = createListenerMiddleware();

const startTypedListening =
  checkAuthMiddleware.startListening as TypedStartListening<
    RootState,
    AppDispatch
  >;

startTypedListening({
  actionCreator: setUser,
  effect: (action, { dispatch }) => {
    dispatch(getUserHistory({ userId: action.payload.id }));
    dispatch(getFavoritesBooks({ userId: action.payload.id }));
  },
});

startTypedListening({
  actionCreator: removeUser,
  effect: (_, { dispatch }) => {
    dispatch(clearHistory());
    dispatch(clearFaforites());
  },
});
