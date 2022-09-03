import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Skeleton from '@mui/material/Skeleton'
import PlaceIcon from '@mui/icons-material/Place'
import { hoursMinutes, date, day } from '../../utils/formatters'

function Location () {
  const router = useRouter()
  const { slug } = router.query
  const [place, setPlace] = useState(null)
  const [events, setEvents] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const now = new Date()
  const upcomingEvents = events?.filter(event => new Date(event.closingtimes[event.closingtimes.length - 1]).getTime() > now.getTime())
  const previousEvents = events?.filter(event => new Date(event.closingtimes[event.closingtimes.length - 1]).getTime() < now.getTime())
  useEffect(() => {
    setLoading(true)
    fetch(`/api/places/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        setPlace(data[0])
        setEvents(data[1])
        setLoading(false)
      })
  }, [slug])
  return (
    <div>
      {isLoading && <Skeleton variant='text' width={400} />}
      {isLoading && <Skeleton variant='text' width={300} />}
      {isLoading && <Skeleton variant='text' width={300} />}
      {place && (
        <Card sx={{ marginTop: '1.4rem' }}>
          <CardHeader
            avatar={<Avatar><PlaceIcon /></Avatar>}
            title={place.name}
            subheader={`${place.address}, ${place.postcode < 1000 ? '0' + place.postcode : place.postcode} ${place.city}`}
          />
          <CardContent>
            Neste loppemarked
            {upcomingEvents?.map((event, key) => {
              return (
                <div key={key}>
                  {event.openingtimes.map((openingtime, key) => {
                    return (
                      <div key={key}>
                        {day(openingtime)} {date(openingtime)} {hoursMinutes(openingtime)}-{hoursMinutes(event.closingtimes[key])}
                      </div>
                    )
                  })}
                  <div>Arrangeres av <Link href={`/arrangor/${event.slug}`}><a>{event.name}</a></Link></div>
                </div>
              )
            })}
          </CardContent>
          <CardContent>
            Tidligere loppemarked
            {previousEvents?.map((event, key) => {
              return (
                <div key={key}>
                  {event.openingtimes.map((openingtime, key) => {
                    return (
                      <div key={key}>
                        {day(openingtime)} {date(openingtime)} {hoursMinutes(openingtime)}-{hoursMinutes(event.closingtimes[key])}
                      </div>
                    )
                  })}
                  <div>Arrangeres av <Link href={`/arrangor/${event.slug}`}><a>{event.name}</a></Link></div>
                </div>
              )
            })}
          </CardContent>
      </Card>
              )}
    </div>
  )
}

export default Location
