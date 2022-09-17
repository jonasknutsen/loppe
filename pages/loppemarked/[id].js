import EventCard from '../../components/EventCard'
import Head from 'next/head'
import Header from '../../components/Header'
import Typography from '@mui/material/Typography'
import { getSimpleDate } from '../../utils/formatters'

function Event ({ event, places, organizers }) {
  const titleText = 'Loppemarked ' + event.place + ' ' + getSimpleDate(event.openingtimes) + ' - loppe.app'
  return (
    <div>
      <Head>
        <title>{titleText}</title>
      </Head>
      <Header places={places} organizers={organizers} />
      <main>
        <Typography variant='h4' component='h1' align='center' gutterBottom>Loppemarked på {event.place} {getSimpleDate(event.openingtimes)}</Typography>
        <EventCard event={event} />
      </main>
    </div>
  )
}

export async function getStaticPaths () {
  const res = await fetch(`${process.env.API_HOST}/api/events`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const paths = data.events.map(event => {
    return (
      { params: { id: event.id.toString() } }
    )
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { id } = context.params
  const eventsRes = await fetch(`${process.env.API_HOST}/api/event/${id}`, { headers: { apikey: process.env.API_KEY } })
  const eventsData = await eventsRes.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizersData = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const placesData = await placesRes.json()
  return {
    props: {
      event: eventsData,
      organizers: organizersData.organizers,
      places: placesData.places
    }
  }
}

export default Event
