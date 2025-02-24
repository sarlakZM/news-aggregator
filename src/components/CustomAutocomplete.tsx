import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const CustomAutocomplete = ({
  options,
  label,
  value,
  onChange,
}: Record<any, any>) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      value={value}
      sx={{ width: 150 }}
      style={{ zIndex: 2 }}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}

export default CustomAutocomplete
