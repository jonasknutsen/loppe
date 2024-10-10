'use client'

import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import StoreIcon from '@mui/icons-material/Store'
import { getSimpleDate, isPast } from '../../utils/formatters'

const ListCard = ({ organizers, events }) => {
  return (
    <Card>
      <List>
        {organizers.organizers.map((org, key) => {
          const orgEvents = events.events.filter(e => e.organizer === org.id)
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
  )
}

export default ListCard
