'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import PlaceIcon from '@mui/icons-material/Place'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Map from './Map'
import { day, date, hoursMinutes } from '../utils/formatters'

const PlaceCard = ({ place, upcomingEvents, previousEvents, placesArray }) => {
  return (
    <Card sx={{ marginTop: '1.4rem' }}>
      <CardHeader
        avatar={<Avatar><PlaceIcon /></Avatar>}
        title={<Typography variant='h5' component='h1'>{place.name}</Typography>}
        subheader={`${place.address}, ${place.postcode < 1000 ? '0' + place.postcode : place.postcode} ${place.city}`}
      />
      {place.longitude && place.latitude && <CardContent><Map places={placesArray} /></CardContent>}
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
              <div>Arrangeres av <Link href={`/arrangor/${event.slug}`}>{event.name}</Link></div>
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
              <div>Arrangertes av <Link href={`/arrangor/${event.slug}`}>{event.name}</Link></div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default PlaceCard
