import { cn } from '@/lib/utils'

interface Props {
  effectsEnabled: boolean
}

export default function PreviewCodeBlock({ effectsEnabled }: Props) {
  return (
    <div className="mt-2 border-2 border-foreground bg-[#101114] p-2 font-mono text-[7px] text-[#f0ece8]">
      <div className="mb-1 border-b border-white/20 pb-1 text-[6px] text-white/70">
        main.py
      </div>
      <p>
        <span className="text-[#f5cc22]">from</span> fastapi{' '}
        <span className="text-[#f5cc22]">import</span> FastAPI
      </p>
      <p className="mt-0.5">app = FastAPI()</p>
      <div className="mt-2 flex items-center gap-1 text-[#93d8b1]">
        <span>Python · React · Next.js</span>
        <span
          aria-hidden="true"
          data-intro-preview-caret
          className={cn(
            'hidden h-2 w-1 bg-accent [html[data-introduction=pending]_&]:hidden',
            effectsEnabled && 'motion-safe:block motion-safe:animate-pulse'
          )}
        />
      </div>
    </div>
  )
}
