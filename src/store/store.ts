import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './newsSlice'
import preferredFeedSlice from './preferredFeedSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    preferredFeed: preferredFeedSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
