import db from 'db'

export default async function apiEventsId (req, res) {
  switch (req.method) {
    case 'DELETE': {
      const { rows } = await db.query('DELETE FROM events WHERE id = $1', [req.query.id])
        return res.status(200).json({ events: rows })
    }
    case 'GET': {
      const { rows } = await db.query('SELECT * FROM events WHERE id = $1', [req.query.id])
        return res.status(200).json({ events: rows[0] })
    }
    case 'PUT': {
      const { rows } = await db.query('UPDATE events SET type = $1, organizer = $2, place = $3 , openinghours = $4 WHERE id = $5', [req.body.type, req.body.organizer, req.body.place, req.body.openingHours, req.query.id])
        return res.status(200).json({ events: rows })
    }
    default: {
      res.setHeader('Allow', 'DELETE, GET, PUT')
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  }
}