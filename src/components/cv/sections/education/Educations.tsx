import { EducationComponent } from './Education'
import { educations } from './utils'

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
