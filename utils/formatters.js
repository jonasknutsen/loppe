export const date = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

export const hoursMinutes = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
}

export const day = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const day = date.getDay()
  return dayNames[day]
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