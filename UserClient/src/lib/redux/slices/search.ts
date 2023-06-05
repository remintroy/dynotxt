import { createSlice } from "@reduxjs/toolkit";

const initialState: { blogResults: any } = {
  blogResults: {},
};

const searchSlice = createSlice({
  initialState,
  name: "search",
  reducers: {
    addBlogSearchResults: (state, action) => {
      state.blogResults = { ...state.blogResults, [action.payload.key]: action.payload.value };
    },
  },
});

export const { addBlogSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
