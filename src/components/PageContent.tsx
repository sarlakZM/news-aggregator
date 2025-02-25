import { Suspense, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { PageContainer } from '@toolpad/core/PageContainer'

import { memoizedSelectArticles } from '../store/newsSelects'
import { fetchArticlesAsync } from '../store/newsSlice'
import { AppDispatch } from '../store/store'
import ItemList from './ItemList'
import ErrorMessage from './ErrorMessage'
import { SystemMessages } from '../utils/system.message'

const PageContent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { status, error , total, loading} = useSelector(memoizedSelectArticles)

  const fetchArticlesCallback = useCallback(() => {
    dispatch(fetchArticlesAsync(''))
  }, [dispatch])

  useEffect(() => {
    fetchArticlesCallback()
  }, [fetchArticlesCallback])

  if (status === 'loading' || status === 'idle') {
    return <div><ErrorMessage loading={loading}>{SystemMessages.loadingText}</ErrorMessage></div>
  }

  if (status === 'failed') {
    return <ErrorMessage loading={loading}>{ error ?? SystemMessages.InternalServerError}</ErrorMessage>
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
            { status ==='succeeded' && total == 0 && <ErrorMessage loading={loading}>{SystemMessages.NotFount}</ErrorMessage>}
            { total > 0 &&  <ItemList />}
           
          </Stack>
        </PageContainer>
      </Paper>
  )
}

export default PageContent;
