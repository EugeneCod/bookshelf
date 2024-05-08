import type { Status } from "../../@types";

export type AsyncThunkConfig = {
  rejectValue: string;
};

export interface FavoritesSliceState {
  status: Status;
  error: undefined | string;
  favoritesIds: string[];
}

export interface GetFavoritesPayload {
  userId: string;
}

export interface SetFavoritesPayload extends GetFavoritesPayload {
  bookId: string;
}

export interface RemoveFavoritesPayload extends GetFavoritesPayload {
  bookId: string;
}
