import env from '@/env'
import { Metadata } from 'next'

const metadata: Metadata = {
  metadataBase: new URL(env.domain),
  title: 'Casamento Jhonny & Nathália',
  description: `Site oficial do casamento de Jhonny e Nathália. Confirme sua presença, veja detalhes da cerimônia e recepção.`,
  keywords: [
    'casamento',
    'Jhonny e Nathália',
    'casamento Jhonny Nathália',
    'casamentojn',
    'confirmação de presença',
    'cerimônia',
    'recepção',
  ],
  authors: [
    { name: 'Jhonny Izidoro', url: 'https://github.com/jhonnyizidoro' },
  ],
  creator: 'Jhonny e Nathália',
  publisher: 'Jhonny e Nathália',
  alternates: { canonical: '/', languages: { 'pt-BR': '/pt-BR' } },
  openGraph: {
    title: 'Casamento Jhonny & Nathália',
    description: `Site oficial do casamento de Jhonny e Nathália. Veja informações sobre a cerimônia, recepção e RSVP.`,
    url: env.domain,
    siteName: 'Casamento Jhonny & Nathália',
    images: [
      { url: `${env.domain}/seo/og-image.png`, width: 1024, height: 1024 },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/seo/favicon.ico' },
      { url: '/seo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/seo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/seo/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/seo/favicon.ico'],
  },
  manifest: '/seo/site.webmanifest',
  category: 'event',
}

export default metadata
