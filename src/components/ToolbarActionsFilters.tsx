import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { changeFiltersCategory, changeFiltersSource } from '../store/newsSlice'
import { AppDispatch } from '../store/store'
import { sources, categories } from '../utils/feeds.utils'
import { ApiTypesEnum } from '../utils/enums'
import { memoizedSelectArticles } from '../store/newsSelects'
import { FilterDateField } from './FilterDateField'

const ToolbarActionsFilters = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { filters } = useSelector(memoizedSelectArticles)
  const memoizedCategories = useMemo(() => categories, [])
  const memoizedSources = useMemo(() => sources, [])

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px',
      }}
    >
      <Autocomplete
        disablePortal
        options={memoizedSources ?? []}
        value={filters.source}
        sx={{ width: 200 }}
        onChange={(event: any, newValue: any) => {
          dispatch(
            changeFiltersSource({ source: newValue as any as ApiTypesEnum })
          )
        }}
        renderInput={(params) => <TextField {...params} label="Sources" />}
      />
      <Autocomplete
        disablePortal
        options={memoizedCategories ?? []}
        value={filters.category}
        sx={{ width: 200 }}
        onChange={(event: any, newValue: any) => {
          dispatch(changeFiltersCategory({ category: newValue }))
        }}
        renderInput={(params) => <TextField {...params} label="Categories" />}
      />
      <FilterDateField />
    </Stack>
  )
}

export default ToolbarActionsFilters
