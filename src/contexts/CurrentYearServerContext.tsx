import type { ChildrenProps } from '@/app/types'
import getCurrentYear from '@/lib/getCurrentYear'
import { CurrentYearProvider } from './CurrentYearContext'

const CurrentYearServerProvider = async ({ ...props }: ChildrenProps) => (
  <CurrentYearProvider currentYear={await getCurrentYear()} {...props} />
)

export default CurrentYearServerProvider
