import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  data: {
    uid: string;
    name: string;
    phone: string;
    email: string;
    accessToken: string;
    lastLogin: string;
    photoURL: string;
    dob: string;
    gender: string;
    privateAccount: boolean;
  } | null;
  loading: boolean;
  error: boolean;
  accessToken: string | null;
}

const initialState: UserState = {
  data: null,
  accessToken: null,
  error: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.accessToken = null;
      state.error = false;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.data = action.payload;
      if (action.payload?.accessToken) state.accessToken = action.payload?.accessToken;
    },
    refresh: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserStatus: (state, action) => {
      if (action.payload.loading) state.loading = action.payload?.loading;
      if (action.payload.error) state.error = action.payload?.error;
    },
    resetUserData: (state) => {
      state.data = null;
      state.accessToken = null;
      state.error = false;
      state.loading = false;
    },
  },
});

export const { logout, resetUserData, refresh, setUser, setUserStatus } = userSlice.actions;
export default userSlice.reducer;
