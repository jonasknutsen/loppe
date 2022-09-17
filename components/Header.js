import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import PlaceIcon from '@mui/icons-material/Place'
import StoreIcon from '@mui/icons-material/Store'
import HomeIcon from '@mui/icons-material/Home'
import TextField from '@mui/material/TextField'
import { getAutocompleteOptions } from '../utils/formatters'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.grey[300],
  borderWidth: 1,
  borderStyle: 'solid',
  backgroundColor: theme.palette.common.white,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  minWidth: '40ch',
  paddingLeft: `calc(1em + ${theme.spacing(2)})`
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none'
    },
    '&:hover fieldset': {
      border: 'none'
    },
    '&.Mui-focused fieldset': {
      border: 'none'
    }
  }
}))

const StyledHeader = styled('header')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '1em'
}))

const StyledPlaceholder = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    width: 48,
    marginLeft: 16
  }
}))

function Header ({ places, organizers }) {
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
  const autocompleteOptions = getAutocompleteOptions(places, organizers)
  return (
    <StyledHeader>
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
            <Link href='/' passHref>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Forside' />
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
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledAutocomplete
          id='search-autocomplete'
          value={searchPhrase}
          options={autocompleteOptions}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              aria-label='Søk etter arrangør eller sted'
            />)}
          onChange={(event, newValue) => {
            handleSearchInput(event, newValue)
          }}
        />
      </Search>
      <StyledPlaceholder />
    </StyledHeader>
  )
}

export default Header
