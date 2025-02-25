import { ApiResponse, NewsRequestParams } from "./api.type"

export interface ArticlesState {
    articles: ApiResponse
    total: number
    loading: boolean
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    filters: NewsRequestParams
}
  

export interface preferredFeedState {
    sources: Array<string>
    categories: Array<string>
    authors: Array<string>
}