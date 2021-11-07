import db from 'db'

export default async function apiPlacesId (req, res) {
  switch (req.method) {
    case 'DELETE': {
      const { rows } = await db.query('DELETE FROM places WHERE id = $1', [req.query.id])
        return res.status(200).json({ places: rows })
    }
    case 'GET': {
      const { rows } = await db.query('SELECT * FROM places WHERE id = $1', [req.query.id])
        return res.status(200).json({ places: rows[0] })
    }
    case 'PUT': {
      const { rows } = await db.query('UPDATE places SET name = $1, address = $2, postcode = $3 , city = $4, areas = $5, coordinates = $6, slug = $7 WHERE id = $8', [req.body.name, req.body.address, req.body.postcode, req.body.city, req.body.areas, req.body.coordinates, req.body.slug, req.query.id])
        return res.status(200).json({ places: rows })
    }
    default: {
      res.setHeader('Allow', 'DELETE, GET, PUT')
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  }
}