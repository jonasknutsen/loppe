import GoogleMapReact from 'google-map-react'
import RoomIcon from '@mui/icons-material/Room'

const MapMarker = ({ text }) => {
  return (
    <RoomIcon fontSize='large' sx={{ color: '#2E5EAA', transform: 'translate(-50%, -100%)' }} />
  )
}

const Map = ({ place, size = 'medium' }) => {
  const defaultProps = {
    center: {
      lat: place.latitude,
      lng: place.longitude
    },
    zoom: 12
  }
  const height = size === 'small' ? '25vh' : size === 'large' ? '100vh' : '50vh'
  return (
    <div style={{ height, width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MapMarker
          lat={place.latitude}
          lng={place.longitude}
          text={place.name}
        />
      </GoogleMapReact>
    </div>
  )
}

export default Map
