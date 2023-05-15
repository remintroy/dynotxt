import { createSlice } from "@reduxjs/toolkit";
import { IUserSlice } from "./type";

const initialState: IUserSlice = {
  data: null,
  loading: false,
  error: false, 
  accessToken: null,
};

export const userSlice = createSlice({
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

export const { logout, setUser, refresh, setUserStatus, resetUserData } = userSlice.actions;

export default userSlice.reducer;
