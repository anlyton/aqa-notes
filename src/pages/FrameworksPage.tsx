import Layout from '../components/Layout'

type Framework = {
  name: string
  emoji: string
  description: string
  language: string
  type: string
  stars?: string
  url: string
}

const FRAMEWORK_GROUPS: { title: string; emoji: string; items: Framework[] }[] = [
  {
    title: 'Web Testing',
    emoji: '🌐',
    items: [
      {
        name: 'Playwright',
        emoji: '🎭',
        description: 'Modern, reliable end-to-end testing for web apps. Auto-waits, trace viewer, multi-browser.',
        language: 'JS/TS, Python, Java, C#',
        type: 'E2E',
        stars: '★★★★★',
        url: 'https://playwright.dev/docs/intro',
      },
      {
        name: 'Cypress',
        emoji: '🌲',
        description: 'Developer-friendly test runner with real-time reload and excellent DX for web apps.',
        language: 'JS/TS',
        type: 'E2E',
        stars: '★★★★☆',
        url: 'https://docs.cypress.io/guides/overview/why-cypress',
      },
      {
        name: 'Selenium',
        emoji: '🔵',
        description: 'The original browser automation framework. Wide language support, mature ecosystem.',
        language: 'Java, Python, JS, C#',
        type: 'E2E',
        stars: '★★★☆☆',
        url: 'https://www.selenium.dev/documentation/',
      },
      {
        name: 'WebdriverIO',
        emoji: '🤖',
        description: 'Extendable, flexible testing framework built on WebDriver and DevTools protocols.',
        language: 'JS/TS',
        type: 'E2E',
        stars: '★★★★☆',
        url: 'https://webdriver.io/docs/gettingstarted',
      },
    ],
  },
  {
    title: 'Mobile Testing',
    emoji: '📱',
    items: [
      {
        name: 'Detox',
        emoji: '🐳',
        description: 'Gray-box E2E testing for React Native. Synchronizes with JS thread for flake-free tests.',
        language: 'JS/TS',
        type: 'Mobile E2E',
        stars: '★★★★★',
        url: 'https://wix.github.io/Detox/docs/introduction/getting-started',
      },
      {
        name: 'Appium',
        emoji: '🐙',
        description: 'Cross-platform mobile automation for native, hybrid, and web apps using WebDriver protocol.',
        language: 'JS, Java, Python, Ruby',
        type: 'Mobile E2E',
        stars: '★★★★☆',
        url: 'https://appium.io/docs/en/latest/',
      },
      {
        name: 'Maestro',
        emoji: '🎼',
        description: 'Simple, fast mobile UI testing with YAML-based test scripts. Great for CI pipelines.',
        language: 'YAML',
        type: 'Mobile E2E',
        stars: '★★★★☆',
        url: 'https://maestro.mobile.dev/getting-started/installing-maestro',
      },
      {
        name: 'XCUITest',
        emoji: '🍎',
        description: 'Apple\'s native UI testing framework for iOS and macOS apps. First-class Xcode integration.',
        language: 'Swift, Obj-C',
        type: 'iOS Native',
        stars: '★★★★☆',
        url: 'https://developer.apple.com/documentation/xctest',
      },
    ],
  },
  {
    title: 'API Testing',
    emoji: '🔌',
    items: [
      {
        name: 'Postman',
        emoji: '📬',
        description: 'Collaborative API platform with test scripting, collections, environments, and Newman CLI.',
        language: 'JS',
        type: 'API',
        stars: '★★★★★',
        url: 'https://learning.postman.com/docs/getting-started/overview/',
      },
      {
        name: 'Supertest',
        emoji: '⚡',
        description: 'High-level HTTP assertion library for Node.js. Works great with Jest or Mocha.',
        language: 'JS/TS',
        type: 'API',
        stars: '★★★★☆',
        url: 'https://github.com/ladjs/supertest',
      },
      {
        name: 'REST Assured',
        emoji: '☕',
        description: 'Java DSL for testing REST services. Fluent API, BDD-style assertions, deep JSON/XML support.',
        language: 'Java',
        type: 'API',
        stars: '★★★★☆',
        url: 'https://rest-assured.io/',
      },
      {
        name: 'Hoppscotch',
        emoji: '🪁',
        description: 'Open-source Postman alternative. Lightweight, browser-based, with CLI support.',
        language: 'JS',
        type: 'API',
        stars: '★★★☆☆',
        url: 'https://docs.hoppscotch.io/',
      },
    ],
  },
  {
    title: 'Performance Testing',
    emoji: '⚡',
    items: [
      {
        name: 'k6',
        emoji: '💨',
        description: 'Developer-centric load testing tool. Scripts in JS, great CI integration, rich metrics.',
        language: 'JS',
        type: 'Load',
        stars: '★★★★★',
        url: 'https://k6.io/docs/',
      },
      {
        name: 'JMeter',
        emoji: '🧪',
        description: 'Battle-tested Java load testing tool. GUI-based test building, wide protocol support.',
        language: 'Java / GUI',
        type: 'Load',
        stars: '★★★☆☆',
        url: 'https://jmeter.apache.org/usermanual/get-started.html',
      },
      {
        name: 'Lighthouse',
        emoji: '🏠',
        description: 'Google\'s tool for web performance, accessibility, SEO, and best practices auditing.',
        language: 'CLI / Node.js',
        type: 'Audit',
        stars: '★★★★★',
        url: 'https://developer.chrome.com/docs/lighthouse/overview/',
      },
    ],
  },
]

function FrameworksPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Frameworks</h1>
        <p className="text-gray-400 mb-10">
          A curated overview of the most important AQA frameworks — what they do, when to use them, and how they compare.
        </p>

        <div className="flex flex-col gap-10">
          {FRAMEWORK_GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>{group.emoji}</span> {group.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((fw) => (
                  <a
                    key={fw.name}
                    href={fw.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-2 hover:border-blue-500 hover:bg-gray-750 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{fw.emoji}</span>
                        <span className="font-bold text-white group-hover:text-blue-300 transition-colors">{fw.name}</span>
                      </div>
                      <svg
                        className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">{fw.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded">{fw.type}</span>
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{fw.language}</span>
                    </div>
                    {fw.stars && (
                      <p className="text-yellow-400 text-xs">{fw.stars}</p>
                    )}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default FrameworksPage
