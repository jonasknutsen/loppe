import Head from 'next/head'
import CityCard from '../components/CityCard'
import Header from '../components/Header'

export default async function Page () {
  const res = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const places = data.places.sort((a, b) => a.name.localeCompare(b.name, 'no-NO'))
  const cities = data.cities.sort((a, b) => a.localeCompare(b, 'no-NO'))
  const eventsRes = await fetch(`${process.env.API_HOST}/api/events`, { headers: { apikey: process.env.API_KEY } })
  const events = await eventsRes.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizers = await organizersRes.json()
  return (
    <div>
      <Head>
        <title>Finn loppemarkeder i nærheten av deg - loppe.app</title>
      </Head>
      <Header places={places} organizers={organizers.organizers} />
      <h1>Loppemarkedsteder</h1>
      <CityCard cities={cities} places={places} events={events.events} />
    </div>
  )
}
