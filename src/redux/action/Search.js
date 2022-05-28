import { request } from '../../api/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSearchResults = createAsyncThunk('search/getSearchResults', async (params,thunkAPI) => {
  try {
    const { gifList } = thunkAPI.getState().search
    let { offset } = params;
    let updatedGifList = []
    const response = await request('GET', 'gifs/search', params, null);
    if (response.data) {
      if (offset > 0) {
        updatedGifList = [...gifList, ...response.data.data];
      } else {
        updatedGifList = [...response.data.data];
      }
      return { ok: true, updatedGifList, pagination: response.data.pagination }
    } else {
      return { ok: false }
    }
  } catch (err) {
    return false;
  }
});


