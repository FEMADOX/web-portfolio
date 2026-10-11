import { useLanguageContext } from '@/contexts/LanguageContext'
import { EducationComponent } from './Education'
import { getEducations } from './utils'

export const Educations = () => (
  <div className="space-y-5">
    {getEducations(useLanguageContext()).map(item => (
      <EducationComponent
        key={item.degree}
        degree={item.degree}
        period={item.period}
      />
    ))}
  </div>
)
