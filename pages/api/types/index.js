import db from 'db'

export default async function apiTypes (req, res) {
  switch (req.method) {
    case 'GET': {
      const { rows } = await db.query('SELECT * FROM types')
      return res.status(200).json({ types: rows })
    }
    case 'POST': {
      const { rows } = await db.query('INSERT INTO types(name) VALUES ($1) RETURNING *', [req.body.name])
      return res.status(200).json({ types: rows })
    }
    default: {
      res.setHeader('Allow', 'POST')
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  }
}