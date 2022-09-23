import GoogleMapReact from 'google-map-react'
import RoomIcon from '@mui/icons-material/Room'

const MapMarker = ({ text }) => {
  return (
    <RoomIcon fontSize='large' sx={{ color: '#2E5EAA', transform: 'translate(-50%, -100%)' }} />
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
            />
          )
        })}
      </GoogleMapReact>
    </div>
  )
}

export default Map
