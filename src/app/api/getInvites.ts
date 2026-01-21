import { db } from '@/db/db'

export async function GET() {
  const data = await db.selectFrom('invites').execute()
  return Response.json(data)
}
