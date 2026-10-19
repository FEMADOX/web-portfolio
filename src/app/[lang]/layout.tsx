import { notFound } from 'next/navigation'
import type { ChildrenProps } from '@/app/types'
import PortfolioDocument from '@/components/PortfolioDocument'
import CurrentYearServerProvider from '@/contexts/CurrentYearServerContext'
import LanguageServerProvider from '@/contexts/LanguageServerContext'
import { isLang } from '@/lib/language'

export {
  documentMetadata as metadata,
  documentViewport as viewport
} from '@/lib/documentMetadata'

interface LocalizedLayoutProps extends ChildrenProps {
  params: Promise<{ lang: string }>
}

export default async function LocalizedLayout({
  children,
  params
}: LocalizedLayoutProps) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  return (
    <PortfolioDocument lang={lang}>
      <LanguageServerProvider lang={lang}>
        <CurrentYearServerProvider>{children}</CurrentYearServerProvider>
      </LanguageServerProvider>
    </PortfolioDocument>
  )
}
