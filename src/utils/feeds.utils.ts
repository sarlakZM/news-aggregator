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

export const categories = [
  ...new Set([
    ...guardianApiCategories,
    ...newsApiCategories,
    ...nytApiCategories,
    ...bbcApiCategories,
  ]),
]
export const authors = [
  ...new Set([
    ...guardianApiAuthors,
    ...newsApiAuthors,
    ...bbcApiAuthors,
    ...nytApiAuthors,
  ]),
]
export const sources = [
  ...new Set([
    ...newsApiSources,
    ...guardianApiSources,
    ...nytApiSources,
    ...bbcApiSorces,
  ]),
]
