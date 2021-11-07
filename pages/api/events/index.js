import db from 'db'

export default async function apiEvents (req, res) {
  switch (req.method) {
    case 'GET': {
      const { rows } = await db.query('SELECT * FROM events')
      return res.status(200).json({ events: rows })
    }
    case 'POST': {
      const { rows } = await db.query('INSERT INTO events(type, organizer, place, openinghours) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.type, req.body.organizer, req.body.place, req.body.openingHours])
      return res.status(200).json({ events: rows })
    }
    default: {
      res.setHeader('Allow', 'POST')
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  }
}