import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Head from 'next/head'
import Header from '../../components/Header'
import Map from '../../components/Map'
import PlaceIcon from '@mui/icons-material/Place'
import { hoursMinutes, date, day } from '../../utils/formatters'

function Location ({ place, events, places, organizers }) {
  const now = new Date()
  const upcomingEvents = events ? events?.filter(event => new Date(event.closingtimes[event.closingtimes?.length - 1]).getTime() > now.getTime()) : []
  const previousEvents = events ? events?.filter(event => new Date(event.closingtimes[event.closingtimes?.length - 1]).getTime() < now.getTime()) : []
  console.log(place)
  return (
    <>
      <Head>
        <title>Loppemarkeder arrangert på {place.name}</title>
      </Head>
      <Header places={places} organizers={organizers} />
      <main>
        {place && (
          <Card sx={{ marginTop: '1.4rem' }}>
            <CardHeader
              avatar={<Avatar><PlaceIcon /></Avatar>}
              title={place.name}
              subheader={`${place.address}, ${place.postcode < 1000 ? '0' + place.postcode : place.postcode} ${place.city}`}
            />
            {place.longitude && place.latitude && <CardContent><Map place={place} /></CardContent>}
            <CardContent>
              <strong>Neste loppemarked</strong>
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
              <strong>Tidligere loppemarked</strong>
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
                    <div>Arrangertes av <Link href={`/arrangor/${event.slug}`}><a>{event.name}</a></Link></div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}
      </main>
    </>
  )
}

export async function getStaticPaths () {
  const res = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const paths = data.places.map(place => {
    return (
      { params: { slug: place.slug } }
    )
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { slug } = context.params
  const res = await fetch(`${process.env.API_HOST}/api/places/${slug}`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizersData = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const placesData = await placesRes.json()
  return {
    props: {
      place: data[0],
      events: data[1],
      organizers: organizersData.organizers,
      places: placesData.places
    }
  }
}

export default Location
