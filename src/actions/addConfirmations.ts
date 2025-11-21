'use server'

import createAction from '@/actions/createAction'
import { db } from '@/db/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const addConfirmationsAction = createAction
  .inputSchema(
    z.object({ people: z.array(z.string()).min(1), redirectUrl: z.string() })
  )
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies()
    const { people, redirectUrl } = parsedInput

    await db
      .insertInto('confirmations')
      .values(people.map((person) => ({ name: person })))
      .execute()

    cookieStore.set('confirmed', 'true')

    redirect(redirectUrl)
  })

export default addConfirmationsAction
