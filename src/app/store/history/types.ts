export interface HistorySliceState {
  status: Status;
  error: undefined | string;
  searchHistory: HistoryData[];
}

export interface PriorHistoryData {
  dateTime: string;
  searchQuery: string;
}

export interface HistoryData extends PriorHistoryData {
  historyId: string;
}

export interface GetHistoryData {
  userId: string;
}

export interface RemoveHistoryData extends GetHistoryData {
  historyId: string;
}

export interface AddHistoryData extends GetHistoryData {
  priorHistoryData: PriorHistoryData;
}

export type AsyncThunkConfig = {
  rejectValue: string;
};

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'succeeded',
  FAILED = 'failed',
}
