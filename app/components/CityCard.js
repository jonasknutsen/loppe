'use client'

import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import PlaceIcon from '@mui/icons-material/Place'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import { getSimpleDate, isPast } from '../utils/formatters'

const CityCard = ({ cities, places, events }) => {
  return (
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
  )
}

export default CityCard
