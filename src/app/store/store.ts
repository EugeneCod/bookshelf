import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './user/slice';
import { booksApi } from './books/booksApi';

import type { Action, ThunkAction } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
  [booksApi.reducerPath]: booksApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
