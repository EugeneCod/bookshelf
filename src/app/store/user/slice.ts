import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserSliceState } from './types';

const initialState: UserSliceState = {
  email: null,
  id: null,
  isLoading: false,
};

type SetUserPayload = {
  email: string | null;
  id: string;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: ((state, action: PayloadAction<SetUserPayload>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
    }),
    removeUser: ((state) => {
      state.email = null;
      state.id = null;
    }),
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
