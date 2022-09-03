import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

function DateAndTime ({ openingTime, handleOpeningTimesChange, closingTime, handleClosingTimesChange, index }) {
  const [value, setValue] = useState(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export default DateAndTime

{/*<LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack direction="row" spacing={2}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label='Åpner'
          value={openingTime}
          onChange={(newValue) => {
            handleOpeningTimesChange(index, newValue)
          }}
        />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label='Stenger'
          value={closingTime}
          onChange={(newValue) => {
            handleClosingTimesChange(index, newValue)
          }}
        />
      </Stack>
      hei
      </LocalizationProvider>*/}
