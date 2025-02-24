import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { PageContainer } from '@toolpad/core/PageContainer'

import { memoizedSelectArticles } from '../store/newsSelects'
import { fetchArticlesAsync } from '../store/newsSlice'
import { AppDispatch } from '../store/store'
import ItemList from './ItemList'

const PageContent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { status, error } = useSelector(memoizedSelectArticles)

  const fetchArticlesCallback = useCallback(() => {
    dispatch(fetchArticlesAsync(''))
  }, [dispatch])

  useEffect(() => {
    fetchArticlesCallback()
  }, [fetchArticlesCallback])

  if (status === 'loading' || status === 'idle') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <Paper sx={{ p: 3, width: '100%' }}>
      <PageContainer>
        <Stack
          direction="row"
          marginTop="10px"
          spacing={1}
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          <ItemList />
        </Stack>
      </PageContainer>
    </Paper>
  )
}

export default PageContent
