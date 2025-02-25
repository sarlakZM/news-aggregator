import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { changeSearchKeyword } from '../store/newsSlice'
import { AppDispatch } from '../store/store'
import { useDispatch } from 'react-redux'
import { DEBOUMCE_TIME } from '../utils/constants'

const ToolbarActionsSearch = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchKeyword, setSearchKeyword] = useState('')
  const debouncedSearchTerm = useDebounce(searchKeyword, DEBOUMCE_TIME)

  const handleSearch = useCallback(() => {
    dispatch(changeSearchKeyword(debouncedSearchTerm))
  }, [dispatch, debouncedSearchTerm])

  useEffect(() => {
    handleSearch()
  }, [debouncedSearchTerm])

  return (
    <Stack direction="row" maxWidth="sm">
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'inline', md: 'auto' }, mr: 1 }}
      />
    </Stack>
  )
}

export default ToolbarActionsSearch
