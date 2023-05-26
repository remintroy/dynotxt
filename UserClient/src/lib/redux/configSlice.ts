import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thisIsPc: window.innerWidth > 766,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfigState: (state, action) => {
      state = { ...state, ...action.payload };
    },
    setConfigThisIsPc: (state, action) => {
      state.thisIsPc = action.payload ? true : false;
    },
    resetConfig: (state) => {
      state = {
        thisIsPc: true,
      };
    },
  },
});

export const { setConfigState,setConfigThisIsPc, resetConfig } = configSlice.actions;

export default configSlice.reducer;
