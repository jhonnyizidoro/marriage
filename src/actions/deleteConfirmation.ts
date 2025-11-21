'use server'

import createAction from '@/actions/createAction'
import { db } from '@/db/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const deleteConfirmationAction = createAction
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

    await db
      .deleteFrom('confirmations')
      .where('id', '=', id)
      .executeTakeFirstOrThrow()

    redirect('/confirmacoes')
  })

export default deleteConfirmationAction
