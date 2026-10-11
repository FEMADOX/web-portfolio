import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CVPage from '@/components/cv/CVPage'
import CurrentYearServerProvider from '@/contexts/CurrentYearServerContext'
import LanguageServerProvider from '@/contexts/LanguageServerContext'
import getPortfolioMetadata from '@/lib/getPortfolioMetadata'
import { isLang } from '@/lib/language'
import { SUPPORTED_LANGUAGES } from '../constants'

type Props = { params: Promise<{ lang: string }> }

export const generateStaticParams = () =>
  SUPPORTED_LANGUAGES.map(lang => ({ lang }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return isLang(lang) ? getPortfolioMetadata(lang) : {}
}

export default async function LocalizedCVPage({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return (
    <LanguageServerProvider lang={lang}>
      <CurrentYearServerProvider>
        <CVPage />
      </CurrentYearServerProvider>
    </LanguageServerProvider>
  )
}
