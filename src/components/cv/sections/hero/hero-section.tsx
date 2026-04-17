'use client'

import { CV_FILES } from '@/components/constants'
import { DownloadCvButton } from './DownloadCvButton'
import { FastAPICode } from './FastAPICode'

export const HeroSection = () => (
  <section id="summary" className="mt-2 mb-5 lg:mt-4">
    {/* Title */}
    <div className="mb-5 border-4 border-border bg-card p-6 shadow-normal">
      <h1 className="text-5xl sm:text-6xl font-black uppercase leading-none tracking-tight">
        <span className="text-foreground font-bold font-['Space_Grotesk'] tracking-tighter leading-none">
          Web
        </span>
        <br />
        <span className="text-foreground font-bold font-['Space_Grotesk'] tracking-tighter leading-none">
          Developer
        </span>
      </h1>
      <div className="h-0.5 bg-border mt-3" />

      {/* Summary */}
      <p className="text-lg text-muted-foreground leading-relaxed mt-4 mb-4 max-w-2xl">
        Back-end python developer using Django and FastAPI with strong bases in
        Frontend Dev with TypeScript, React and NextJS focusing on delivering
        impactful results.
      </p>

      {/* Download CV Button - Mobile */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-around lg:hidden">
        <DownloadCvButton
          cvLangUrl={CV_FILES.en}
          downloadName="Giancarlos-Gonzalez-CV-EN.pdf"
          buttonText="Download CV"
          shadow="sm"
          animation={true}
        />

        <DownloadCvButton
          cvLangUrl={CV_FILES.es}
          downloadName="Giancarlos-Gonzalez-CV-ES.pdf"
          buttonText="Descargar CV"
          shadow="sm"
          animation={true}
        />
      </div>
    </div>

    {/* Code Snippet Visual */}
    <FastAPICode />
  </section>
)
