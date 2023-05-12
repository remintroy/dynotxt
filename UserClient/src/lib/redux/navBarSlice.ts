import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: true,
  nav: {
    path: "",
    title: "",
  },
  allowBottomNav: true,
  loading: false,
  error: false,
};

export const navBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    clearNavBar: (state) => {
      state.nav = {
        path: "/",
        title: "",
      };
      state.allowBottomNav = true;
    },
    allowBottomNav: (state, action) => {
      state.allowBottomNav = action.payload ? true : false;
    },
    setNavBarData: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { clearNavBar, setNavBarData, allowBottomNav } = navBarSlice.actions;

export default navBarSlice.reducer;
