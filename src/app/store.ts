import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

import habitsReducer from '../features/habit/habit-slice';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      habits: habitsReducer,
    },
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
