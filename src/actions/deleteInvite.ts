'use server'

import { db } from '@/db/db'
import { createSafeActionClient } from 'next-safe-action'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const deleteInviteAction = createSafeActionClient()
  .inputSchema(
    z.object({
      id: z.uuidv4(),
    })
  )
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || ''
    const { id } = parsedInput

    // check session
    await db
      .selectFrom('sessions')
      .where('id', '=', accessToken)
      .executeTakeFirstOrThrow()

    // get current invited people and also update name on invite
    const invitedPeople = await db
      .selectFrom('invitedPeople')
      .where('invite', '=', id)
      .selectAll()
      .execute()

    const invitedPeopleToDelete = invitedPeople.map((p) => p.id)

    if (invitedPeople.length) {
      await db
        .deleteFrom('invitedPeople')
        .where('id', 'in', invitedPeopleToDelete)
        .executeTakeFirstOrThrow()
    }

    await db
      .deleteFrom('invites')
      .where('id', '=', id)
      .executeTakeFirstOrThrow()

    redirect('/convidados')
  })

export default deleteInviteAction
