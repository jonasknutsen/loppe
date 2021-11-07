import db from 'db'

export default async function apiOrganizers (req, res) {
  switch (req.method) {
    case 'GET': {
      const { rows } = await db.query('SELECT * FROM organizers')
      return res.status(200).json({ organizers: rows })
    }
    case 'POST': {
      const { rows } = await db.query('INSERT INTO organizers(name, website, facebook, slug) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.name, req.body.website, req.body.facebook, req.body.slug])
      return res.status(200).json({ organizers: rows })
    }
    default: {
      res.setHeader('Allow', 'POST')
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  }
}