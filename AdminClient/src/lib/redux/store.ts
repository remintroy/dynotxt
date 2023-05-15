import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { authApiMiddleware, authApiReducer, authApiReducerPath } from "../api/authApi";
import { blogApiMiddleware, blogApiReducer, blogApiReducerPath } from "../api/blogApi";
const store = configureStore({
  reducer: {
    user: userSlice,
    [authApiReducerPath]: authApiReducer,
    [blogApiReducerPath]: blogApiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApiMiddleware).concat(blogApiMiddleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
