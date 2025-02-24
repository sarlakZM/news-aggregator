import { ApiTypesEnum } from '../utils/enums'

// export type ApiResponse<T extends keyof ApiResponseTypeMap > = ( ApiResponseTypeMap[T] extends ( ...args: any[] ) => infer R ? R : never );

export type ApiResponse = ApiTypeMap[keyof ApiTypeMap][]

export type Article = ApiTypeMap[keyof ApiTypeMap]

export type ApiResponseTypeMap = MethodMap<ApiTypesEnum>

export type ApiTypeMapConfig = ObjectMap<ApiTypesEnum>

export interface NewsRequestParams extends RequestParams {
  searchKeyword?: string
  category?: string
  source?: string
  fromDate?: string
  toDate?: string
}

export interface BaseArticle {
  title: string
  author: string | null
  description: string | null
  url: string
  image: string
  category: string
  originalSource: string
}

type MethodMap<T extends ApiTypesEnum> = {
  [K in T]: (data: ApiTypeMap[K]) => Array<ApiTypeMap[K]>
}

type ObjectMap<T extends ApiTypesEnum> = {
  [K in T]: { url: string; apiKey: string; responseType: any }
}

type ApiTypeMap = {
  newsapi: NewsApiArticle
  bbc: BbcNewsArticle
  nytimes: NytArticle
  guardian: GuardianArticle
}

interface RequestParams {
  [key: string]: string | number | undefined
}

interface NewsApiArticle extends BaseArticle {
  source: {
    id: string | null
    name: string
  }
  urlToImage: string | null
}

interface BbcNewsArticle extends BaseArticle {
  type: string
  link: string
  guid: string
  pubDate: string
  thumbnail: string
  publishedAt: string
  content: string | null
}

interface NytArticle extends BaseArticle {
  abstract: string
  web_url: string
  snippet: string
  lead_paragraph: string
  print_section: string | null
  print_page: string | null
  source: string
  multimedia: Array<{
    url: string
    format: string
    height: number
    width: number
    type: string
    subtype: string
    caption: string | null
    copyright: string
  }>
  headline: {
    main: string
    kicker: string | null
    content_kicker: string | null
    print_headline: string | null
    name: string | null
    seo: string | null
    sub: string | null
  }
  keywords: Array<{
    name: string
    value: string
    rank: number
    major: string | null
  }>
  document_type: string
  news_desk: string | null
  section_name: string | null
  byline: {
    original: string | null
    person: Array<{
      firstname: string
      middlename: string | null
      lastname: string
      qualifier: string | null
      title: string | null
      role: string
      organization: string
      rank: number
    }>
    organization: string | null
  }
  type_of_material: string
  _id: string
  word_count: number
  uri: string
}

interface GuardianArticle extends BaseArticle {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webTitle: string
  webPublicationDate: string
  webUrl: string
  apiUrl: string
  isHosted: false
  pillarId: string
  pillarName: string
  fields: {
    headline: string
    standfirst: string | null
    trailText: string | null
    byline: string | null
    main: string | null
    body: string
    wordcount: string
    firstPublicationDate: string
    isInappropriateForSponsorship: string | null
    isPremoderated: string | null
    lastModified: string
    shortUrl: string
    thumbnail: string | null
  }
  tags: Array<{
    id: string
    type: string
    sectionId: string | null
    sectionName: string | null
    webTitle: string
    webUrl: string
    apiUrl: string
    references: Array<any>
  }>
  elements: Array<{
    id: string
    relation: string
    type: string
    assets: Array<{
      type: string
      mimeType: string
      file: string
      typeData: Array<{
        altText: string
        caption: string
        credit: string
        photographer: string
        source: string
        width: string
        height: string
        secureFile: string
        displayCredit: string
        mediaId: string
        imageType: string
        suppliersReference: string
      }>
    }>
  }>
}
