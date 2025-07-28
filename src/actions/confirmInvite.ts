'use server'

import createAction from '@/actions/createAction'
import { db } from '@/db/db'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const confirmInviteAction = createAction
  .inputSchema(
    z.object({
      id: z.uuidv4(),
      people: z.array(z.string()).min(1),
    })
  )
  .action(async ({ parsedInput }) => {
    const { id, people } = parsedInput

    // get current invited people and also update name on invite
    await Promise.all([
      db
        .updateTable('invitedPeople')
        .where('id', 'in', people)
        .set({ confirmedAt: new Date() })
        .execute(),
      db
        .updateTable('invites')
        .where('id', '=', id)
        .set({ confirmedAt: new Date() })
        .execute(),
    ])

    redirect('/')
  })

export default confirmInviteAction
