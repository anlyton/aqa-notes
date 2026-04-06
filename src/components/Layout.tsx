import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TEST_IDS } from '../test-ids'

type LayoutProps = {
  children: React.ReactNode
}

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UA' },
]

function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-900 text-white" data-testid={TEST_IDS.layout.root}>
      <header className="bg-gray-800 border-b border-gray-700 px-8 py-4 flex items-center justify-between" data-testid={TEST_IDS.layout.header}>
        <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300" data-testid={TEST_IDS.layout.headerTitle}>
          {t('header.title')}
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`text-sm px-2 py-1 rounded transition-colors ${
                  i18n.language === code
                    ? 'text-blue-400 font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
                data-testid={TEST_IDS.layout.langSwitch(code)}
              >
                {label}
              </button>
            ))}
          </div>

          <Link
            to="/search"
            className="text-gray-400 hover:text-white transition-colors"
            data-testid={TEST_IDS.layout.headerSearchLink}
            aria-label={t('header.searchLabel')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="p-8">
        {children}
      </main>
    </div>
  )
}

export default Layout
