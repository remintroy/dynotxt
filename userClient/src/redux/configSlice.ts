import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thisIsPc: true,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfigState: (state, action) => {
      state = { ...state, ...action };
    },
    resetConfig: (state) => {
      state = {
        thisIsPc: true,
      };
    },
  },
});

export const { setConfigState, resetConfig } = configSlice.actions;

export default configSlice.reducer;
