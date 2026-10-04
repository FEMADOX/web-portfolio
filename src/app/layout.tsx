import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Toaster } from 'sonner'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { getPortfolioMetadata, SITE_URL } from './metadata'
import type { ChildrenProps } from './types'

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

const RootLayout = async ({ children }: ChildrenProps) => {
  const routeLang = (await headers()).get('x-portfolio-lang') ?? 'en'
  const lang = routeLang === 'pt' ? 'pt-BR' : routeLang
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

export default RootLayout
