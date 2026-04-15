import { educations } from '@/components/cv/utils/education'
import { EducationComponent } from './Education'

export const Educations = () => (
  <div className="space-y-5">
    {educations.map((item) => (
      <EducationComponent
        key={item.degree}
        degree={item.degree}
        period={item.period}
      />
    ))}
  </div>
)
