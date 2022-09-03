import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PlaceIcon from '@mui/icons-material/Place'
import { date, day, hoursMinutes } from '../utils/formatters'

const EventCard = ({ event }) => {
  const fullPostcode = event.postcode < 1000 ? '0' + event.postcode : event.postcode
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={<Avatar><PlaceIcon /></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link href={`/sted/${event.place_slug}`}><a>{event.place}</a></Link>}
        subheader={<Link href={`/arrangor/${event.organizer_slug}`}><a>{event.organizer}</a></Link>}
      />
      <CardContent>
        {event.openingtimes.map((openingtime, key) => {
          return (
            <div key={key}>
              {day(openingtime)} {date(openingtime)} {hoursMinutes(openingtime)}-{hoursMinutes(event.closingtimes[key])}
            </div>
          )
        })}
        <div>
          <strong>Adresse:</strong> {event.address}, {fullPostcode} {event.city}
        </div>
        <div>
          <a href={event.facebook}>Facebook-event</a>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard
