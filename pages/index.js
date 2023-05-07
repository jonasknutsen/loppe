import Box from '@mui/material/Box'
import EventCard from '../components/EventCard'
import Head from 'next/head'
import Header from '../components/Header'
import MapCard from '../components/MapCard'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

export default function Home ({ events, places, organizers, week, year }) {
  const router = useRouter()
  const handlePagination = (event, page) => {
    router.push(`/loppemarkeder/${year}/${page}`)
  }
  const mapArray = events.map(event => {
    return (
      {
        latitude: event.latitude,
        longitude: event.longitude,
        name: event.place,
        slug: event.place_slug
      }
    )
  })
  return (
    <div>
      <Head>
        <title>Finn loppemarkeder i nærheten av deg - loppe.app</title>
      </Head>
      <Header places={places} organizers={organizers} />
      <main>
        <Typography variant='h4' component='h1' align='center' gutterBottom>Loppemarkeder som arrangeres den kommende uken</Typography>
        <Typography variant='h5' component='h2' align='center' gutterBottom>I uke {week} har vi registrert {events.length} loppemarkeder</Typography>
        <Stack spacing={2}>
          <MapCard places={mapArray} />
          {events?.map((event, key) => {
            return (
              <EventCard key={key} event={event} />
            )
          })}
        </Stack>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '12px', marginBottom: '12px' }}>
          <Pagination count={52} defaultPage={week} siblingCount={2} onChange={handlePagination} />
        </Box>
      </main>
    </div>
  )
}

export async function getStaticProps (context) {
  const year = 2023
  const week = 19
  const eventsRes = await fetch(`${process.env.API_HOST}/api/events/${year}/${week}`, { headers: { apikey: process.env.API_KEY } })
  const eventsData = await eventsRes.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizersData = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const placesData = await placesRes.json()
  return {
    props: {
      week,
      year,
      events: eventsData,
      organizers: organizersData.organizers,
      places: placesData.places
    }
  }
}
