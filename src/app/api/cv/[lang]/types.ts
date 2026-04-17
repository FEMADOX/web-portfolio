import type { cvByLang } from './route'

export type Lang = keyof typeof cvByLang
export interface CvProps {
  params: Promise<{ lang: Lang }>
}
