import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { automationTypes } from '../data/automation-types'

function AutomationTypesPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Automation Types</h1>
        <p className="text-gray-400 mb-8">
          Explore the main categories of test automation — each with its own tools, patterns, and best practices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {automationTypes.map((type) => (
            <Link
              key={type.slug}
              to={`/category/${type.slug}`}
              className="group bg-gray-800 rounded-xl p-5 hover:bg-gray-700 transition-colors flex flex-col gap-3 border border-gray-700 hover:border-blue-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{type.emoji}</span>
                <span className={`text-xs text-white px-2 py-0.5 rounded-full font-medium ${type.badgeColor}`}>
                  {type.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {type.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{type.description}</p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {type.examples.map((ex) => (
                  <span key={ex} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                    {ex}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default AutomationTypesPage
