import db from 'db'

export default async function apiTypesId (req, res) {
  switch (req.method) {
    case 'DELETE': {
      const { rows } = await db.query('DELETE FROM types WHERE id = $1', [req.query.id])
        return res.status(200).json({ types: rows })
    }
    case 'GET': {
      const { rows } = await db.query('SELECT * FROM types WHERE id = $1', [req.query.id])
        return res.status(200).json({ types: rows[0] })
    }
    case 'PUT': {
      const { rows } = await db.query('UPDATE types SET name = $1 WHERE id = $2', [req.body.name, req.query.id])
        return res.status(200).json({ types: rows })
    }
    default: {
      res.setHeader('Allow', 'DELETE, GET, PUT')
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  }
}