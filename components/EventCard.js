import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GavelIcon from '@mui/icons-material/Gavel'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import Map from './Map'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PlaceIcon from '@mui/icons-material/Place'
import { date, day, hoursMinutes } from '../utils/formatters'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

const EventCard = ({ event }) => {
  const fullPostcode = event.postcode < 1000 ? '0' + event.postcode : event.postcode
  const [expanded, setExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const mapArray = [{
    latitude: event.latitude,
    longitude: event.longitude,
    name: event.name
  }]
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={<Avatar><PlaceIcon /></Avatar>}
        action={
          <IconButton
            aria-label='Se flere valg'
            onClick={handleClick}
            id='card-menu-button'
            aria-controls={open ? 'card-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={<strong><Link href={`/sted/${event.place_slug}`}><a>{event.place}</a></Link></strong>}
        subheader={<Link href={`/arrangor/${event.organizer_slug}`}><a>{event.organizer}</a></Link>}
      />
      {event.latitude && event.longitude && <Map places={mapArray} size='small' />}
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 2 }}>
          <CalendarMonthIcon sx={{ marginRight: '8px' }} />
          {event.openingtimes.map((openingtime, key) => {
            return (
              <Box key={key} sx={{ textTransform: 'capitalize' }}>
                {key > 0 && <span>&nbsp;&nbsp;&mdash;&nbsp;&nbsp;</span>}
                {day(openingtime)} {date(openingtime)} {hoursMinutes(openingtime)}-{hoursMinutes(event.closingtimes[key])}
              </Box>
            )
          })}
        </Box>
      </CardContent>
      <CardActions disableSpacing sx={{ paddingTop: 0 }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {event.parking && <LocalParkingIcon />}
          {event.auction && (
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 2 }}>
              <GavelIcon sx={{ marginRight: '8px' }} />
              {event.openingtimes.map((openingtime, key) => {
                return (
                  <Box key={key} sx={{ marginLeft: 1, textTransform: 'capitalize' }}>
                    {key > 0 && <span>&nbsp;&nbsp;&mdash;&nbsp;&nbsp;</span>}
                    {day(openingtime)} {date(openingtime)} {hoursMinutes(openingtime)}-{hoursMinutes(event.closingtimes[key])}
                  </Box>
                )
              })}
            </Box>
          )}
          <div>
            <strong>Adresse:</strong> {event.address}, {fullPostcode} {event.city}
          </div>
          {event.facebook && (
            <div>
              <a href={event.facebook}>Facebook-event</a>
            </div>
          )}
        </CardContent>
      </Collapse>
      <Menu
        id='card-menu'
        aria-labelledby='card-menu-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem><Link href={`/loppemarked/${event.id}`}><a>Side for loppemarkedet</a></Link></MenuItem>
      </Menu>
    </Card>
  )
}

export default EventCard
