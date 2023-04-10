import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserSlice } from "./type";
import { authBackend } from "../configs/axios";

const initialState: IUserSlice = {
  data: null,
  loading: false,
  error: null,
  accessToken: null,
};

export const fetchUserData = createAsyncThunk("api/get_user_data", async () => {
  const { data } = await authBackend.get("/user_data");
  return data?.email ? data : null;
});

export const refreshToken = createAsyncThunk("api/refresh_token", async () => {
  const { data } = await authBackend.get("/refresh");
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.accessToken = null;
    },
    setUser: (state, action) => {
      state.data = action.payload;
      state.accessToken = action.payload?.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.accessToken = action.payload?.accessToken;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
