import z from 'zod'

const schema = z.object({
  databaseUrl: z.string().default(''),
  storeUrl: z.string(),
})

const env = schema.parse({
  databaseUrl: process.env.DATABASE_URL,
  storeUrl: process.env.NEXT_PUBLIC_STORE_URL,
})

export default env
