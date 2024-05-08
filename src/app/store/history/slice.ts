import {
  requestAdditionRecord,
  requestRecords,
  requestToClearRecords,
  requestToDeleteRecord,
} from '../../../utils/historyApi';
import { createAppSlice } from '../createAppSlice';
import { DATABASE_ERROR_MESSAGES } from '../../../utils/constants';
import { Status } from '../../@types/';

import type {
  AddHistoryData,
  RemoveHistoryData,
  GetHistoryData,
  HistoryData,
  HistorySliceState,
  AsyncThunkConfig,
} from './types';

const { ADD_ERROR, REMOVE_ERROR, GET_ERROR } = DATABASE_ERROR_MESSAGES.HISTORY;

const initialState: HistorySliceState = {
  status: Status.IDLE,
  error: undefined,
  searchHistory: [],
};

const historySlice = createAppSlice({
  name: 'history',
  initialState,
  reducers: (create) => ({
    clearHistory: create.reducer(() => initialState),

    getUserHistory: create.asyncThunk<
      HistoryData[],
      GetHistoryData,
      AsyncThunkConfig
    >(
      async ({ userId }, { rejectWithValue }) => {
        try {
          const historyDataArr = await requestRecords(userId);
          return historyDataArr;
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
          state.searchHistory = action.payload;
        },
        rejected: (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
        },
      },
    ),
    addUserHistory: create.asyncThunk<
      HistoryData,
      AddHistoryData,
      AsyncThunkConfig
    >(
      async ({ userId, priorHistoryData }, { rejectWithValue }) => {
        try {
          const historyData = await requestAdditionRecord(userId, priorHistoryData);
          return historyData;
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
          state.searchHistory.push(action.payload);
        },
        rejected: (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
        },
      },
    ),
    removeUserHistory: create.asyncThunk<
      string,
      RemoveHistoryData,
      AsyncThunkConfig
    >(
      async ({ userId, historyId }, { rejectWithValue }) => {
        try {
          const removedHistoryId = await requestToDeleteRecord(userId, historyId);
          return removedHistoryId;
        } catch (error) {
          return rejectWithValue(REMOVE_ERROR);
        }
      },
      {
        pending: (state) => {
          state.status = Status.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = Status.SUCCESS;
          const removedHistoryId = action.payload;
          const newSearchHistory = state.searchHistory.filter(
            ({ historyId }) => historyId !== removedHistoryId,
          );
          state.searchHistory = newSearchHistory;
        },
        rejected: (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
        },
      },
    ),
    removeAllUserHistory: create.asyncThunk<
      void,
      GetHistoryData,
      AsyncThunkConfig
    >(
      async ({ userId }, { rejectWithValue, dispatch }) => {
        try {
          await requestToClearRecords(userId);
          dispatch(clearHistory());
        } catch (error) {
          return rejectWithValue(REMOVE_ERROR);
        }
      },
      {
        pending: (state) => {
          state.status = Status.LOADING;
        },
        fulfilled: (state) => {
          state.status = Status.SUCCESS;
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
  clearHistory,
  getUserHistory,
  addUserHistory,
  removeUserHistory,
  removeAllUserHistory,
} = historySlice.actions;
export default historySlice.reducer;
