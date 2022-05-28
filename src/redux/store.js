import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './slice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(logger),
});

