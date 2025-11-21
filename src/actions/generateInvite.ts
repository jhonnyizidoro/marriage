'use server'

import createAction from '@/actions/createAction'
import { db } from '@/db/db'
import env from '@/env'
import { Jimp } from 'jimp'
import { cookies } from 'next/headers'
import { join } from 'node:path'
import QRCode from 'qrcode'
import z from 'zod'

z.config(z.locales.pt())

const generateInviteAction = createAction.action(async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value || ''

  // check session
  await db
    .selectFrom('sessions')
    .where('id', '=', accessToken)
    .executeTakeFirstOrThrow()

  const templateSrc = join(process.cwd(), 'src/assets/images/invite.jpg')
  const template = await Jimp.read(templateSrc)
  const url = `${env.domain}?modal=confirm`
  const x = template.width - 216 - 56
  const y = template.height - 216 - 56
  const qrBuffer = await QRCode.toBuffer(url, { width: 216 })
  const qrImage = await Jimp.read(qrBuffer)
  template.composite(qrImage, x, y)
  return template.getBase64('image/jpeg')
})

export default generateInviteAction
