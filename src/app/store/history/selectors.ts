import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export const selectHistory = (state: RootState) => state.history;

export const selectHistoryStatus = createSelector(selectHistory, (history) => {
  return history.status;
});

export const selectHistoryError = createSelector(selectHistory, (history) => {
  return history.error;
});

export const selectHistoryDataArr = createSelector(selectHistory, (history) => {
  return history.searchHistory;
});
