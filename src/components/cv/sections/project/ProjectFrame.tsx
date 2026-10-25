'use client'

import * as motion from 'motion/react-m'
import { useState } from 'react'
import { ProjectReveal } from '@/components/projects/Motion'
import ProjectVisual from '@/components/projects/Visual'
import { useLanguageContext } from '@/contexts/LanguageContext'
import {
  PROJECT_CARD_CLASS_NAME,
  ProjectCardContent,
  type ProjectCardFrameProps
} from './ProjectCardFrame'

export const ProjectFrame = (props: Omit<ProjectCardFrameProps, 'lang'>) => {
  const lang = useLanguageContext()
  const [pressed, setPressed] = useState(false)

  return (
    <ProjectReveal className="h-full">
      <motion.article
        className={PROJECT_CARD_CLASS_NAME}
        data-project={props.project.slug}
        data-project-card={props.project.slug}
        data-pressed={pressed}
        tabIndex={-1}
        onTapStart={() => setPressed(true)}
        onTap={() => setPressed(false)}
        onTapCancel={() => setPressed(false)}
      >
        <ProjectCardContent
          {...props}
          lang={lang}
          visual={<ProjectVisual slug={props.project.slug} />}
        />
      </motion.article>
    </ProjectReveal>
  )
}
