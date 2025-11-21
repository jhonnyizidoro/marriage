import { db } from '@/db/db'

const getConfirmationsData = async () => {
  return await db.selectFrom('confirmations').selectAll().execute()
}

export default getConfirmationsData
