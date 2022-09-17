import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import Head from 'next/head'
import Header from '../../components/Header'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import StoreIcon from '@mui/icons-material/Store'
import Typography from '@mui/material/Typography'
import { getSimpleDate, isPast } from '../../utils/formatters'

function Organizer ({ events, organizers, places }) {
  return (
    <div>
      <Head>
        <title>Finn loppemarkeder i nærheten av deg - loppe.app</title>
      </Head>
      <Header places={places} organizers={organizers} />
      <Typography variant='h4' component='h1' align='center' gutterBottom>Loppemarkedarrangører</Typography>
      <Card>
        <List>
          {organizers.map((org, key) => {
            const orgEvents = events.filter(e => e.organizer === org.id)
            const sortedEvents = orgEvents.sort((a, b) => a.closingtimes[a.closingtimes.length - 1] - b.closingtimes[b.closingtimes.length - 1])
            const lastEvent = sortedEvents[sortedEvents.length - 1]
            const lastEventDate = lastEvent ? getSimpleDate(lastEvent.openingtimes) : 'på ukjent dato'
            const isOver = lastEvent ? isPast(lastEvent.closingtimes) : true
            const lastEventtext = isOver ? 'Ble arrangert ' + lastEventDate : 'Blir arrangert ' + lastEventDate
            return (
              <Link href={`/arrangor/${org.slug}`} passHref key={key}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <StoreIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<strong>{org.name}</strong>}
                    secondary={lastEventtext}
                    secondaryTypographyProps={{
                      color: isOver ? 'red' : 'green',
                      fontStyle: 'italic'
                    }}
                  />
                </ListItemButton>
              </Link>
            )
          })}
        </List>
      </Card>
    </div>
  )
}

export async function getStaticProps (context) {
  const eventsRes = await fetch(`${process.env.API_HOST}/api/events`, { headers: { apikey: process.env.API_KEY } })
  const eventsData = await eventsRes.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizersData = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const placesData = await placesRes.json()
  return {
    props: {
      events: eventsData.events,
      organizers: organizersData.organizers.sort((a, b) => a.name.localeCompare(b.name, 'no-NO')),
      places: placesData.places
    }
  }
}

export default Organizer
