import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  allBlogsMetaData: any;
  allBlogs: any;
  privateBlogs: any;
  publicBlogs: any;
  user: any;
  loading: boolean;
  error: boolean;
} = {
  allBlogsMetaData: {},
  allBlogs: {},
  privateBlogs: {},
  publicBlogs: {},
  user: null,
  loading: false,
  error: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.allBlogsMetaData = {};
      state.allBlogs = {};
      state.error = false;
      state.loading = false;
      state.privateBlogs = {};
      state.publicBlogs = {};
      state.user = null;
    },
    addBlogToAllBlogsProfile: (state, action) => {
      state.allBlogs[action.payload?.blogId] = action.payload;
    },
    setAllBlogsMetaDataProfile: (state, action) => {
      state.allBlogsMetaData = action.payload;
    },
  },
});

export const { resetProfile, addBlogToAllBlogsProfile, setAllBlogsMetaDataProfile } = profileSlice.actions;
export default profileSlice.reducer;
