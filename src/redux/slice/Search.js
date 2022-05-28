import { createSlice } from '@reduxjs/toolkit'
import { getSearchResults } from '../action/Search'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    gifList: []
  },
  extraReducers: {
    [getSearchResults.fulfilled]: (state, action) => {
      action.payload.data ? state.gifList = action.payload.data : null;
    },
  }
})

export default searchSlice.reducer

