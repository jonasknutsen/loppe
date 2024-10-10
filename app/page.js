import MapCard from './components/MapCard'
import Header from './components/Header'
import EventCard from './components/EventCard'

export default async function Page () {
  const year = getCurrentYear()
  const week = getCurrentWeekNumber()
  const eventsRes = await fetch(`${process.env.API_HOST}/api/events/${year}/${week}`, { headers: { apikey: process.env.API_KEY } })
  const events = await eventsRes.json()
  const organizersRes = await fetch(`${process.env.API_HOST}/api/organizers`, { headers: { apikey: process.env.API_KEY } })
  const organizers = await organizersRes.json()
  const placesRes = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const places = await placesRes.json()
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
    <main>
      <Header places={places?.places} organizers={organizers?.organizers} />
      <h1>Loppemarkeder som arrangeres den kommende uken</h1>
      <h2>I uke {week} har vi registrert {events.length} loppemarkeder</h2>
      <div>
        <MapCard places={mapArray} />
        {events?.map((event, key) => {
          return (
            <EventCard key={key} event={event} />
          )
        })}
      </div>
    </main>
  )
}

function getCurrentWeekNumber () {
  const currentDate = new Date()
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1)
  const pastDaysOfYear = (currentDate - startOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)
}

function getCurrentYear () {
  const currentDate = new Date()
  return currentDate.getFullYear()
}
