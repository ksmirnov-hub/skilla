import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slice/filters.slice';

import { callsApi } from './api/calls.api';
export * from './api/calls.api';

export * from './slice/filters.slice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        [callsApi.reducerPath]: callsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(callsApi.middleware)
  });
  