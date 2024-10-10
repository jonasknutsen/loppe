'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import StoreIcon from '@mui/icons-material/Store'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { hoursMinutes, date, day } from '../../utils/formatters'

const OrganizerCard = ({ organizer, upcomingEvents, previousEvents }) => {
  return (
    <Card sx={{ marginTop: '1.4rem' }}>
      <CardHeader
        avatar={<Avatar><StoreIcon /></Avatar>}
        title={<Typography variant='h5' component='h1'>{organizer.name}</Typography>}
      />
      <CardContent>
        {organizer.website && <Typography variant='body1' gutterBottom><a href={organizer.website}>Hjemmeside for {organizer.name}</a></Typography>}
        {organizer.facebook && <Typography variant='body1' gutterBottom><a href={organizer.facebook}>Facebookside for {organizer.name}</a></Typography>}
      </CardContent>
      <CardContent>
        <Typography variant='h6' component='h2' gutterBottom>Neste loppemarked</Typography>
        {upcomingEvents?.map((event, key) => {
          return (
            <div key={key}>
              {event.openingtimes.map((openingtime, key) => {
                return (
                  <div key={key}>
                    {day(openingtime)} {date(openingtime)} {hoursMinutes(openingtime)}-{hoursMinutes(event.closingtimes[key])}
                  </div>
                )
              })}
              <div>Avholdes på <Link href={`/sted/${event.slug}`}>{event.name}</Link></div>
            </div>
          )
        })}
      </CardContent>
      <CardContent>
        <Typography variant='h6' component='h2' gutterBottom>Tidligere loppemarked</Typography>
        {previousEvents?.map((event, key) => {
          return (
            <div key={key}>
              {event.openingtimes.map((openingtime, key) => {
                return (
                  <div key={key}>
                    {day(openingtime)} {date(openingtime)} {hoursMinutes(openingtime)}-{hoursMinutes(event.closingtimes[key])}
                  </div>
                )
              })}
              <div>Avholdt på <Link href={`/sted/${event.slug}`}>{event.name}</Link></div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default OrganizerCard
