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

export function getMonday() {
  const today = new Date(new Date().setUTCHours(0,0,1))
  const first = today.getDate() - (today.getDay() - 3)
  const monday = new Date(today.setDate(first))
  return monday
}

export function getSunday() {
  const today = new Date(new Date().setHours(0,0,0,0))
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
