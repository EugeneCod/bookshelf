export interface UserSliceState {
  email: string | null;
  id: string | null;
  isLoading: boolean;
}

export interface AuthData {
  email: string;
  password: string;
};

export type SetUserPayload = {
  email: string | null;
  id: string;
};

