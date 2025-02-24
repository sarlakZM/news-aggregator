import { ApiResponse, NewsRequestParams } from '../types/api.type'
import { API_CONFIGS } from '../utils/api.config'
import {
  matchUrlWithQueryParams,
  processedResponseMaped,
} from '../utils/service.utils'
import { ApiTypesEnum } from '../utils/enums'
import { fetchData } from './api.service'
import { get, set } from 'idb-keyval'

const fetchNewsAGeneric = async (
  newsRequestParams: NewsRequestParams,
  apiType: ApiTypesEnum
): Promise<ApiResponse> => {
  try {
    const apiConfig = API_CONFIGS[apiType]
    if (!apiConfig) {
      throw `Unknown API type: ${apiType}`
    }
    const url = matchUrlWithQueryParams(apiConfig, apiType, newsRequestParams)
    const cachedData = await get(url)
    if (cachedData) {
      return cachedData
    }
    const response = await fetchData(url)
    const data = processedResponseMaped[apiConfig.responseType as ApiTypesEnum](
      response.data
    )
    await set(url, data)
    return data
  } catch (error) {
    console.error(`Error fetching news articles ${apiType}:`, error)
    return []
  }
}

const fetchAndCombineArticles = async (
  newsRequestParams: NewsRequestParams
) => {
  try {
    const [newsArticles, bbcArticles, guardianArticles, nytimesArticles] =
      await Promise.allSettled([
        fetchNewsAGeneric(newsRequestParams, ApiTypesEnum.NewsAPI),
        fetchNewsAGeneric(newsRequestParams, ApiTypesEnum['BBC News']),
        fetchNewsAGeneric(newsRequestParams, ApiTypesEnum['The Guardian']),
        fetchNewsAGeneric(newsRequestParams, ApiTypesEnum['New York Times']),
      ])

    const combinedArticles = [
      ...(newsArticles.status == 'fulfilled' ? newsArticles.value : []),
      ...(bbcArticles.status == 'fulfilled' ? bbcArticles.value : []),
      ...(guardianArticles.status == 'fulfilled' ? guardianArticles.value : []),
      ...(nytimesArticles.status == 'fulfilled' ? nytimesArticles.value : []),
    ]

    return combinedArticles
  } catch (error) {
    console.error('Error combining articles:', error)
    return []
  }
}

export { fetchAndCombineArticles }
