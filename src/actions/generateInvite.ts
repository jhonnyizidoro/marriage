'use server'

import { db } from '@/db/db'
import env from '@/env'
import { Jimp } from 'jimp'
import { createSafeActionClient } from 'next-safe-action'
import { cookies } from 'next/headers'
import { join } from 'node:path'
import QRCode from 'qrcode'
import z from 'zod'

z.config(z.locales.pt())

const generateInvite = async ({
  id,
  name,
  template,
}: {
  template: Awaited<ReturnType<typeof Jimp.read>>
  id: string
  name: string
}) => {
  const url = `${env.domain}?modal=confirm&id=${id}`
  const x = template.width - 200 - 20
  const y = template.height - 200 - 20
  const qrBuffer = await QRCode.toBuffer(url, { width: 200 })
  const qrImage = await Jimp.read(qrBuffer)
  template.composite(qrImage, x, y)
  const base64 = await template.getBase64('image/jpeg')
  return { base64, name }
}

const generateInviteAction = createSafeActionClient()
  .inputSchema(
    z.object({
      ids: z.array(z.uuidv4()),
    })
  )
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || ''
    const { ids } = parsedInput
    const templateSrc = join(process.cwd(), 'src/assets/images/invite.jpg')

    // check session
    await db
      .selectFrom('sessions')
      .where('id', '=', accessToken)
      .executeTakeFirstOrThrow()

    const template = await Jimp.read(templateSrc)
    const invites = await db
      .selectFrom('invites')
      .where('id', 'in', ids)
      .selectAll()
      .execute()

    return await Promise.all(
      invites.map((i) =>
        generateInvite({
          template,
          id: i.id,
          name: i.name,
        })
      )
    )
  })

export default generateInviteAction
