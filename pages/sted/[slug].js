import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import PlaceIcon from '@mui/icons-material/Place'
import { hoursMinutes, date, day } from '../../utils/formatters'

function Location ({ place, events }) {
  const now = new Date()
  const upcomingEvents = events?.filter(event => new Date(event.closingtimes[event.closingtimes.length - 1]).getTime() > now.getTime())
  const previousEvents = events?.filter(event => new Date(event.closingtimes[event.closingtimes.length - 1]).getTime() < now.getTime())
  return (
    <div>
      {place && (
        <Card sx={{ marginTop: '1.4rem' }}>
          <CardHeader
            avatar={<Avatar><PlaceIcon /></Avatar>}
            title={place.name}
            subheader={`${place.address}, ${place.postcode < 1000 ? '0' + place.postcode : place.postcode} ${place.city}`}
          />
          <CardContent>
            Neste loppemarked
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
                  <div>Arrangeres av <Link href={`/arrangor/${event.slug}`}><a>{event.name}</a></Link></div>
                </div>
              )
            })}
          </CardContent>
          <CardContent>
            Tidligere loppemarked
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
                  <div>Arrangeres av <Link href={`/arrangor/${event.slug}`}><a>{event.name}</a></Link></div>
                </div>
              )
            })}
          </CardContent>
      </Card>
              )}
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const paths = data.places.map(place => {
    return (
      { params: { slug: place.slug} }
    )})
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const res = await fetch(`${process.env.API_HOST}/api/places/${slug}`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  return {
    props: {
      place: data[0],
      events: data[1]
    }
  }
}

export default Location
