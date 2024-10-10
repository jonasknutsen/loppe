'use client'

import Card from '@mui/material/Card'
import Map from './Map'

const MapCard = ({ places }) => {
  return (
    <Card>
      <Map places={places} />
    </Card>
  )
}

export default MapCard
