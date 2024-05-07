import { createAppSlice } from '../createAppSlice';
import {
  addFavotitesBookToFS,
  getFavotitesBooksFromFS,
  removeFavotitesBookFromFS,
} from '../../../utils/favoritesApi';
import { DATABASE_ERROR_MESSAGES } from '../../../utils/constants';

import { Status } from './types';

import type {
  AsyncThunkConfig,
  GetFavoritesPayload,
  RemoveFavoritesPayload,
  SetFavoritesPayload,
} from './types';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LocalBookShortData } from '../books/types';

const { ADD_ERROR, REMOVE_ERROR, GET_ERROR } =
  DATABASE_ERROR_MESSAGES.FAVORITES;
export interface FavoritesSliceState {
  status: Status;
  error: undefined | string;
  favoritesBooks: LocalBookShortData[];
}

const initialState: FavoritesSliceState = {
  status: Status.IDLE,
  error: undefined,
  favoritesBooks: [],
};

const favoritesSlice = createAppSlice({
  name: 'favorites',
  initialState,
  reducers: (create) => ({
    clearFaforites: create.reducer(() => initialState),

    getFavoritesBooks: create.asyncThunk<
      LocalBookShortData[],
      GetFavoritesPayload,
      AsyncThunkConfig
    >(
      async ({ userId }, { rejectWithValue }) => {
        try {
          const booksData = await getFavotitesBooksFromFS(userId);
          return booksData;
        } catch (error) {
          return rejectWithValue(GET_ERROR);
        }
      },
      {
        pending: (state) => {
          state.status = Status.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = Status.SUCCESS;
          state.favoritesBooks = action.payload;
        },
        rejected: (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
        },
      },
    ),

    addFavoritesBook: create.asyncThunk<
      LocalBookShortData,
      SetFavoritesPayload,
      AsyncThunkConfig
    >(
      async ({ userId, bookData }, { rejectWithValue }) => {
        try {
          await addFavotitesBookToFS(userId, bookData);
          return bookData;
        } catch (error) {
          return rejectWithValue(ADD_ERROR);
        }
      },
      {
        pending: (state) => {
          state.status = Status.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = Status.SUCCESS;
          state.favoritesBooks.push(action.payload);
        },
        rejected: (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
        },
      },
    ),

    removeFavoritesBook: create.asyncThunk<
      string,
      RemoveFavoritesPayload,
      AsyncThunkConfig
    >(
      async ({ userId, bookId }, { rejectWithValue }) => {
        try {
          await removeFavotitesBookFromFS(userId, bookId);
          return bookId;
        } catch (error) {
          return rejectWithValue(REMOVE_ERROR);
        }
      },
      {
        pending: (state) => {
          state.status = Status.LOADING;
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = Status.SUCCESS;
          const removedBookId = action.payload;
          const newFavoritesBooks = state.favoritesBooks.filter(
            ({ id }) => removedBookId !== id,
          );
          state.favoritesBooks = newFavoritesBooks;
        },
        rejected: (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
        },
      },
    ),
  }),
});

export const {
  getFavoritesBooks,
  addFavoritesBook,
  removeFavoritesBook,
  clearFaforites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
