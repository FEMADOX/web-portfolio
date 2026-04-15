import { GraduationCap } from 'lucide-react'

interface EducationComponentProps {
  degree: string
  period: string
}

export const EducationComponent = ({
  degree,
  period
}: EducationComponentProps) => (
  <div
    key={degree}
    className="flex gap-4 p-4 bg-card border-2 border-border shadow-normal elevation-animation"
  >
    <div className="shrink-0">
      <div className="w-10 h-10 flex items-center justify-center">
        <GraduationCap stroke="currentColor" size={30} />
      </div>
    </div>
    <div>
      <h3 className="font-black uppercase leading-tight text-foreground">
        {degree}
      </h3>
      <p className="text-xs font-bold uppercase text-muted-foreground mt-2">
        {period}
      </p>
    </div>
  </div>
)
