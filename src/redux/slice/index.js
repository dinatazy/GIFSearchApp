import { combineReducers } from '@reduxjs/toolkit'
import searchReducer from './Search';

export const reducer = combineReducers({
  search: searchReducer,
});

