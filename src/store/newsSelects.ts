import { createSelector } from 'reselect'
import { RootState } from './store'

const selectNewsState = (state: RootState) => state

export const memoizedSelectArticles = createSelector(
  [selectNewsState],
  (news: RootState) => news.articles
)
export const memoizedSelectPreferred = createSelector(
  [selectNewsState],
  (news: RootState) => news.preferredFeed
)
