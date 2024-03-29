import { useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import EventCard from '../../../../components/EventCard'
import Head from 'next/head'
import Header from '../../../../components/Header'
import MapCard from '../../../../components/MapCard'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function Home ({ data, year, when, places, organizers }) {
  const [events] = useState(data)
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
        {isNaN(when) && <title>Loppemarkeder {when}en {year} - loppe.app</title>}
        {!isNaN(when) && <title>Loppemarkeder uke {when} {year} - loppe.app</title>}
      </Head>
      <Header places={places} organizers={organizers} />
      {isNaN(when) && <Typography variant='h4' component='h1' align='center' gutterBottom>Loppemarkeder {when}en {year}</Typography>}
      {!isNaN(when) && <Typography variant='h4' component='h1' align='center' gutterBottom>Loppemarkeder uke {when} {year}</Typography>}
      {!isNaN(when) && <Typography variant='h5' component='h2' align='center' gutterBottom>I uke {when} har vi registrert {events.length} loppemarkeder</Typography>}
      <Stack spacing={2}>
        {!isNaN(when) && events.length > 0 && <MapCard places={mapArray} />}
        {events?.map((event, key) => {
          return (
            <EventCard key={key} event={event} />
          )
        })}
      </Stack>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '12px', marginBottom: '12px' }}>
        <Pagination count={52} defaultPage={parseInt(when)} siblingCount={2} onChange={handlePagination} />
      </Box>
    </div>
  )
}

export async function getStaticPaths () {
  return {
    paths: [
      { params: { year: '2022', when: 'vår' } },
      { params: { year: '2022', when: 'sommer' } },
      { params: { year: '2022', when: 'høst' } },
      { params: { year: '2022', when: 'vinter' } },
      { params: { year: '2022', when: '1' } },
      { params: { year: '2022', when: '2' } },
      { params: { year: '2022', when: '3' } },
      { params: { year: '2022', when: '4' } },
      { params: { year: '2022', when: '5' } },
      { params: { year: '2022', when: '6' } },
      { params: { year: '2022', when: '7' } },
      { params: { year: '2022', when: '8' } },
      { params: { year: '2022', when: '9' } },
      { params: { year: '2022', when: '10' } },
      { params: { year: '2022', when: '11' } },
      { params: { year: '2022', when: '12' } },
      { params: { year: '2022', when: '13' } },
      { params: { year: '2022', when: '14' } },
      { params: { year: '2022', when: '15' } },
      { params: { year: '2022', when: '16' } },
      { params: { year: '2022', when: '17' } },
      { params: { year: '2022', when: '18' } },
      { params: { year: '2022', when: '19' } },
      { params: { year: '2022', when: '20' } },
      { params: { year: '2022', when: '21' } },
      { params: { year: '2022', when: '22' } },
      { params: { year: '2022', when: '23' } },
      { params: { year: '2022', when: '24' } },
      { params: { year: '2022', when: '25' } },
      { params: { year: '2022', when: '26' } },
      { params: { year: '2022', when: '27' } },
      { params: { year: '2022', when: '28' } },
      { params: { year: '2022', when: '29' } },
      { params: { year: '2022', when: '30' } },
      { params: { year: '2022', when: '31' } },
      { params: { year: '2022', when: '32' } },
      { params: { year: '2022', when: '33' } },
      { params: { year: '2022', when: '34' } },
      { params: { year: '2022', when: '35' } },
      { params: { year: '2022', when: '36' } },
      { params: { year: '2022', when: '37' } },
      { params: { year: '2022', when: '38' } },
      { params: { year: '2022', when: '39' } },
      { params: { year: '2022', when: '40' } },
      { params: { year: '2022', when: '41' } },
      { params: { year: '2022', when: '42' } },
      { params: { year: '2022', when: '43' } },
      { params: { year: '2022', when: '44' } },
      { params: { year: '2022', when: '45' } },
      { params: { year: '2022', when: '46' } },
      { params: { year: '2022', when: '47' } },
      { params: { year: '2022', when: '48' } },
      { params: { year: '2022', when: '49' } },
      { params: { year: '2022', when: '50' } },
      { params: { year: '2022', when: '51' } },
      { params: { year: '2022', when: '52' } },
      { params: { year: '2023', when: 'vår' } },
      { params: { year: '2023', when: 'sommer' } },
      { params: { year: '2023', when: 'høst' } },
      { params: { year: '2023', when: 'vinter' } },
      { params: { year: '2023', when: '1' } },
      { params: { year: '2023', when: '2' } },
      { params: { year: '2023', when: '3' } },
      { params: { year: '2023', when: '4' } },
      { params: { year: '2023', when: '5' } },
      { params: { year: '2023', when: '6' } },
      { params: { year: '2023', when: '7' } },
      { params: { year: '2023', when: '8' } },
      { params: { year: '2023', when: '9' } },
      { params: { year: '2023', when: '10' } },
      { params: { year: '2023', when: '11' } },
      { params: { year: '2023', when: '12' } },
      { params: { year: '2023', when: '13' } },
      { params: { year: '2023', when: '14' } },
      { params: { year: '2023', when: '15' } },
      { params: { year: '2023', when: '16' } },
      { params: { year: '2023', when: '17' } },
      { params: { year: '2023', when: '18' } },
      { params: { year: '2023', when: '19' } },
      { params: { year: '2023', when: '20' } },
      { params: { year: '2023', when: '21' } },
      { params: { year: '2023', when: '22' } },
      { params: { year: '2023', when: '23' } },
      { params: { year: '2023', when: '24' } },
      { params: { year: '2023', when: '25' } },
      { params: { year: '2023', when: '26' } },
      { params: { year: '2023', when: '27' } },
      { params: { year: '2023', when: '28' } },
      { params: { year: '2023', when: '29' } },
      { params: { year: '2023', when: '30' } },
      { params: { year: '2023', when: '31' } },
      { params: { year: '2023', when: '32' } },
      { params: { year: '2023', when: '33' } },
      { params: { year: '2023', when: '34' } },
      { params: { year: '2023', when: '35' } },
      { params: { year: '2023', when: '36' } },
      { params: { year: '2023', when: '37' } },
      { params: { year: '2023', when: '38' } },
      { params: { year: '2023', when: '39' } },
      { params: { year: '2023', when: '40' } },
      { params: { year: '2023', when: '41' } },
      { params: { year: '2023', when: '42' } },
      { params: { year: '2023', when: '43' } },
      { params: { year: '2023', when: '44' } },
      { params: { year: '2023', when: '45' } },
      { params: { year: '2023', when: '46' } },
      { params: { year: '2023', when: '47' } },
      { params: { year: '2023', when: '48' } },
      { params: { year: '2023', when: '49' } },
      { params: { year: '2023', when: '50' } },
      { params: { year: '2023', when: '51' } },
      { params: { year: '2023', when: '52' } },
      { params: { year: '2023', when: 'vår' } },
      { params: { year: '2023', when: 'sommer' } },
      { params: { year: '2023', when: 'høst' } },
      { params: { year: '2023', when: 'vinter' } },
      { params: { year: '2024', when: '1' } },
      { params: { year: '2024', when: '2' } },
      { params: { year: '2024', when: '3' } },
      { params: { year: '2024', when: '4' } },
      { params: { year: '2024', when: '5' } },
      { params: { year: '2024', when: '6' } },
      { params: { year: '2024', when: '7' } },
      { params: { year: '2024', when: '8' } },
      { params: { year: '2024', when: '9' } },
      { params: { year: '2024', when: '10' } },
      { params: { year: '2024', when: '11' } },
      { params: { year: '2024', when: '12' } },
      { params: { year: '2024', when: '13' } },
      { params: { year: '2024', when: '14' } },
      { params: { year: '2024', when: '15' } },
      { params: { year: '2024', when: '16' } },
      { params: { year: '2024', when: '17' } },
      { params: { year: '2024', when: '18' } },
      { params: { year: '2024', when: '19' } },
      { params: { year: '2024', when: '20' } },
      { params: { year: '2024', when: '21' } },
      { params: { year: '2024', when: '22' } },
      { params: { year: '2024', when: '23' } },
      { params: { year: '2024', when: '24' } },
      { params: { year: '2024', when: '25' } },
      { params: { year: '2024', when: '26' } },
      { params: { year: '2024', when: '27' } },
      { params: { year: '2024', when: '28' } },
      { params: { year: '2024', when: '29' } },
      { params: { year: '2024', when: '30' } },
      { params: { year: '2024', when: '31' } },
      { params: { year: '2024', when: '32' } },
      { params: { year: '2024', when: '33' } },
      { params: { year: '2024', when: '34' } },
      { params: { year: '2024', when: '35' } },
      { params: { year: '2024', when: '36' } },
      { params: { year: '2024', when: '37' } },
      { params: { year: '2024', when: '38' } },
      { params: { year: '2024', when: '39' } },
      { params: { year: '2024', when: '40' } },
      { params: { year: '2024', when: '41' } },
      { params: { year: '2024', when: '42' } },
      { params: { year: '2024', when: '43' } },
      { params: { year: '2024', when: '44' } },
      { params: { year: '2024', when: '45' } },
      { params: { year: '2024', when: '46' } },
      { params: { year: '2024', when: '47' } },
      { params: { year: '2024', when: '48' } },
      { params: { year: '2024', when: '49' } },
      { params: { year: '2024', when: '50' } },
      { params: { year: '2024', when: '51' } },
      { params: { year: '2024', when: '52' } }
    ],
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { year, when } = context.params
  const res = await fetch(`${process.env.API_HOST}/api/events/${year}/${when}`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizersData = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const placesData = await placesRes.json()
  return {
    props: {
      data,
      year,
      when,
      organizers: organizersData.organizers,
      places: placesData.places
    }
  }
}
