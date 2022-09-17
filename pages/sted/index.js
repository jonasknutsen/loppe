import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import Head from 'next/head'
import Header from '../../components/Header'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import PlaceIcon from '@mui/icons-material/Place'
import Typography from '@mui/material/Typography'
import { getSimpleDate, isPast } from '../../utils/formatters'

function Location ({ cities, places, events, organizers }) {
  return (
    <div>
      <Head>
        <title>Finn loppemarkeder i nærheten av deg - loppe.app</title>
      </Head>
      <Header places={places} organizers={organizers} />
      <Typography variant='h4' component='h1' align='center' gutterBottom>Loppemarkedsteder</Typography>
      <Card>
        <List>
          {cities && cities.map((city, key) => {
            return (
              <div key={key}>
                <ListItem>
                  <ListItemText primary={city} primaryTypographyProps={{ fontWeight: 700, fontSize: '1.2rem', paddingLeft: '16px' }} />
                </ListItem>
                {places && places.filter(place => place.city === city).map((place, key) => {
                  const orgEvents = events.filter(e => e.organizer === place.id)
                  const sortedEvents = orgEvents.sort((a, b) => a.closingtimes[a.closingtimes.length - 1] - b.closingtimes[b.closingtimes.length - 1])
                  const lastEvent = sortedEvents[sortedEvents.length - 1]
                  const lastEventDate = lastEvent ? getSimpleDate(lastEvent.openingtimes) : 'på ukjent dato'
                  const isOver = lastEvent ? isPast(lastEvent.closingtimes) : true
                  const lastEventtext = isOver ? 'Ble arrangert ' + lastEventDate : 'Blir arrangert ' + lastEventDate
                  return (
                    <Link href={`/sted/${place.slug}`} passHref key={key}>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar>
                            <PlaceIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={place.name}
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
              </div>
            )
          })}
        </List>
      </Card>
    </div>
  )
}

export async function getStaticProps (context) {
  const res = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const eventsRes = await fetch(`${process.env.API_HOST}/api/events`, { headers: { apikey: process.env.API_KEY } })
  const eventsData = await eventsRes.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizersData = await organizersRes.json()
  return {
    props: {
      places: data.places.sort((a, b) => a.name.localeCompare(b.name, 'no-NO')),
      cities: data.cities.sort((a, b) => a.localeCompare(b, 'no-NO')),
      events: eventsData.events,
      organizers: organizersData.organizers
    }
  }
}

export default Location
