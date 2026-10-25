import type { CvLocale } from '@/app/types'
import { cn } from '@/lib/utils'

interface Props {
  locale: CvLocale
  role: string
}

export default function PreviewSidebar({ locale, role }: Props) {
  return (
    <div className="hidden w-[29%] shrink-0 flex-col border-r-2 border-foreground bg-card lg:flex">
      <div className="border-b-2 border-foreground p-2">
        <div className="text-[9px] font-black uppercase leading-tight">
          GG Giancarlos
        </div>
        <p className="mt-1 font-mono text-[6px] leading-tight">{role}</p>
      </div>
      <div className="space-y-2 px-1.5 py-3 font-mono text-[7px]">
        {Object.values(locale.navigation).map((label, index) => (
          <div
            key={label}
            className={cn(
              'px-1 py-1.5',
              index === 0 &&
                'border border-foreground bg-accent font-bold text-accent-foreground'
            )}
          >
            {String(index + 1).padStart(2, '0')} {label}
          </div>
        ))}
      </div>
      <div className="mt-auto m-1.5 border border-foreground py-1.5 text-center font-mono text-[6px] font-bold">
        {locale.hero.downloadCv.buttonText}
      </div>
    </div>
  )
}
