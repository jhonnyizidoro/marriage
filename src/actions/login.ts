'use server'

import { db } from '@/db/db'
import env from '@/env'
import { createSafeActionClient } from 'next-safe-action'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const loginAction = createSafeActionClient()
  .inputSchema(
    z.object({
      password: z.string().min(1),
    })
  )
  .action(async ({ parsedInput }) => {
    const { password } = parsedInput

    if (password !== env.appPassword) {
      return { error: 'Senha incorreta' }
    }

    const cookieStore = await cookies()
    const session = await db
      .insertInto('sessions')
      .values({ createdAt: new Date() })
      .returning('id')
      .executeTakeFirstOrThrow()

    cookieStore.set('accessToken', session.id)
    redirect('/')
  })

export default loginAction
