import { useState } from 'react'
import EventCard from '../../../components/EventCard'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function Home ({ data, year }) {
  const [events] = useState(data)

  return (
    <div>
      <Typography variant='h4' component='h1' align='center' gutterBottom>Loppemarkeder i {year}</Typography>
      <Stack spacing={2}>
        {events?.map((event, key) => {
          return (
            <EventCard key={key} event={event} />
          )
        })}
      </Stack>
    </div>
  )
}

export async function getStaticPaths () {
  return {
    paths: [{ params: { year: '2022' } }],
    fallback: false
  }
}

export async function getStaticProps (context) {
  const year = context.params.year
  const res = await fetch(`${process.env.API_HOST}/api/events/${year}`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  return {
    props: {
      data,
      year
    }
  }
}
