import { db } from '@/db/db'

const getInvitesData = async () => {
  return await db.selectFrom('invites').selectAll().orderBy('name').execute()
}

export default getInvitesData
