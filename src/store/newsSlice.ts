import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAndCombineArticles } from '../services/news.service'
import { ApiResponse } from '../types/api.type'
import { ArticlesState } from '../types/state.type'


const initialState: ArticlesState = {
  articles: [],
  total: 0,
  loading: false,
  status: 'idle',
  error: null,
  filters: {
    searchKeyword: '',
    category: 'technology',
    source: '',
    fromDate: undefined,
  },
}

export const fetchArticlesAsync = createAsyncThunk(
  'articles/fetchArticles',
  async (pass: any, { getState }): Promise<ApiResponse> => {
    const state = getState() as any
    const params = { ...state.articles.filters }
    const response = await fetchAndCombineArticles(params)
    return response
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: (create) => ({
    changeSearchKeyword: create.reducer<string>((state, action) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          searchKeyword: action.payload,
        },
      }
    }),
    changeFiltersSource: create.reducer<any>((state, action) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          source: action.payload.source,
        },
      }
    }),
    changeFiltersCategory: create.reducer<any>((state, action) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.payload.category,
        },
      }
    }),
    changeFiltersDate: create.reducer<any>((state, action) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          fromDate: action.payload.fromDate,
        },
      }
    }),
    filterArticlesByPreferredFeed: create.reducer<any>((state, action) => {
      return {
        ...state,
        articles: [
          ...state.articles.filter((article) =>
            article.author?.includes(action.payload.value)
          ),
        ],
      }
    }),
  }),
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchArticlesAsync.pending, (state: ArticlesState) => {
        state.loading = true
        state.error = null
        state.status = 'loading'
      })
      .addCase(
        fetchArticlesAsync.fulfilled,
        (state: ArticlesState, action: any) => {
          state.loading = false
          state.status = 'succeeded'
          state.articles = action.payload
          state.total = state.articles.length
        }
      )
      .addCase(
        fetchArticlesAsync.rejected,
        (state: ArticlesState, action: any) => {
          state.loading = false
          state.error = action.error.message || 'Error fetching articles'
          state.status = 'failed'
        }
      )
  },
})

export const {
  changeSearchKeyword,
  changeFiltersSource,
  changeFiltersCategory,
  changeFiltersDate,
  filterArticlesByPreferredFeed,
} = articlesSlice.actions
export default articlesSlice.reducer
