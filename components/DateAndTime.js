import { useState } from 'react'
import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

function DateAndTime ({ openingTime, handleOpeningTimesChange, closingTime, handleClosingTimesChange, index }) {
  const [value, setValue] = useState(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label='Basic example'
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export default DateAndTime
