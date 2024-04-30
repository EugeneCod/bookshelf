import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './user/slice';

import type { Action, ThunkAction } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ user: userReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
