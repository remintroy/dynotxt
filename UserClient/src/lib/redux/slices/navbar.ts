import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showHeader: true,
  showSidebar: true,
  showFooter: true,
  showSidebarWhichIs: null,
  nav: { path: "", title: "" },
};

export const navBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    resetNavbar: (state) => {
      state.showFooter = false;
      state.showHeader = true;
      state.showSidebar = false;
    },
    setNavbarShowState: (state, action) => {
      const settableValue: { key: "showHeader" | "showSidebar" | "showFooter"; value: boolean } = action.payload;
      state[settableValue.key] = settableValue.value;
    },
    setNavBarData: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { resetNavbar, setNavBarData, setNavbarShowState } = navBarSlice.actions;
export default navBarSlice.reducer;
