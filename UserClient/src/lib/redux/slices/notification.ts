import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  list: // | [
  //     {
  //       readed?: boolean;
  //       data?: any;
  //       type?: string;
  //       createdAt?: boolean;
  //     }
  //   ]
  any[];
  loading: boolean;
}

const initialState: initialState = {
  list: [],
  loading: false,
};

const notificationSlice = createSlice({
  initialState,
  name: "notification",
  reducers: {
    addNotification: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    clearAllNotifications: (state) => {
      state.list = [];
    },
    setNotifications: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { addNotification, clearAllNotifications, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
