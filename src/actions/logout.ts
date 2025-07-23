'use server'

import { createSafeActionClient } from 'next-safe-action'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const logoutAction = createSafeActionClient().action(async () => {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  redirect('/')
})

export default logoutAction
