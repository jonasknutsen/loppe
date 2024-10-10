import Head from 'next/head'
import Header from '../../components/Header'
import OrganizerCard from '../../components/organizerCard'

export default async function Page ({ params }) {
  const res = await fetch(`${process.env.API_HOST}/api/organizers/${params.slug}`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const organizer = data[0]
  const events = data[1]
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizers = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const places = await placesRes.json()
  const now = new Date()
  const upcomingEvents = events ? events?.filter(event => new Date(event.closingtimes[event.closingtimes?.length - 1]).getTime() > now.getTime()) : []
  const previousEvents = events ? events?.filter(event => new Date(event.closingtimes[event.closingtimes?.length - 1]).getTime() < now.getTime()) : []
  return (
    <>
      <Head>
        <title>Loppemarkeder arrangert av {organizer.name}</title>
      </Head>
      <Header places={places?.places} organizers={organizers?.organizers} />
      {organizer && (
        <OrganizerCard organizer={organizer} upcomingEvents={upcomingEvents} previousEvents={previousEvents} />
      )}
    </>
  )
}
