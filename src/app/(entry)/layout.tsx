import PortfolioDocument from '@/components/PortfolioDocument'
import type { ChildrenProps } from '../types'

export {
  documentMetadata as metadata,
  documentViewport as viewport
} from '@/lib/documentMetadata'

export default function EntryLayout({ children }: ChildrenProps) {
  return <PortfolioDocument lang="en">{children}</PortfolioDocument>
}
