import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type Category } from '../data/categories'
import { TEST_IDS } from '../test-ids'

type CategoryCardProps = {
  category: Category
  noteCount: number
}

function CategoryCard({ category, noteCount }: CategoryCardProps) {
  const { t } = useTranslation()

  return (
    <Link to={`/category/${category.slug}`} data-testid={TEST_IDS.categoryCard.root}>
      <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer h-full">
        <div className="text-3xl mb-3">{category.emoji}</div>
        <h2 className="text-xl font-bold text-white mb-1" data-testid={TEST_IDS.categoryCard.title}>
          {t(`data.categories.${category.slug}.title`, { defaultValue: category.title })}
        </h2>
        <p className="text-gray-400 text-sm mb-3" data-testid={TEST_IDS.categoryCard.description}>
          {t(`data.categories.${category.slug}.description`, { defaultValue: category.description })}
        </p>
        <span className="text-xs text-blue-400 font-medium">
          {t('categoryCard.noteCount', { count: noteCount })}
        </span>
      </div>
    </Link>
  )
}

export default CategoryCard
