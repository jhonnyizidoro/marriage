import getInvitesData from '@/api/getInvitesData'
import appMetadata from '@/utils/metadata'
import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { cookies } from 'next/headers'
import { PropsWithChildren } from 'react'

import ConfirmModal from '@/components/ConfirmModal'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

import '@/assets/app.scss'
import moneta from '@/assets/fonts/moneta'
import '@/assets/reset.scss'

export const viewport: Viewport = {
  themeColor: '#98252a',
}

export const metadata = appMetadata

const RootLayout = async ({ children }: PropsWithChildren) => {
  const cookieStore = await cookies()
  const confirmed = !!cookieStore.get('confirmed')
  const invites = await getInvitesData()

  return (
    <html lang="pt-br">
      <body className={moneta.variable}>
        <Analytics />
        <Nav />
        {children}
        <Footer />
        <ConfirmModal confirmed={confirmed} invites={invites} />
      </body>
    </html>
  )
}

export default RootLayout
