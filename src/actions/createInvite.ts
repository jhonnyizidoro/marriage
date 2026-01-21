'use server'

import createAction from '@/actions/createAction'
import { db } from '@/db/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const createInviteAction = createAction
  .inputSchema(
    z.object({
      name: z.string().min(3),
    })
  )
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || ''
    const { name } = parsedInput

    // check session
    await db
      .selectFrom('sessions')
      .where('id', '=', accessToken)
      .executeTakeFirstOrThrow()

    const result = await db
      .insertInto('invites')
      .values({ name })
      .returning('id')
      .executeTakeFirstOrThrow()

    redirect(`/confirmacoes?${result.id}`)
  })

export default createInviteAction
