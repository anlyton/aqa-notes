import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'
import { TEST_IDS } from '../test-ids'
import CategoryCard from '../components/CategoryCard'
import { categories } from '../data/categories'
import { notes } from '../data/notes'

function HomePage() {
  const { t } = useTranslation()

  return (
    <Layout>
      <div data-testid={TEST_IDS.homePage.root}>
        <h1 className="text-4xl font-bold text-blue-400 mb-2">{t('home.title')}</h1>
        <p className="text-gray-400 mb-8">{t('home.subtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid={TEST_IDS.homePage.categoriesGrid}>
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              noteCount={notes.filter((n) => n.category === category.slug).length}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
