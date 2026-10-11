import CVPage from '@/components/cv/CVPage'
import CurrentYearServerProvider from '@/contexts/CurrentYearServerContext'
import LanguageServerProvider from '@/contexts/LanguageServerContext'

export default function EntryPage() {
  return (
    <LanguageServerProvider lang="en">
      <CurrentYearServerProvider>
        <CVPage />
      </CurrentYearServerProvider>
    </LanguageServerProvider>
  )
}
