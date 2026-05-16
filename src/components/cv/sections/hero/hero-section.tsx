'use client'

import type { CvLocale } from '@/app/types'
import { DownloadCvButton } from './DownloadCvButton'
import { FastAPICode } from './FastAPICode'

interface HeroSectionProps {
  hero: CvLocale['hero']
}

export const HeroSection = ({
  hero: {
    titleLineOne,
    titleLineTwo,
    description,
    downloadCv: { cvLangUrl, downloadName, buttonText }
  }
}: HeroSectionProps) => (
  <section id="summary" className="mt-2 mb-5 lg:mt-4">
    {/* Title */}
    <div className="mb-5 border-4 border-border bg-card p-6 shadow-normal">
      <h1 className="text-4xl xs:text-5xl sm:text-6xl font-black uppercase leading-none tracking-tight overflow-hidden">
        <span className="text-foreground font-bold font-['Space_Grotesk'] tracking-tighter leading-none">
          {titleLineOne}
        </span>
        <br />
        <span className="text-foreground font-bold font-['Space_Grotesk'] tracking-tighter leading-none">
          {titleLineTwo}
        </span>
      </h1>
      <div className="h-0.5 bg-border mt-3" />

      {/* Summary */}
      <p className="text-md xs:text-lg text-muted-foreground leading-relaxed mt-4 mb-4 max-w-2xl">
        {description}
      </p>

      {/* Download CV Button - Mobile */}
      <div className="flex flex-col gap-3 justify-self-center lg:hidden">
        <DownloadCvButton
          cvLangUrl={cvLangUrl}
          downloadName={downloadName}
          buttonText={buttonText}
          shadow="sm"
          animation={true}
        />
      </div>
    </div>

    {/* Code Snippet Visual */}
    <FastAPICode />
  </section>
)
