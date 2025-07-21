import { DB } from './schema'
import env from '@/env'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

const dialect = new PostgresDialect({
  pool: new Pool({ connectionString: env.databaseUrl }),
})

export const db = new Kysely<DB>({
  dialect,
})
