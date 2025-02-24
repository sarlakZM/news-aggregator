import {
  API_KEY_NEWSAPI,
  URL_NEWSAPI,
  API_KEY_NEWYORKTIMES,
  URL_NEWYORKTIMES,
  API_KEY_THEGUARDIANNEWS,
  URL_THEGUARDIANNEWS,
} from './constants'
import { ApiTypeMapConfig } from '../types/api.type'

export const API_CONFIGS: ApiTypeMapConfig = {
  newsapi: {
    url: `${URL_NEWSAPI}/top-headlines`,
    apiKey: API_KEY_NEWSAPI,
    responseType: 'newsapi' as const,
  },
  bbc: {
    url: `${URL_NEWSAPI}/top-headlines`,
    apiKey: API_KEY_NEWSAPI,
    responseType: 'bbc' as const,
  },
  nytimes: {
    url: URL_NEWYORKTIMES,
    apiKey: API_KEY_NEWYORKTIMES,
    responseType: 'nytimes' as const,
  },
  guardian: {
    url: URL_THEGUARDIANNEWS,
    apiKey: API_KEY_THEGUARDIANNEWS,
    responseType: 'guardian' as const,
  },
}
