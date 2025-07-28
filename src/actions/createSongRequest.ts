'use server'

import createAction from '@/actions/createAction'
import createActionError from '@/actions/createActionError'
import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import z from 'zod'

z.config(z.locales.pt())

type NoembedResponse = {
  provider_url: string
  author_name: string
  width: number
  url: string
  html: string
  provider_name: string
  type: string
  title: string
  thumbnail_height: number
  author_url: string
  height: number
  version: string
  thumbnail_width: number
  thumbnail_url: string
}

const createSongRequestAction = createAction
  .inputSchema(
    z.object({
      url: z.url(),
    })
  )
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || ''
    const { url } = parsedInput
    const id =
      new URL(url).searchParams.get('v') ||
      new URL(url).pathname.split('/').pop()

    // check session
    await db
      .selectFrom('sessions')
      .where('id', '=', accessToken)
      .executeTakeFirstOrThrow()

    if (!id || id.length !== 11) {
      throw createActionError('Formato da URL inválido')
    }

    const apiUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`
    const res = await fetch(apiUrl)
    const data = (await res.json()) as NoembedResponse

    await db
      .insertInto('songRequests')
      .values({
        link: data.url,
        thumbnail: data.thumbnail_url,
        name: data.title,
      })
      .execute()

    revalidatePath('/pedidos-de-musica')
  })

export default createSongRequestAction
