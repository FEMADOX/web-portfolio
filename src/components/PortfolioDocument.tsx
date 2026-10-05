import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Toaster } from 'sonner'

import '@/app/globals.css'
import { getPortfolioMetadata, SITE_URL } from '@/app/metadata'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
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
      {
        url: '/favicon-white.svg',
        type: 'image/svg+xml'
      }
    ],
    apple: '/favicon-white.svg'
  },
  manifest: '/site.webmanifest'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export default function PortfolioDocument({
  children,
  lang
}: {
  children: React.ReactNode
  lang: string
}) {
  return (
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
          {process.env.NODE_ENV === 'production' && <Analytics />}
          {process.env.NODE_ENV === 'production' && <SpeedInsights />}
        </ThemeProvider>
      </body>
    </html>
  )
}
