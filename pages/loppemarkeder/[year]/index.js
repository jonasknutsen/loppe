import { useState } from 'react'
import EventCard from '../../../components/EventCard'
import Stack from '@mui/material/Stack'

export default function Home ({ data, year }) {
  const [events] = useState(data)

  return (
    <div>
      <h1>Loppemarkeder i {year}</h1>
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
