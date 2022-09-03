import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import HomeIcon from '@mui/icons-material/Home'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MapIcon from '@mui/icons-material/Map'
import Link from 'next/link'

function Footer () {
  const [value, setValue] = useState(0)
  return (
    <footer>
      <Container maxWidth='md' sx={{ textAlign: 'center' }}>
        &copy; 2022 Loppe.app
      </Container>
    </footer>
  )
}

export default Footer
