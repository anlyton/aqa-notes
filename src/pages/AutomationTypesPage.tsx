import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const AUTOMATION_TYPES = [
  {
    slug: 'web',
    emoji: '🌐',
    title: 'Web Automation',
    description:
      'Browser-based end-to-end testing. Simulate real user interactions across modern web apps.',
    examples: ['Playwright', 'Cypress', 'Selenium', 'WebdriverIO'],
    badge: 'Most common',
    badgeColor: 'bg-blue-500',
  },
  {
    slug: 'mobile',
    emoji: '📱',
    title: 'Mobile Automation',
    description:
      'Native and hybrid app testing on iOS and Android devices and simulators.',
    examples: ['Detox', 'Appium', 'Maestro', 'XCUITest'],
    badge: 'iOS & Android',
    badgeColor: 'bg-purple-500',
  },
  {
    slug: 'api',
    emoji: '🔌',
    title: 'API / Backend',
    description:
      'Validate REST and GraphQL endpoints, contracts, authentication, and data integrity.',
    examples: ['Postman', 'Supertest', 'REST Assured', 'Hoppscotch'],
    badge: 'REST & GraphQL',
    badgeColor: 'bg-green-600',
  },
  {
    slug: 'performance',
    emoji: '⚡',
    title: 'Performance Testing',
    description:
      'Load, stress, and spike testing to ensure your app handles real-world traffic.',
    examples: ['k6', 'JMeter', 'Lighthouse', 'WebPageTest'],
    badge: 'Load & Stress',
    badgeColor: 'bg-yellow-600',
  },
  {
    slug: 'security',
    emoji: '🔒',
    title: 'Security Testing',
    description:
      'Identify vulnerabilities, misconfigurations, and auth flaws before attackers do.',
    examples: ['OWASP ZAP', 'Burp Suite', 'Snyk', 'Trivy'],
    badge: 'OWASP',
    badgeColor: 'bg-red-600',
  },
  {
    slug: 'test-design',
    emoji: '📐',
    title: 'Test Design',
    description:
      'Strategies, patterns, and methodologies for writing maintainable test suites.',
    examples: ['Page Object Model', 'BDD / Gherkin', 'TDD', 'Risk-based'],
    badge: 'Patterns',
    badgeColor: 'bg-indigo-500',
  },
]

function AutomationTypesPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Automation Types</h1>
        <p className="text-gray-400 mb-8">
          Explore the main categories of test automation — each with its own tools, patterns, and best practices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AUTOMATION_TYPES.map((type) => (
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
