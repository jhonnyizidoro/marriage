import { db } from '@/db/db'

const getHomeData = async (id = '', force = false) => {
  if (!id) {
    return
  }

  const [invite, invitedPeople] = await Promise.all([
    db
      .selectFrom('invites')
      .where('id', '=', id)
      .where((qb) =>
        qb.or([
          qb('confirmedAt', 'is', null),
          ...(force ? [qb('confirmedAt', 'is not', null)] : []),
        ])
      )
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
