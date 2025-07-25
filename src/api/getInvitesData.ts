import { db } from '@/db/db'

const getInvitesData = async () => {
  const [invites, invitedPeople] = await Promise.all([
    db.selectFrom('invites').selectAll().orderBy('createdAt desc').execute(),
    db.selectFrom('invitedPeople').selectAll().execute(),
  ])

  return invites.map((i) => ({
    id: i.id,
    name: i.name,
    people: invitedPeople
      .filter((p) => p.invite === i.id)
      .map((p) => ({
        id: p.id,
        name: p.name,
        confirmed: !!p.confirmedAt,
      })),
  }))
}

export default getInvitesData
