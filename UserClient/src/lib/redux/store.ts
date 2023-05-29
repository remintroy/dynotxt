import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import navBarSlice from "./slices/navbar";
import profileSlice from "./slices//profile";
import configSlice from "./slices/config";
import { userApiMiddleware, userApiReducer, userApiReducerPath } from "../api/authApi";
import { blogApiMiddleware, blogApiReducer, blogApiReducerPath } from "../api/blogApi";

const store = configureStore({
  reducer: {
    user: userSlice,
    navbar: navBarSlice,
    config: configSlice,
    profile: profileSlice,
    [userApiReducerPath]: userApiReducer,
    [blogApiReducerPath]: blogApiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiMiddleware).concat(blogApiMiddleware),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
