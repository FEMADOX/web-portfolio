import type { LanguageChildrenProps } from '@/types/language'
import { LanguageProvider } from './LanguageContext'

const LanguageServerProvider = ({ lang, ...props }: LanguageChildrenProps) => (
  <LanguageProvider lang={lang} {...props} />
)

export default LanguageServerProvider
