'use server'

import createAction from '@/actions/createAction'
import { db } from '@/db/db'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const confirmInviteAction = createAction
  .inputSchema(
    z.object({
      id: z.uuidv4().or(z.array(z.uuidv4())),
      isConfirmed: z.boolean(),
      redirectUrl: z.string().default('/confirmacoes'),
    })
  )
  .action(async ({ parsedInput }) => {
    const { id, isConfirmed, redirectUrl } = parsedInput
    const idArray = Array.isArray(id) ? id : [id]

    await db
      .updateTable('invites')
      .where('id', 'in', idArray)
      .set('confirmedAt', isConfirmed ? null : new Date())
      .execute()

    redirect(redirectUrl)
  })

export default confirmInviteAction
