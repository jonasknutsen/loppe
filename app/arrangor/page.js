import Head from 'next/head'
import Header from '../components/Header'
import ListCard from '../components/ListCard'

export default async function Page () {
  const eventsRes = await fetch(`${process.env.API_HOST}/api/events`, { headers: { apikey: process.env.API_KEY } })
  const events = await eventsRes.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizers = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const places = await placesRes.json()
  return (
    <div>
      <Head>
        <title>Finn loppemarkeder i nærheten av deg - loppe.app</title>
      </Head>
      <Header places={places.places} organizers={organizers.organizers} />
      <h1>Loppemarkedarrangører</h1>
      <ListCard organizers={organizers} events={events} />
    </div>
  )
}
