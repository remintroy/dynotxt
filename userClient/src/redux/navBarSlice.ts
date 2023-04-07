import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: true,
  nav: {
    path: "",
    title: "",
  },
  loading: false,
  error: false,
};

export const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    clearNavBar: (state) => {
      state.nav = {
        path: "/",
        title: "",
      };
    },
    setNavBarData: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { clearNavBar, setNavBarData } = navBarSlice.actions;

export default navBarSlice.reducer;
