import { request } from '../../api/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSearchResults = createAsyncThunk('search/getSearchResults', async (data, thunkApi) => {
  try {
    console.log('before calling api 2')
    const response = await request('GET', 'gifs/search', data, null);
    console.log('response', response)
    return []
  } catch (err) {
    return false;
  }
});


