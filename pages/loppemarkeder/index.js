import Link from 'next/link'
import Typography from '@mui/material/Typography'

export default function Home ({ data }) {
  return (
    <div>
      <Typography variant='h4' component='h1' align='center' gutterBottom>Loppemarkeder</Typography>
      <Link href='/'>Gå til forsiden</Link>
    </div>
  )
}
