'use server'

import createAction from '@/actions/createAction'
import { db } from '@/db/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const createOrUpdateInviteAction = createAction
  .inputSchema(
    z.object({
      id: z.uuidv4().optional(),
      name: z.string().min(1),
      autoConfirm: z.boolean(),
      people: z
        .array(z.object({ id: z.uuidv4().optional(), name: z.string().min(1) }))
        .min(1),
    })
  )
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || ''
    const { id, name, people, autoConfirm } = parsedInput

    // check session
    await db
      .selectFrom('sessions')
      .where('id', '=', accessToken)
      .executeTakeFirstOrThrow()

    if (id) {
      // get current invited people and also update name on invite
      const [invitedPeople] = await Promise.all([
        db
          .selectFrom('invitedPeople')
          .where('invite', '=', id)
          .selectAll()
          .execute(),
        db
          .updateTable('invites')
          .where('id', '=', id)
          .set({ name: name })
          .executeTakeFirstOrThrow(),
      ])

      // new invited people
      const invitedPeopleToCreate = people
        .filter((p) => !p.id)
        .map((p) => ({
          name: p.name,
          invite: id,
          confirmedAt: autoConfirm ? new Date() : null,
        }))

      // people deselected from invite
      const invitedPeopleToDelete = invitedPeople
        .filter((person) => !people.some((p) => p.id === person.id))
        .map((p) => p.id)

      await Promise.all([
        invitedPeopleToDelete.length &&
          db
            .deleteFrom('invitedPeople')
            .where('id', 'in', invitedPeopleToDelete)
            .executeTakeFirstOrThrow(),
        invitedPeopleToCreate.length &&
          db
            .insertInto('invitedPeople')
            .values(invitedPeopleToCreate)
            .executeTakeFirstOrThrow(),
        autoConfirm &&
          db
            .updateTable('invitedPeople')
            .where('invite', '=', id)
            .set({ confirmedAt: new Date() })
            .execute(),
      ])

      redirect('/convites')
    }

    const createdInvite = await db
      .insertInto('invites')
      .values({
        name,
        createdAt: new Date(),
        confirmedAt: autoConfirm ? new Date() : null,
      })
      .returning('id')
      .executeTakeFirstOrThrow()

    await db
      .insertInto('invitedPeople')
      .values(
        people.map((p) => ({
          invite: createdInvite.id,
          name: p.name,
          confirmedAt: autoConfirm ? new Date() : null,
        }))
      )
      .execute()

    redirect('/convites')
  })

export default createOrUpdateInviteAction
