export const date = (timestamp) => {
  const date = new Date(timestamp)
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

export const hoursMinutes = (timestamp) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
}

export const day = (timestamp) => {
  const date = new Date(timestamp)
  const day = date.getDay()
  return dayNames[day]
}

export function getMonday () {
  const today = new Date(new Date().setUTCHours(0, 0, 1))
  const first = today.getDate() - (today.getDay() - 3)
  const monday = new Date(today.setDate(first))
  return monday
}

export function getSunday () {
  const today = new Date(new Date().setHours(0, 0, 0, 0))
  const first = today.getDate() + (7 - today.getDay())
  const monday = new Date(today.setDate(first))
  return monday
}

const dayNames = [
  'søndag',
  'mandag',
  'tirsdag',
  'onsdag',
  'torsdag',
  'fredag',
  'lørdag'
]

const monthNames = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember'
]

export function getAutocompleteOptions (places, organizers) {
  // {"label": "Peik skolekorps", "slug": "/arrangor/peik-skolekorps"},
  const placesOptions = places.map(place => { return ({ label: place.name, slug: '/sted/' + place.slug }) })
  const organizersOptions = organizers.map(organizer => { return ({ label: organizer.name, slug: '/arrangor/' + organizer.slug }) })
  const allOptions = organizersOptions.concat(placesOptions)
  return allOptions.filter((item, index, self) => self.findIndex(i => i.label === item.label) === index).sort((a, b) => a.label.localeCompare(b.label, 'no-NO'))
}

export function getSimpleDate (openingtimes) {
  const months = openingtimes.map(ot => new Date(ot).getMonth()).filter((item, index, self) => self.findIndex(s => s === item) === index)
  const days = openingtimes.map(ot => new Date(ot).getDate())
  const year = openingtimes.map(ot => new Date(ot).getFullYear()).filter((item, index, self) => self.findIndex(s => s === item) === index)
  if (months.length === 1) {
    return days.join('. og ') + '. ' + monthNames[months[0]] + ' ' + year.join()
  } else {
    return 'månedsskiftet ' + months.map(m => monthNames[m]).join('/') + ' ' + year.join()
  }
}

export function isPast (closingtimes) {
  const closing = new Date(closingtimes[closingtimes.length - 1])
  const now = new Date(Date.now())
  return closing < now
}
