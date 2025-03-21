import { configureStore } from '@reduxjs/toolkit';

import habitsReducer from './habit-slice';

const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
