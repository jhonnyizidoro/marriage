import { db } from '@/db/db'

const getHomeData = async (id = '') => {
  if (!id) {
    return
  }

  const [invite, invitedPeople] = await Promise.all([
    db
      .selectFrom('invites')
      .where('id', '=', id)
      .where('confirmedAt', 'is', null)
      .selectAll()
      .executeTakeFirst(),
    db
      .selectFrom('invitedPeople')
      .where('invite', '=', id)
      .selectAll()
      .execute(),
  ])

  if (!invite) {
    return
  }

  return {
    id: invite.id,
    name: invite.name,
    people: invitedPeople.map((p) => ({
      id: p.id,
      name: p.name,
    })),
  }
}

export default getHomeData
