import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Inter, Space_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import type { ChildrenProps } from './types'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})
const _inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://giancarlos-portfolio.vercel.app/'),
  title: 'Giancarlos Gonzalez | Web Developer',
  description:
    'Back-end python developer using Django and FastAPI with strong bases in Frontend Dev with TypeScript, React and NextJS.',
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
  openGraph: {
    title: 'Giancarlos Gonzalez | Web Developer',
    description:
      'Back-end python developer using Django and FastAPI with strong bases in Frontend Dev with TypeScript, React and NextJS.',
    url: 'https://giancarlos-portfolio.vercel.app/',
    siteName: 'Giancarlos Gonzalez Portfolio',
    images: [
      {
        url: '/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Giancarlos Gonzalez Portfolio Open Graph Image Light'
      },
      {
        url: '/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Giancarlos Gonzalez Portfolio Open Graph Image Dark'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giancarlos Gonzalez | Web Developer',
    description:
      'Back-end python developer using Django and FastAPI with strong bases in Frontend Dev with TypeScript, React and NextJS.',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Giancarlos Gonzalez Portfolio Twitter Card Image Light'
      },
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Giancarlos Gonzalez Portfolio Twitter Card Image Dark'
      }
    ]
  },
  manifest: '/site.webmanifest'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

const RootLayout = ({ children }: ChildrenProps) => (
  <html lang="en" suppressHydrationWarning>
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

export default RootLayout
