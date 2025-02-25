import { ApiResponseTypeMap, NewsRequestParams } from '../types/api.type'
import {
  bbcApiAuthors,
  bbcApiCategories,
  bbcApiSorces,
  guardianApiAuthors,
  guardianApiCategories,
  guardianApiSources,
  newsApiAuthors,
  newsApiCategories,
  newsApiSources,
  nytApiAuthors,
  nytApiCategories,
  nytApiSources,
} from './data'
import { ApiTypesEnum } from './enums'
import { PAGE_SIZE } from './constants'

export const processedResponseMaped: ApiResponseTypeMap = {
  newsapi: (data: any) =>
    data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      author: article.author || '',
      image: article.urlToImage || '',
      category: '',
      originalSource: article.source.name,
    })),
  bbc: (data: any) =>
    data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      author: article.author,
      image: article.urlToImage,
      category: '',
      originalSource: article.source.name,
    })),
  nytimes: (data: any) =>
    data.response.docs.map((doc: any) => ({
      title: doc.headline.main,
      description: doc.snippet,
      url: doc.web_url,
      author: doc.byline.original,
      image: doc.multimedia.url,
      category: doc.sectin_name || doc.news_desk,
      originalSource: doc.source,
    })),
  guardian: (data: any) =>
    data.response.results.map((result: any) => ({
      title: result.webTitle,
      description: result.elements?.at(0).assets?.at(0).typeData.altText,
      url: result.webUrl,
      author: result.elements?.at(0).assets?.at(0).typeData.photographer,
      image: result.elements?.at(0).assets?.at(0).file,
      category: result.sectionName,
      originalSource: '',
    })),
}

const matchQueryParams: any = {
  newsapi: (params: NewsRequestParams, apiKey: string) => {
    const queryParams: any = {
      apiKey: apiKey,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: PAGE_SIZE,
    }
    params?.searchKeyword && (queryParams.q ??= params.searchKeyword);
    params?.category && (queryParams.category ??= params.category);
    params?.source && (queryParams.source ??= params.source) ;
    params?.fromDate && (queryParams.from  ??= params.fromDate) //(e.g. 2025-02-21 or 2025-02-21T15:25:12)
    return queryParams
  },
  bbc: (params: NewsRequestParams, apiKey: string) => {
    const queryParams: any = {
      apiKey: apiKey,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: PAGE_SIZE,
      sources: 'bbc-news',
    }
    params?.searchKeyword && (queryParams.q ??= params.searchKeyword);
    // params?.category && (queryParams.category ??= params.category);
    params?.source && (queryParams.source ??= params.source) ;
    params?.fromDate && (queryParams.from  ??= params.fromDate) //(e.g. 2025-02-21 or 2025-02-21T15:25:12)
    return queryParams
  },
  nytimes: (params: NewsRequestParams, apiKey: string) => {
    const queryParams: any = {
      'api-key': apiKey,
      sort: 'newest',
      page: 0,
    }
    params?.searchKeyword && (queryParams.q ??= params.searchKeyword);
    params?.category && (queryParams.fq = `news_desk:(\"${params.category}\") OR sectin_name(\"${params.category}\")`);
    params?.source && (queryParams.fq ??= params.source) ;
    params?.fromDate && (queryParams.begin_date  ??= params.fromDate.replace(/-/g, ''))  //(e.g. 20230101 jan 1 2023 20231231)
    return queryParams
  },
  guardian: (params: NewsRequestParams, apiKey: string) => {
    const queryParams: any = {
      'api-key': apiKey,
      'order-by': 'newest',
      'show-elements': 'image',
      'page-size': PAGE_SIZE,
    }
    params?.searchKeyword && (queryParams.q ??= params.searchKeyword);
    params?.category && (queryParams.section ??= params.category.toLowerCase());
    params?.fromDate && (queryParams['from-date'] ??= params.fromDate);//(e.g. 2025-02-21)
    return queryParams
  },
}

export const matchUrlWithQueryParams = (
  apiConfig: { [key: string]: any },
  apiType: ApiTypesEnum,
  newsRequestParams: NewsRequestParams
) => {
  let queryParams: string = matchQueryParams[apiType](
    newsRequestParams,
    apiConfig.apiKey
  )
  const url = `${apiConfig.url.replace(/\/$/g, '')}?${new URLSearchParams(queryParams).toString()}`
  return url
}

export const categories = [
  ...new Set([
    ...nytApiCategories,
    ...bbcApiCategories,
    ...guardianApiCategories,
    ...newsApiCategories,
  ]),
]
export const authors = [
  ...new Set([
    ...nytApiAuthors,
    ...bbcApiAuthors,
    ...guardianApiAuthors,
    ...newsApiAuthors,
  ]),
]
export const sources = [
  ...new Set([
    ...nytApiSources,
    ...bbcApiSorces,
    ...guardianApiSources,
    ...newsApiSources,
  ]),
]
