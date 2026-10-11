import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'

import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { getDocumentLang } from '@/lib/language'
import type { LanguageChildrenProps } from '@/types/language'

const PortfolioDocument = ({ children, lang }: LanguageChildrenProps) => (
  <html
    lang={getDocumentLang(lang)}
    data-scroll-behavior="smooth"
    suppressHydrationWarning
  >
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

export default PortfolioDocument
