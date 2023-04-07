import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import navBarSlice from "./navBarSlice";
import configSlice from "./configSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    config: configSlice,
    navBar: navBarSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
