import z from 'zod'

const schema = z.object({
  databaseUrl: z.string().default(''),
  storeUrl: z.string(),
  marriageDate: z.coerce.date(),
  address: z.string(),
  appPassword: z.string().default(''),
})

const env = schema.parse({
  databaseUrl: process.env.DATABASE_URL,
  storeUrl: process.env.NEXT_PUBLIC_STORE_URL,
  marriageDate: process.env.NEXT_PUBLIC_MARRIAGE_DATE,
  address: process.env.NEXT_PUBLIC_ADDRESS,
  appPassword: process.env.APP_PASSWORD,
})

export default env
