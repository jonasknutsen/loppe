import db from 'db'

export default async function apiPlaces (req, res) {
  switch (req.method) {
    case 'GET': {
      const { rows } = await db.query('SELECT * FROM places')
      return res.status(200).json({ places: rows })
    }
    case 'POST': {
      const { rows } = await db.query('INSERT INTO places(name, address, postcode, city, areas, coordinates, slug) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [req.body.name, req.body.address, req.body.postcode, req.body.city, req.body.areas, req.body.coordinates, req.body.slug])
      return res.status(200).json({ places: rows })
    }
    default: {
      res.setHeader('Allow', 'POST')
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  }
}