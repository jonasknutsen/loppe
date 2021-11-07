import db from 'db'

export default async function apiOrganizersId (req, res) {
  switch (req.method) {
    case 'DELETE': {
      const { rows } = await db.query('DELETE FROM organizers WHERE id = $1', [req.query.id])
        return res.status(200).json({ organizers: rows })
    }
    case 'GET': {
      const { rows } = await db.query('SELECT * FROM organizers WHERE id = $1', [req.query.id])
        return res.status(200).json({ organizers: rows[0] })
    }
    case 'PUT': {
      const { rows } = await db.query('UPDATE organizers SET name = $1, website = $2, facebook = $3 , slug = $4 WHERE id = $5', [req.body.name, req.body.website, req.body.facebook, req.body.slug, req.query.id])
        return res.status(200).json({ organizers: rows })
    }
    default: {
      res.setHeader('Allow', 'DELETE, GET, PUT')
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  }
}