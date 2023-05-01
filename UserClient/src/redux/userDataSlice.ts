import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: {},
  error: false,
  loading: false,
};

const userDataSlice = createSlice({
  initialState,
  name: "userDataSlice",
  reducers: {
    pushUser: (state, action) => {
      state.list = { ...state.list, ...action.payload };
    },
  },
});

export const { pushUser } = userDataSlice.actions;
export default userDataSlice.reducer;
