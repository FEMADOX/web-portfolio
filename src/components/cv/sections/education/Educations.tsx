import type { Lang } from '@/app/types'
import { EducationComponent } from './Education'
import { getEducations } from './utils'

interface EducationsProps {
  lang: Lang
}

export const Educations = ({ lang }: EducationsProps) => (
  <div className="space-y-5">
    {getEducations(lang).map((item) => (
      <EducationComponent
        key={item.degree}
        degree={item.degree}
        period={item.period}
      />
    ))}
  </div>
)
