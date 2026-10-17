import { describe, expect, test } from 'bun:test'
import { LANGUAGE_CONFIG, SITE_URL, SUPPORTED_LANGUAGES } from '@/app/constants'
import sitemap from '@/app/sitemap'
import { getProjects } from '@/components/cv/sections/project/utils'
import {
  getProjectDetail,
  getProjectDetails,
  PROJECT_SLUGS
} from '@/data/projects'
import getProjectMetadata from '@/lib/getProjectMetadata'
import { getLocalizedPathname, getProjectPath } from '@/lib/projectPaths'

describe('project discovery and localized routes', () => {
  for (const lang of SUPPORTED_LANGUAGES) {
    test(`${lang}: every overview card opens a complete case study`, () => {
      expect(
        getProjects(lang)
          .map(project => project.slug)
          .sort()
      ).toEqual([...PROJECT_SLUGS].sort())
      for (const card of getProjects(lang)) {
        const detail = getProjectDetail(lang, card.slug)
        expect(detail).toBeDefined()
        expect(detail?.links.github).toBe(card.links.github)
        expect(detail?.problem.length).toBeGreaterThan(0)
        expect(detail?.decisions.length).toBeGreaterThan(0)
        expect(detail?.outcomes.length).toBeGreaterThan(0)
        expect(
          detail?.evidence.every(source =>
            source.url.startsWith(card.links.github ?? '')
          )
        ).toBe(true)
      }
      expect(
        new Set(getProjectDetails(lang).map(project => project.slug)).size
      ).toBe(PROJECT_SLUGS.length)
    })

    test(`${lang}: changing language retains the selected project`, () => {
      for (const slug of PROJECT_SLUGS) {
        for (const nextLang of SUPPORTED_LANGUAGES) {
          expect(
            getLocalizedPathname(getProjectPath(lang, slug), nextLang)
          ).toBe(getProjectPath(nextLang, slug))
        }
      }
      expect(getProjectDetail(lang, 'missing-project')).toBeUndefined()
      expect(getProjectDetail(lang, '__proto__')).toBeUndefined()
    })

    test(`${lang}: metadata points to translations of the same case study`, () => {
      for (const project of getProjectDetails(lang)) {
        const metadata = getProjectMetadata(lang, project)
        expect(metadata.alternates?.canonical).toBe(
          getProjectPath(lang, project.slug)
        )
        for (const alternateLang of SUPPORTED_LANGUAGES) {
          expect(
            metadata.alternates?.languages?.[
              LANGUAGE_CONFIG[alternateLang].hreflang
            ]
          ).toBe(getProjectPath(alternateLang, project.slug))
        }
        expect(metadata.alternates?.languages?.['x-default']).toBe(
          getProjectPath('en', project.slug)
        )
      }
    })
  }

  test('sitemap includes every home and detail URL exactly once', () => {
    const urls = sitemap().map(entry => entry.url)
    expect(new Set(urls).size).toBe(urls.length)
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(urls).toContain(`${SITE_URL}/${lang}`)
      for (const slug of PROJECT_SLUGS)
        expect(urls).toContain(`${SITE_URL}${getProjectPath(lang, slug)}`)
    }
  })
})
