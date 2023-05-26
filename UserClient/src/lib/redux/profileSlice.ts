import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  allBlogsMetaData: any;
  allBlogs: any;
  trashedBlogs: any;
  trashedBlogsMetaData: any;
  privateBlogs: any;
  publicBlogs: any;
  user: any;
  loading: boolean;
  error: boolean;
} = {
  allBlogsMetaData: {},
  allBlogs: {},
  trashedBlogs: {},
  trashedBlogsMetaData: {},
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
    addBlogToTrashedBlogsProfile: (state, action) => {
      state.trashedBlogs[action.payload?.blogId] = action.payload;
    },
    setTrashedBlogsMetaDataProfile: (state, action) => {
      state.trashedBlogsMetaData = action.payload;
    },
  },
});

export const {
  resetProfile,
  addBlogToAllBlogsProfile,
  setAllBlogsMetaDataProfile,
  addBlogToTrashedBlogsProfile,
  setTrashedBlogsMetaDataProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
