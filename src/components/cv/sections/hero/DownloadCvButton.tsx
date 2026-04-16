import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DownloadCvButtonProps } from './types'

const warmDownload = (url: string) => {
  void fetch(url, {
    method: 'HEAD',
    cache: 'force-cache'
  })
}

export const DownloadCvButton = ({
  cvLangUrl,
  downloadName,
  buttonText
}: DownloadCvButtonProps) => (
  <Button
    asChild
    className={`
      lg:hidden h-12 rounded-none border-2 border-border bg-accent text-accent-foreground font-black uppercase tracking-widest
      hover:bg-accent/60 shadow-(--shadow)
      button-animation
    `}
  >
    <a
      href={cvLangUrl}
      download={downloadName}
      onMouseEnter={() => warmDownload(cvLangUrl)}
    >
      {/* Download SVG should animate when button is hovered */}
      <Download
        className={'download-icon w-4 mr-2 sm:ml-2'}
        style={{ height: '100%' }}
      />
      {buttonText}
    </a>
  </Button>
)
