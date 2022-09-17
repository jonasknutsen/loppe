import Link from 'next/link'

export default function Home ({ data }) {
  return (
    <div>
      <h1>Loppemarkeder</h1>
      <Link href='/'><a>Gå til forsiden</a></Link>
    </div>
  )
}
