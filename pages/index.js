import { useState } from 'react'
import EventCard from '../components/EventCard'
import Stack from '@mui/material/Stack'

export default function Home({ data }) {
  const [events] = useState(data)

  return (
    <div>
      <h1>Denne ukes loppemarkeder</h1>
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

export async function getStaticProps(context) {
  const year = 2022
  const week = 36
  const res = await fetch(`${process.env.API_HOST}/api/events/${year}/${week}`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}
