import Head from 'next/head'
import PlaceCard from '../../components/PlaceCard'
import Header from '../../components/Header'

export default async function Page ({ params }) {
  const { slug } = params
  const res = await fetch(`${process.env.API_HOST}/api/places/${slug}`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  const place = data[0]
  const events = data[1]
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizers = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const places = await placesRes.json()
  const now = new Date()
  const upcomingEvents = events ? events?.filter(event => new Date(event.closingtimes[event.closingtimes?.length - 1]).getTime() > now.getTime()) : []
  const previousEvents = events ? events?.filter(event => new Date(event.closingtimes[event.closingtimes?.length - 1]).getTime() < now.getTime()) : []
  const placesArray = [place]
  return (
    <>
      <Head>
        <title>Loppemarkeder arrangert på {place.name}</title>
      </Head>
      <Header places={places?.places} organizers={organizers?.organizers} />
      <main>
        {place && (
          <PlaceCard place={place} upcomingEvents={upcomingEvents} previousEvents={previousEvents} placesArray={placesArray} />
        )}
      </main>
    </>
  )
}
