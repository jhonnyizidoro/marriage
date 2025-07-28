'use server'

import createAction from '@/actions/createAction'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

z.config(z.locales.pt())

const logoutAction = createAction.action(async () => {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  redirect('/')
})

export default logoutAction
