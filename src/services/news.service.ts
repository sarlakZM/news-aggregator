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
    const apis =  Object.values(ApiTypesEnum)
    const responses = await Promise.allSettled(apis.map( api => fetchNewsAGeneric(newsRequestParams, api)));
    const isAllApisHasError = responses.every( api => api.status == 'rejected');
    if( isAllApisHasError )
      throw 'Error fetching news articles';
    const combinedArticles =  responses.reduce( (combined: any, response) =>  {
      return response.status === 'fulfilled' && (combined = [...combined, ...response.value]) 
    }, [])

    return combinedArticles
  } catch (error) {
    throw `Error fetching news articles ${error}`;
  }
}

export { fetchAndCombineArticles }
