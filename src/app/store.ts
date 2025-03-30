import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

import { api } from './services/api';
import habitsReducer from '../features/habit/habit-slice';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      habits: habitsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
