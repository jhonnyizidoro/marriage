import { db } from '@/db/db'

const getConfirmationsData = async () => {
  return await db
    .selectFrom('confirmations')
    .selectAll()
    .orderBy('createdAt', 'desc')
    .execute()
}

export default getConfirmationsData
