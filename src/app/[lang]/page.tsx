import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CVPage from '@/components/cv/CVPage'
import { getPortfolioMetadata } from '../metadata'
import type { Lang } from '../types'

type Props = { params: Promise<{ lang: string }> }

const isLang = (lang: string): lang is Lang =>
  lang === 'en' || lang === 'es' || lang === 'pt'

export const generateStaticParams = () => [
  { lang: 'en' },
  { lang: 'es' },
  { lang: 'pt' }
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return isLang(lang) ? getPortfolioMetadata(lang) : {}
}

export default async function LocalizedCVPage({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return <CVPage initialLang={lang} />
}
