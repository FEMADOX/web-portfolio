import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import type { Lang } from '@/app/types'
import { PROJECT_SLUGS, type ProjectDetail } from '@/data/projects/types'
import { getProjectPath } from '@/lib/projectPaths'
import { getProjectLabels } from './labels'
import { ProjectReveal } from './ProjectMotion'
import { ProjectShell } from './ProjectShell'
import { ProjectVisual } from './ProjectVisual'

function ChapterTitle({
  number,
  label,
  title
}: {
  number: string
  label: string
  title: string
}) {
  return (
    <div className="project-chapter-heading">
      <span className="project-chapter-number" aria-hidden="true">
        {number}
      </span>
      <div>
        <p className="project-eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
    </div>
  )
}

export function ProjectDetailPage({
  lang,
  project,
  nextProject,
  index
}: {
  lang: Lang
  project: ProjectDetail
  nextProject: ProjectDetail
  index: number
}) {
  const labels = getProjectLabels(lang)
  const readingText = [
    project.intro,
    project.problem,
    project.solution,
    ...project.contributions.map(x => x.description),
    project.architecture.summary,
    ...project.architecture.steps.map(x => x.description),
    ...project.decisions.map(x => `${x.description} ${x.tradeoff}`),
    ...project.outcomes,
    project.learnings
  ].join(' ')
  const minutes = Math.max(1, Math.ceil(readingText.split(/\s+/).length / 200))
  return (
    <ProjectShell
      key={project.slug}
      lang={lang}
      slug={project.slug}
      title={project.title}
      index={index}
    >
      <div className="project-content">
        <header className="project-hero">
          <div className="project-hero-top">
            <Link href={`/${lang}#projects`} transitionTypes={['project-back']}>
              <ArrowLeft size={15} aria-hidden="true" />
              {labels.selected}
            </Link>
            <span>
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(PROJECT_SLUGS.length).padStart(2, '0')} · {minutes}{' '}
              {labels.minRead}
            </span>
          </div>
          <p className="project-eyebrow project-hero-eyebrow">
            {labels.caseStudy} <span>↘</span>
          </p>
          <h1>{project.title}</h1>
          <p className="project-headline">{project.headline}</p>
          <p className="project-intro">{project.intro}</p>
          <div className="project-hero-actions">
            <a className="project-button" href="#challenge">
              {labels.explore}
              <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a
              className="project-text-link"
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 size={17} aria-hidden="true" />
              {labels.source}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            {project.links.website && (
              <a
                className="project-text-link"
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.demo}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
          </div>
          <figure className="project-hero-figure">
            <ProjectVisual slug={project.slug} />
            <figcaption>{labels.schematic}</figcaption>
          </figure>
          <dl className="project-facts">
            {[
              [labels.role, project.role],
              [labels.context, project.context],
              [labels.status, project.status],
              [labels.period, project.period]
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section id="challenge" className="project-chapter">
          <ProjectReveal>
            <ChapterTitle
              number="01"
              label={labels.chapters[0]}
              title={labels.challengeTitle}
            />
            <div className="project-problem-grid">
              <div>
                <h3>{labels.problem}</h3>
                <p>{project.problem}</p>
              </div>
              <div className="project-solution">
                <h3>{labels.solution}</h3>
                <p>{project.solution}</p>
              </div>
            </div>
          </ProjectReveal>
        </section>

        <section id="contribution" className="project-chapter">
          <ProjectReveal>
            <ChapterTitle
              number="02"
              label={labels.chapters[1]}
              title={labels.contributionTitle}
            />
            <div className="project-contributions">
              {project.contributions.map((item, i) => (
                <div key={item.title}>
                  <span className="project-small-number">0{i + 1} /</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </ProjectReveal>
        </section>

        <section id="architecture" className="project-chapter">
          <ProjectReveal>
            <ChapterTitle
              number="03"
              label={labels.chapters[2]}
              title={labels.architectureTitle}
            />
            <p className="project-section-intro">
              {project.architecture.summary}
            </p>
            <ol className="project-architecture">
              {project.architecture.steps.map((step, i) => (
                <li key={step.title}>
                  <span
                    className="project-architecture-index"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {i < project.architecture.steps.length - 1 && (
                    <ArrowDown
                      className="project-flow-arrow"
                      size={18}
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
            <div className="project-stack">
              <h3 className="project-eyebrow">{labels.stack}</h3>
              <ul>
                {project.technologies.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </ProjectReveal>
        </section>

        <section id="decisions" className="project-chapter">
          <ProjectReveal>
            <ChapterTitle
              number="04"
              label={labels.chapters[3]}
              title={labels.decisionsTitle}
            />
            <div className="project-decisions">
              {project.decisions.map((decision, i) => (
                <details key={decision.title} open={i === 0}>
                  <summary>
                    <span className="project-small-number">0{i + 1}</span>
                    <h3>{decision.title}</h3>
                    <span
                      className="project-decision-toggle"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="project-decision-body">
                    <p>{decision.description}</p>
                    <div>
                      <h4>{labels.tradeoff}</h4>
                      <p>{decision.tradeoff}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </ProjectReveal>
        </section>

        <section id="outcomes" className="project-chapter">
          <ProjectReveal>
            <ChapterTitle
              number="05"
              label={labels.chapters[4]}
              title={labels.outcomesTitle}
            />
            <ul className="project-outcomes">
              {project.outcomes.map(outcome => (
                <li key={outcome}>
                  <Check size={22} aria-hidden="true" />
                  <p>{outcome}</p>
                </li>
              ))}
            </ul>
            <div className="project-learning">
              <p className="project-eyebrow">{labels.learning}</p>
              <p>{project.learnings}</p>
            </div>
            <div className="project-evidence">
              <div>
                <h3>{labels.evidence}</h3>
                <p>{labels.evidenceHint}</p>
              </div>
              <ul>
                {project.evidence.map(source => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ProjectReveal>
        </section>

        <section
          className="project-next"
          aria-labelledby="next-project-heading"
        >
          <p className="project-eyebrow">{labels.next}</p>
          <Link
            href={getProjectPath(lang, nextProject.slug)}
            transitionTypes={['project-forward']}
            className="project-next-link"
          >
            <div>
              <span>{labels.nextProject}</span>
              <h2 id="next-project-heading">{nextProject.title}</h2>
              <p>{nextProject.headline}</p>
            </div>
            <ArrowUpRight
              className="project-next-arrow"
              size={48}
              aria-hidden="true"
            />
          </Link>
          <div className="project-contact">
            <p>{labels.contact}</p>
            <Link
              href={`/${lang}#contact`}
              className="project-button"
              transitionTypes={['project-back']}
            >
              {labels.contactAction}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </ProjectShell>
  )
}
