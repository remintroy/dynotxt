import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thisIsPc: true,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfigState: (state, action) => {
      state = { ...state, ...action.payload };
    },
    setThisIsPcConfig: (state, action) => {
      state.thisIsPc = action.payload ? true : false;
    },
    resetConfig: (state) => {
      state = {
        thisIsPc: true,
      };
    },
  },
});

export const { setConfigState,setThisIsPcConfig, resetConfig } = configSlice.actions;

export default configSlice.reducer;
