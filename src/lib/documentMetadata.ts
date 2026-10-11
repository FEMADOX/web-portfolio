import type { Metadata, Viewport } from 'next'
import { SITE_URL } from '@/app/constants'
import getPortfolioMetadata from '@/lib/getPortfolioMetadata'

export const documentMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...getPortfolioMetadata('en'),
  icons: {
    icon: [
      {
        url: '/favicon-white.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: '/favicon-black.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)'
      },
      { url: '/favicon-white.svg', type: 'image/svg+xml' }
    ],
    apple: '/favicon-white.svg'
  },
  manifest: '/site.webmanifest'
}

export const documentViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}
