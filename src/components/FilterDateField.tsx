import { useDispatch } from 'react-redux'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { AppDispatch } from '../store/store'
import { changeFiltersDate } from '../store/newsSlice'

export const FilterDateField = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Date"
          onChange={(newValue) =>
            dispatch(
              changeFiltersDate({ fromDate: newValue?.format('YYYY-MM-DD') })
            )
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}
