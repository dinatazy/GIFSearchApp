import { request } from '../../api/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSearchResults = createAsyncThunk('search/getSearchResults', async (data, thunkApi) => {
  try {
    const response = await request('GET', 'gifs/search', data, null);
    console.log('response', response)
    return response.data
  } catch (err) {
    console.log('rr', err)
    return false;
  }
});


