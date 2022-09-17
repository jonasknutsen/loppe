import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Head from 'next/head'
import Header from '../../components/Header'
import StoreIcon from '@mui/icons-material/Store'
import { hoursMinutes, date, day } from '../../utils/formatters'

function Organizer ({ organizer, events, organizers, places }) {
  const now = new Date()
  const upcomingEvents = events ? events?.filter(event => new Date(event.closingtimes[event.closingtimes?.length - 1]).getTime() > now.getTime()) : []
  const previousEvents = events ? events?.filter(event => new Date(event.closingtimes[event.closingtimes?.length - 1]).getTime() < now.getTime()) : []
  return (
    <>
      <Head>
        <title>Loppemarkeder arrangert av {organizer.name}</title>
      </Head>
      <Header places={places} organizers={organizers} />
      {organizer && (
        <Card sx={{ marginTop: '1.4rem' }}>
          <CardHeader
            avatar={<Avatar><StoreIcon /></Avatar>}
            title={organizer.name}
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
                  <div>Avholdes på <Link href={`/sted/${event.slug}`}><a>{event.name}</a></Link></div>
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
                  <div>Avholdt på <Link href={`/sted/${event.slug}`}><a>{event.name}</a></Link></div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </>
  )
}

export async function getStaticPaths () {
  const res = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const paths = data.organizers.map(org => {
    return (
      { params: { slug: org.slug } }
    )
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { slug } = context.params
  const res = await fetch(`${process.env.API_HOST}/api/organizers/${slug}`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizersData = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const placesData = await placesRes.json()
  return {
    props: {
      organizer: data[0],
      events: data[1],
      organizers: organizersData.organizers,
      places: placesData.places
    }
  }
}

export default Organizer
