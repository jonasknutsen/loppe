import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Link from 'next/link'
import RoomIcon from '@mui/icons-material/Room'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

const MapMarker = ({ text, slug }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'loppemarked-navn' : undefined
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <RoomIcon fontSize='large' sx={{ color: '#2E5EAA', transform: 'translate(-50%, -100%)' }} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography sx={{ p: 2 }}><Link href={`/sted/${slug}`}><a>{text}</a></Link></Typography>
      </Popover>
    </div>
  )
}

const Map = ({ places, size = 'medium' }) => {
  const sortedLat = places.map(place => place.latitude).sort()
  const sortedLong = places.map(place => place.longitude).sort()
  const highestLat = sortedLat[0]
  const highestLong = sortedLong[0]
  const lowestLat = sortedLat[sortedLat.length - 1]
  const lowestLong = sortedLong[sortedLong.length - 1]
  const defaultProps = {
    center: {
      lat: (highestLat + lowestLat) / 2,
      lng: (highestLong + lowestLong) / 2
    },
    zoom: places.length === 1 ? 12 : 9
  }
  const height = size === 'small' ? '25vh' : size === 'large' ? '100vh' : '50vh'
  return (
    <div style={{ height, width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {places.map((place, key) => {
          return (
            <MapMarker
              key={key}
              lat={place.latitude}
              lng={place.longitude}
              text={place.name}
              slug={place.slug}
            />
          )
        })}
      </GoogleMapReact>
    </div>
  )
}

export default Map
