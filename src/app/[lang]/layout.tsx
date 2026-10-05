import { notFound } from 'next/navigation'
import PortfolioDocument from '@/components/PortfolioDocument'

export { metadata, viewport } from '@/components/PortfolioDocument'
export default async function LocalizedLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'es' && lang !== 'pt') notFound()
  return (
    <PortfolioDocument lang={lang === 'en' ? 'en-US' : lang}>
      {children}
    </PortfolioDocument>
  )
}
