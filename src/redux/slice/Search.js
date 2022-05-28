import { createSlice } from '@reduxjs/toolkit'
import { getSearchResults } from '../action/Search'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    gifList: []
  },
  extraReducers: {
    [getSearchResults.fulfilled]: (state, action) => {
      action.payload.updatedGifList ? state.gifList = action.payload.updatedGifList : null;
    },
  }
})

export default searchSlice.reducer

