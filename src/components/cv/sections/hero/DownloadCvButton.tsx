import { Download } from 'lucide-react'
import { Button } from '../../../ui/button'

type DownloadCvButtonProps = {
  cvLangUrl: string
  downloadName: string
  buttonText: string
}

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
      <Download className="w-4 h-4 mr-2" />
      {buttonText}
    </a>
  </Button>
)
