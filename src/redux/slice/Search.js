import { createSlice } from '@reduxjs/toolkit'
import { getSearchResults } from '../action/Search'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: []
  },
  reducers: {
    extraReducers: {
      [getSearchResults.fulfilled]: (state, action) => {
        state.results = action.payload.results;
      },
    }
  },

})

export default searchSlice.reducer

