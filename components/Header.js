import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PlaceIcon from '@mui/icons-material/Place'
import StoreIcon from '@mui/icons-material/Store'
import TextField from '@mui/material/TextField'
import DataPoints from '../data/datapoints.json'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  minWidth: '30ch',
  paddingLeft: `calc(1em + ${theme.spacing(2)})`
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    }
  }
}))

function Header () {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState(null)
  const handleSearchInput = (event, newValue) => {
    setSearchPhrase(newValue)
    if (newValue && newValue.slug) {
      router.push(newValue.slug)
    }
  }
  const toggleDrawer = (open) => (event) => {
    setOpenMenu(open)
  }
  return (
    <Box>
      <AppBar position='static'>
        <Container maxWidth='md'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor='left'
            open={openMenu}
            onClose={toggleDrawer(false)}
          >
            <Box
              role='presentation'
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <Link href='/kalender' passHref>
                  <ListItemButton>
                    <ListItemIcon>
                      <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText primary='Kalender' />
                  </ListItemButton>
                </Link>
                <Link href='/arrangor' passHref>
                  <ListItemButton>
                    <ListItemIcon>
                      <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary='Arrangører' />
                  </ListItemButton>
                </Link>
                <Link href='/sted' passHref>
                  <ListItemButton>
                    <ListItemIcon>
                      <PlaceIcon />
                    </ListItemIcon>
                    <ListItemText primary='Steder' />
                  </ListItemButton>
                </Link>
              </List>
            </Box>
          </Drawer>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link href='/'><a>Loppe.app</a></Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledAutocomplete
              id="search-autocomplete"
              value={searchPhrase}
              options={DataPoints}
              renderInput={(params) => <StyledTextField
                {...params}
                aria-label='Søk etter arrangør eller sted'
              />}
              onChange={(event, newValue) => {
                handleSearchInput(event, newValue);
              }}
            />
          </Search>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Header
