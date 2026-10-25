import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Suspense } from 'react'
import { Toaster } from 'sonner'

import '@/app/globals.css'
import AmbientBackground from '@/components/ambient/AmbientBackground'
import IntroductionPreferenceScript from '@/components/intro/IntroductionPreferenceScript'
import PortfolioIntroduction from '@/components/intro/PortfolioIntroduction'
import SidebarPreferenceScript from '@/components/layout/SidebarPreferenceScript'
import { ThemeProvider } from '@/components/theme-provider'
import { IntroductionProvider } from '@/contexts/IntroductionContext'
import { MotionPreferencesProvider } from '@/contexts/MotionPreferencesContext'
import { SidebarPreferencesProvider } from '@/contexts/SidebarPreferencesContext'
import { getDocumentLang } from '@/lib/language'
import type { LanguageChildrenProps } from '@/types/language'

const PortfolioDocument = ({ children, lang }: LanguageChildrenProps) => (
  <html
    className="relative"
    lang={getDocumentLang(lang)}
    data-scroll-behavior="smooth"
    suppressHydrationWarning
  >
    {/* biome-ignore lint/style/noHeadElement: The root App Router document needs this bootstrap before the first body paint. */}
    <head>
      <SidebarPreferenceScript />
      <IntroductionPreferenceScript />
    </head>
    <body className="relative isolate font-sans antialiased">
      <ThemeProvider>
        <SidebarPreferencesProvider>
          <MotionPreferencesProvider>
            <IntroductionProvider>
              <AmbientBackground />{' '}
              <Suspense fallback={null}>
                <PortfolioIntroduction lang={lang} />
              </Suspense>
              <div data-portfolio-content>{children}</div>
              <Toaster />
              {process.env.NODE_ENV === 'production' && <Analytics />}
              {process.env.NODE_ENV === 'production' && <SpeedInsights />}
            </IntroductionProvider>
          </MotionPreferencesProvider>
        </SidebarPreferencesProvider>
      </ThemeProvider>
    </body>
  </html>
)

export default PortfolioDocument
