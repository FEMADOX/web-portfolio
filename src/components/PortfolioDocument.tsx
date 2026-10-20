import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'

import '@/app/globals.css'
import AmbientBackground from '@/components/ambient/AmbientBackground'
import { ThemeProvider } from '@/components/theme-provider'
import { MotionPreferencesProvider } from '@/contexts/MotionPreferencesContext'
import { getDocumentLang } from '@/lib/language'
import type { LanguageChildrenProps } from '@/types/language'

const PortfolioDocument = ({ children, lang }: LanguageChildrenProps) => (
  <html
    className="relative"
    lang={getDocumentLang(lang)}
    data-scroll-behavior="smooth"
    suppressHydrationWarning
  >
    <body className="relative isolate font-sans antialiased">
      <ThemeProvider>
        <MotionPreferencesProvider>
          <AmbientBackground />
          {children}
          <Toaster />
          {process.env.NODE_ENV === 'production' && <Analytics />}
          {process.env.NODE_ENV === 'production' && <SpeedInsights />}
        </MotionPreferencesProvider>
      </ThemeProvider>
    </body>
  </html>
)

export default PortfolioDocument
