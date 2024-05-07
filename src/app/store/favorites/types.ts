import { LocalBookShortData } from '../books/types';

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'succeeded',
  FAILED = 'failed',
}

export type AsyncThunkConfig = {
  rejectValue: string;
};

export interface GetFavoritesPayload {
  userId: string;
}

export interface SetFavoritesPayload extends GetFavoritesPayload {
  bookData: LocalBookShortData;
}

export interface RemoveFavoritesPayload extends GetFavoritesPayload {
  bookId: string;
}
