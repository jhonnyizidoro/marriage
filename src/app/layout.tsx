import appMetadata from '@/utils/metadata'
import type { Viewport } from 'next'
import { PropsWithChildren } from 'react'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

import '@/assets/app.scss'
import moneta from '@/assets/fonts/moneta'
import '@/assets/reset.scss'

export const viewport: Viewport = {
  themeColor: '#98252a',
}

export const metadata = appMetadata

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="pt-br">
    <body className={moneta.variable}>
      <Nav />
      {children}
      <Footer />
    </body>
  </html>
)

export default RootLayout
