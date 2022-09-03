import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#90afc5',
    },
    secondary: {
      main: '#763626',
    }
  }
})

export default theme
