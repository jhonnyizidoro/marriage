'use server'

import createAction from '@/actions/createAction'
import createActionError from '@/actions/createActionError'
import { db } from '@/db/db'
import env from '@/env'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const loginAction = createAction
  .inputSchema(
    z.object({
      password: z.string().min(1),
    })
  )
  .action(async ({ parsedInput }) => {
    const { password } = parsedInput

    if (password !== env.appPassword) {
      throw createActionError('Senha incorreta')
    }

    const cookieStore = await cookies()
    const session = await db
      .insertInto('sessions')
      .values({ createdAt: new Date() })
      .returning('id')
      .executeTakeFirstOrThrow()

    cookieStore.set('accessToken', session.id, { maxAge: 60 * 60 * 24 * 7 })
    redirect('/')
  })

export default loginAction
