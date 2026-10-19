import type {
  chapterClasses,
  chapterHeadingClasses,
  chapterParagraphClasses,
  decisionClasses,
  eyebrowClasses,
  projectButtonClasses,
  smallNumberClasses,
  textLinkClasses
} from './detailStyles'

export type ProjectLabels = {
  caseStudy: string
  explore: string
  cardHint: string
  intro: string
  introBody: string
  selected: string
  back: string
  contents: string
  chapters: string[]
  role: string
  context: string
  status: string
  period: string
  stack: string
  problem: string
  solution: string
  challengeTitle: string
  contributionTitle: string
  architectureTitle: string
  decisionsTitle: string
  outcomesTitle: string
  tradeoff: string
  learning: string
  evidence: string
  evidenceHint: string
  source: string
  demo: string
  schematic: string
  minRead: string
  next: string
  nextProject: string
  contact: string
  contactAction: string
  skip: string
  progress: string
}

export type eyebrowClassesType = typeof eyebrowClasses
export type chapterClassesType = typeof chapterClasses
export type chapterHeadingClassesType = typeof chapterHeadingClasses
export type chapterParagraphClassesType = typeof chapterParagraphClasses
export type smallNumberClassesType = typeof smallNumberClasses
export type textLinkClassesType = typeof textLinkClasses
export type decisionClassesType = typeof decisionClasses
export type projectButtonClassesType = typeof projectButtonClasses
