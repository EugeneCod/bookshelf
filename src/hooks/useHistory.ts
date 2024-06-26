import { useCallback } from 'react';

import {
  selectHistoryDataArr,
  selectHistoryError,
  selectHistoryStatus,
} from '../app/store/history/selectors';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { selectUserId } from '../app/store/user/selectors';
import {
  addUserHistory,
  removeAllUserHistory,
  removeUserHistory,
} from '../app/store/history/slice';

import type { HistoryData, PriorHistoryData } from '../app/store/history/types';
import type { Status } from '../app/@types';

export const useHistory = (): {
  history: HistoryData[];
  status: Status;
  error: string | undefined;
  addHistory: (priorHistoryData: PriorHistoryData) => void;
  removeHistory: (historyId: string) => void;
  clearHistory: () => void;
} => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const history = useAppSelector(selectHistoryDataArr);
  const status = useAppSelector(selectHistoryStatus);
  const error = useAppSelector(selectHistoryError);

  function addHistory(priorHistoryData: PriorHistoryData) {
    userId && dispatch(addUserHistory({ userId, priorHistoryData }));
  }

  const removeHistory = useCallback(
    (historyId: string) => {
      userId && dispatch(removeUserHistory({ userId, historyId }));
    },
    [dispatch, userId],
  );

  function clearHistory() {
    userId && dispatch(removeAllUserHistory({ userId }));
  }

  return { history, status, error, addHistory, removeHistory, clearHistory };
};
