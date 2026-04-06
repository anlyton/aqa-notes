import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'
import { TEST_IDS } from '../test-ids'
import { notes } from '../data/notes'

function NotePage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  const note = notes.find((n) => n.slug === slug)

  if (!note) {
    return (
      <Layout>
        <div data-testid={TEST_IDS.notePage.root}>
          <Link to="/" className="text-gray-400 hover:text-white mb-6 inline-block" data-testid={TEST_IDS.notePage.backLink}>
            {t('category.back')}
          </Link>
          <h1 className="text-4xl font-bold text-red-400" data-testid={TEST_IDS.notePage.title}>
            {t('note.notFound')}
          </h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-3xl" data-testid={TEST_IDS.notePage.root}>
        <Link to={`/category/${note.category}`} className="text-gray-400 hover:text-white mb-6 inline-block" data-testid={TEST_IDS.notePage.backLink}>
          {t('category.back')}
        </Link>

        <h1 className="text-4xl font-bold text-blue-400 mb-3" data-testid={TEST_IDS.notePage.title}>
          {t(`data.notes.${note.slug}.title`, { defaultValue: note.title })}
        </h1>

        <p className="text-gray-400 mb-4">{t(`data.notes.${note.slug}.description`, { defaultValue: note.description })}</p>

        <div className="flex flex-wrap gap-2 mb-8" data-testid={TEST_IDS.notePage.tags}>
          {note.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-700 text-blue-300 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="text-gray-300 leading-relaxed space-y-4" data-testid={TEST_IDS.notePage.content}>
          {note.content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default NotePage
