'use client'

import { Download } from 'lucide-react'
import { toast } from 'sonner'
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
  buttonText,
  downloadNotice,
  downloadDescription,
  shadow,
  animation,
  variant = 'default'
}: DownloadCvButtonProps) => {
  const notifyDownload = () =>
    toast.success(downloadNotice, {
      description: downloadDescription
    })

  return (
    <div className="flex shrink-0 justify-center">
      <Button
        asChild
        className={`
          ${variant === 'dock' ? 'size-11 p-0' : 'h-12'} rounded-none border-2 border-border bg-accent text-accent-foreground font-black uppercase tracking-widest
          hover:bg-accent/60 ${shadow ? `shadow-${shadow}` : ''}
          ${animation ? 'button-animation' : ''}
        `}
      >
        <a
          className="text-xs sm:text-base"
          href={cvLangUrl}
          title={variant === 'dock' ? buttonText : undefined}
          download={downloadName}
          onMouseEnter={() => warmDownload(cvLangUrl)}
          onClick={notifyDownload}
        >
          {/* Download SVG should animate when the button is hovered */}
          <Download
            className={`download-icon ${variant === 'dock' ? 'size-4' : 'w-4 mr-2 sm:ml-2 h-full'}`}
            aria-hidden="true"
          />
          <span className={variant === 'dock' ? 'sr-only' : undefined}>
            {buttonText}
          </span>
        </a>
      </Button>
    </div>
  )
}
