import type { Lang } from '@/app/types'

export interface CvProps {
  params: Promise<{ lang: Lang }>
}
