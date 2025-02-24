import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Article } from '../types/api.type'
import { memoizedSelectArticles } from '../store/newsSelects'
import { Item } from './Item'

const ItemList: React.FC<any> = memo(() => {
  const { articles } = useSelector(memoizedSelectArticles)
  const memoizedArticles = useMemo(() => articles, [articles])
  return (
    <>
      {memoizedArticles.map((item: Article, index) => (
        <Item key={`item-${index}`} item={item} />
      ))}
    </>
  )
})

export default ItemList
