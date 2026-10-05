import PortfolioDocument from '@/components/PortfolioDocument'

export { metadata, viewport } from '@/components/PortfolioDocument'
export default function EntryLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <PortfolioDocument lang="en">{children}</PortfolioDocument>
}
