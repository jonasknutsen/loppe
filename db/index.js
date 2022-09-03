import * as pgLib from 'pg-promise'

const pgp = pgLib(/* initialization options */)

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 30
}

function createSingleton (name, create) {
  const s = Symbol.for(name)
  let scope = global[s]
  if (!scope) {
    scope = { ...create() }
    global[s] = scope
  }
  return scope
}

export function getDB () {
  return createSingleton('loppe-app-db-space', () => {
    return {
      db: pgp(cn),
      pgp
    }
  })
}
