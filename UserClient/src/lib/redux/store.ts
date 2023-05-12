import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import navBarSlice from "./navBarSlice";
import configSlice from "./configSlice";
import { userApiMiddleware, userApiReducer, userApiReducerPath } from "../api/authApi";
import { blogApiMiddleware, blogApiReducer, blogApiReducerPath } from "../api/blogApi";

const store = configureStore({
  reducer: {
    user: userSlice,
    navbar: navBarSlice,
    config: configSlice,
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
