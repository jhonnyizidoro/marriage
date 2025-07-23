import { db } from '@/db/db'

const getSongRequestsData = () => {
  return db.selectFrom('songRequests').selectAll().execute()
}

export default getSongRequestsData
