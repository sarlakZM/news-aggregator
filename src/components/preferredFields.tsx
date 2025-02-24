import { useDispatch } from 'react-redux'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import {
  addAuthorToPreferred,
  addCategoryToPreferred,
  addSourceToPreferred,
} from '../store/preferredFeedSlice'
import { AppDispatch } from '../store/store'

import { authors, categories, sources } from '../utils/service.utils'

const PreferredFields = () => {
  const dispatch = useDispatch<AppDispatch>()
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
        options={sources ?? []}
        sx={{ width: 150 }}
        style={{ zIndex: 2 }}
        onChange={(event: any, value: any) => {
          dispatch(addSourceToPreferred(value))
        }}
        renderInput={(params) => <TextField {...params} label="Sources" />}
      />
      <Autocomplete
        disablePortal
        options={categories ?? []}
        sx={{ width: 150 }}
        onChange={(event: any, value: any) => {
          dispatch(addCategoryToPreferred(value))
        }}
        renderInput={(params) => <TextField {...params} label="Categories" />}
      />
      <Autocomplete
        disablePortal
        options={authors ?? []}
        sx={{ width: 150 }}
        onChange={(event: any, value: any) => {
          dispatch(addAuthorToPreferred(value))
        }}
        renderInput={(params) => <TextField {...params} label="Authors" />}
      />
    </Stack>
  )
}

export default PreferredFields
