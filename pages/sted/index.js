import { useEffect, useState } from 'react'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import PlaceIcon from '@mui/icons-material/Place'

function Location ({ data }) {
  const places = data.places
  const cities = data.cities
  return (
    <div>
      <h1>Loppemarkedsteder</h1>
      <Card>
        <List>
        {cities && cities.map((city, key) => {
          return (
            <div key={key}>
              <ListItem>
                <ListItemText primary={city} primaryTypographyProps={{ fontWeight: 700, fontSize: '1.2rem', paddingLeft: '16px' }} />
              </ListItem>
              {places && places.filter(place => place.city === city).map((place, key) => {
                return (
                  <Link href={`/sted/${place.slug}`} passHref key={key}>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          <PlaceIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={place.name}
                      />
                    </ListItemButton>
                  </Link>
                )
              })}
            </div>
          )
        })}
        </List>
      </Card>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.API_HOST}/api/places`, { headers: { apikey: process.env.API_KEY } })
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}

export default Location
