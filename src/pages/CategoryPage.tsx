import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'
import { TEST_IDS } from '../test-ids'
import NoteCard from '../components/NoteCard'
import { categories } from '../data/categories'
import { notes } from '../data/notes'

function CategoryPage() {
  const { category: slug } = useParams<{ category: string }>()
  const { t } = useTranslation()

  const category = categories.find((c) => c.slug === slug)
  const categoryNotes = notes.filter((n) => n.category === slug)

  if (!category) {
    return (
      <Layout>
        <p className="text-red-400">{t('category.notFound')}</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div data-testid={TEST_IDS.categoryPage.root}>
        <Link to="/" className="text-gray-400 hover:text-white mb-6 inline-block" data-testid={TEST_IDS.categoryPage.backLink}>
          {t('category.back')}
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-1" data-testid={TEST_IDS.categoryPage.title}>
            {category.emoji} {t(`data.categories.${category.slug}.title`, { defaultValue: category.title })}
          </h1>
          <p className="text-gray-400">{t(`data.categories.${category.slug}.description`, { defaultValue: category.description })}</p>
        </div>

        <div className="flex flex-col gap-4" data-testid={TEST_IDS.categoryPage.notesList}>
          {categoryNotes.length === 0 ? (
            <p className="text-gray-500">{t('category.empty')}</p>
          ) : (
            categoryNotes.map((note) => <NoteCard key={note.slug} note={note} />)
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryPage
