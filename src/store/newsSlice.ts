import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAndCombineArticles } from '../services/news.service'
import { ApiResponse, NewsRequestParams } from '../types/api.type'

interface ArticlesState {
  articles: ApiResponse
  loading: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  filters: NewsRequestParams
}

const initialState: ArticlesState = {
  articles: [],
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
    console.info(pass)
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
          ...state.articles.filter((article) => {
            return (
              (action.payload.typeFiterPreferred == 'Sources' &&
                article.originalSource == action.payload.value) ||
              (action.payload.typeFiterPreferred == 'Categories' &&
                article.category == action.payload.value) ||
              (action.payload.typeFiterPreferred == 'Authors' &&
                article.author == action.payload.value)
            )
          }),
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
