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

import type { PriorHistoryData } from '../app/store/history/types';

export const useHistory = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const history = useAppSelector(selectHistoryDataArr);
  const status = useAppSelector(selectHistoryStatus);
  const error = useAppSelector(selectHistoryError);

  function addHistory(priorHistoryData: PriorHistoryData) {
    userId && dispatch(addUserHistory({ userId, priorHistoryData }));
  }

  function removeHistory(historyId: string) {
    userId && dispatch(removeUserHistory({ userId, historyId }));
  }

  function clearHistory() {
    userId && dispatch(removeAllUserHistory({ userId }));
  }

  return { history, status, error, addHistory, removeHistory, clearHistory };
};
