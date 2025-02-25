import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

import { fetchArticlesAsync } from '../store/newsSlice'
import { AppDispatch } from '../store/store'
import { memoizedSelectArticles } from '../store/newsSelects'
import ToolbarActionsSearch from './ToolbarActionsSearch'
import CustomPopover from './CustomPopover'
import ToolbarActionsFilters from './ToolbarActionsFilters'

const ToolbarActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { filters } = useSelector(memoizedSelectArticles)

  useEffect(() => {
    dispatch(fetchArticlesAsync(filters.apiType))
  }, [dispatch, filters])

  return (
    <Stack
      direction="row"
      maxWidth="sm"
      sx={{
        marginBottom: '10px',
      }}
    >
      <ToolbarActionsSearch />
      <CustomPopover
        buttonProps={{ title: 'More Filter', icon: <ManageSearchIcon /> }}
      >
        <ToolbarActionsFilters />
      </CustomPopover>
    </Stack>
  )
}

export default ToolbarActions
