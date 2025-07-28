'use server'

import createAction from '@/actions/createAction'
import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import z from 'zod'

z.config(z.locales.pt())

const deleteSongRequestAction = createAction
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
      .deleteFrom('songRequests')
      .where('id', '=', id)
      .executeTakeFirstOrThrow()

    revalidatePath('/pedidos-de-musica')
  })

export default deleteSongRequestAction
