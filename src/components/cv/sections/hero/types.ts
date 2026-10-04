import type { CvDownload } from '@/app/types'

export type DownloadCvButtonProps = CvDownload & {
  shadow?: 'sm' | 'normal'
  animation?: boolean
}
