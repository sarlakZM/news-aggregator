import { createSlice } from '@reduxjs/toolkit'

interface preferredFeedState {
  sources: Array<string>
  categories: Array<string>
  authors: Array<string>
}

const initialState: preferredFeedState = {
  sources: [],
  categories: [],
  authors: [],
}

const preferredFeedSlice = createSlice({
  name: 'preferredFeed',
  initialState,
  reducers: (create) => ({
    addSourceToPreferred: create.reducer<any>((state, action) => {
      return {
        ...state,
        sources: [...new Set([...state.sources, action.payload])],
      }
    }),
    addCategoryToPreferred: create.reducer<any>((state, action) => {
      return {
        ...state,
        categories: [...new Set([...state.categories, action.payload])],
      }
    }),
    addAuthorToPreferred: create.reducer<any>((state, action) => {
      return {
        ...state,
        authors: [...new Set([...state.authors, action.payload])],
      }
    }),
  }),
})

export const {
  addSourceToPreferred,
  addCategoryToPreferred,
  addAuthorToPreferred,
} = preferredFeedSlice.actions
export default preferredFeedSlice.reducer
