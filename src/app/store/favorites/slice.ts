import { createAppSlice } from '../createAppSlice';
import {
  addFavotitesId,
  getFavotitesIds,
  removeFavotitesId,
} from '../../../utils/favoritesApi';
import { DATABASE_ERROR_MESSAGES } from '../../../utils/constants';
import { Status } from '../../@types';

import type {
  AsyncThunkConfig,
  FavoritesSliceState,
  GetFavoritesPayload,
  RemoveFavoritesPayload,
  SetFavoritesPayload,
} from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

const { ADD_ERROR, REMOVE_ERROR, GET_ERROR } =
  DATABASE_ERROR_MESSAGES.FAVORITES;

const initialState: FavoritesSliceState = {
  status: Status.IDLE,
  error: undefined,
  favoritesIds: [],
};

const favoritesSlice = createAppSlice({
  name: 'favorites',
  initialState,
  reducers: (create) => ({
    clearFaforites: create.reducer(() => initialState),

    getFavoritesIds: create.asyncThunk<
      string[],
      GetFavoritesPayload,
      AsyncThunkConfig
    >(
      async ({ userId }, { rejectWithValue }) => {
        try {
          const favoritesIds = await getFavotitesIds(userId);
          return favoritesIds;
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
          state.favoritesIds = action.payload;
        },
        rejected: (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
        },
      },
    ),

    addFavoritesId: create.asyncThunk<
      string,
      SetFavoritesPayload,
      AsyncThunkConfig
    >(
      async ({ userId, bookId }, { rejectWithValue }) => {
        try {
          await addFavotitesId(userId, bookId);
          return bookId;
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
          state.favoritesIds.push(action.payload);
        },
        rejected: (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
        },
      },
    ),

    removeFavoritesId: create.asyncThunk<
      string,
      RemoveFavoritesPayload,
      AsyncThunkConfig
    >(
      async ({ userId, bookId }, { rejectWithValue }) => {
        try {
          await removeFavotitesId(userId, bookId);
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
          const newFavoritesBooks = state.favoritesIds.filter(
            (id) => removedBookId !== id,
          );
          state.favoritesIds = newFavoritesBooks;
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
  getFavoritesIds,
  addFavoritesId,
  removeFavoritesId,
  clearFaforites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
