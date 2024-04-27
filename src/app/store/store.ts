import { combineSlices, configureStore } from '@reduxjs/toolkit';

import type { Action, ThunkAction } from '@reduxjs/toolkit';

const rootReducer = combineSlices();

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: {},
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
