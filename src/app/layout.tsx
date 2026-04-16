import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'
import { Toaster } from 'sonner'
import type { ChildrenProps } from './types'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})
const _inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Giancarlos Gonzalez | Web Developer',
  description:
    'Back-end python developer using Django and FastAPI with strong bases in Frontend Dev with TypeScript, React and NextJS.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)'
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml'
      }
    ],
    apple: '/apple-icon.png'
  }
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
