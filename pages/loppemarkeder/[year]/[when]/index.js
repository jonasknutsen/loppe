import { useState } from 'react'
import EventCard from '../../../../components/EventCard'
import Stack from '@mui/material/Stack'

export default function Home({ data, year, when }) {
  const [events] = useState(data)

  return (
    <div>
      {isNaN(when) && <h1>Loppemarkeder {when}en {year}</h1>}
      {!isNaN(when) && <h1>Loppemarkeder uke {when} {year}</h1>}
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

export async function getStaticPaths() {
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
    ],
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const { year, when } = context.params
  const res = await fetch(`http://localhost:3001/api/events/${year}/${when}`)
  const data = await res.json()
  return {
    props: {
      data,
      year,
      when
    }
  }
}
