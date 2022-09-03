import { useEffect, useState } from 'react'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import StoreIcon from '@mui/icons-material/Store'

function Organizer ({ data }) {
  console.log(data)
  return (
    <div>
      <h1>Loppemarkedarrangører</h1>
      <Card>
        <List>
          {data && data.organizers.map((org, key) => {
            return (
              <Link href={`/arrangor/${org.slug}`} passHref key={key}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <StoreIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={org.name}
                  />
                </ListItemButton>
              </Link>
            )
          })}
        </List>
      </Card>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:3001/api/organizers`)
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}

export default Organizer
