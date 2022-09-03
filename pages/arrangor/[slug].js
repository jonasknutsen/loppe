import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Skeleton from '@mui/material/Skeleton'
import StoreIcon from '@mui/icons-material/Store'
import { hoursMinutes, date, day } from '../../utils/formatters'

function Organizer () {
  const router = useRouter()
  const { slug } = router.query
  const [organizer, setOrganizer] = useState(null)
  const [events, setEvents] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const now = new Date()
  const upcomingEvents = events?.filter(event => new Date(event.closingtimes[event.closingtimes.length - 1]).getTime() > now.getTime())
  const previousEvents = events?.filter(event => new Date(event.closingtimes[event.closingtimes.length - 1]).getTime() < now.getTime())
  useEffect(() => {
    setLoading(true)
    fetch(`/api/organizers/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setOrganizer(data[0])
        setEvents(data[1])
        setLoading(false)
      })
  }, [slug])
  return (
    <div>
      {isLoading && <Skeleton variant='text' width={400} />}
      {isLoading && <Skeleton variant='text' width={300} />}
      {isLoading && <Skeleton variant='text' width={300} />}
      {organizer && (
        <Card sx={{ marginTop: '1.4rem' }}>
          <CardHeader
            avatar={<Avatar><StoreIcon /></Avatar>}
            title={organizer.name}
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
                  <div>Avholdes på <Link href={`/sted/${event.slug}`}><a>{event.name}</a></Link></div>
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

export default Organizer
