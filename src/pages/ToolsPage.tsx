import Layout from '../components/Layout'

type Tool = {
  name: string
  emoji: string
  description: string
  tip?: string
  url: string
}

const TOOL_GROUPS: { title: string; emoji: string; color: string; items: Tool[] }[] = [
  {
    title: 'CI/CD Pipelines',
    emoji: '🔁',
    color: 'border-blue-700',
    items: [
      {
        name: 'GitHub Actions',
        emoji: '🐙',
        description: 'Native CI/CD for GitHub repos. YAML-based workflows, huge marketplace of actions.',
        tip: 'Use matrix strategy to run tests in parallel across browsers or OS.',
        url: 'https://docs.github.com/en/actions',
      },
      {
        name: 'GitLab CI',
        emoji: '🦊',
        description: 'Built-in CI/CD in GitLab. Powerful pipeline syntax with includes, templates, and rules.',
        tip: 'Use `artifacts` to publish Allure or HTML reports after test runs.',
        url: 'https://docs.gitlab.com/ee/ci/',
      },
      {
        name: 'Jenkins',
        emoji: '🏗️',
        description: 'Self-hosted automation server with massive plugin ecosystem. Great for enterprise setups.',
        tip: 'Prefer Declarative Pipeline syntax over Scripted for readability.',
        url: 'https://www.jenkins.io/doc/',
      },
      {
        name: 'CircleCI',
        emoji: '⭕',
        description: 'Cloud-native CI/CD with fast caching and Docker-first design.',
        tip: 'Use orbs to reuse config across multiple projects.',
        url: 'https://circleci.com/docs/',
      },
    ],
  },
  {
    title: 'Reporting & Observability',
    emoji: '📊',
    color: 'border-green-700',
    items: [
      {
        name: 'Allure Report',
        emoji: '📈',
        description: 'Beautiful HTML test reports with history, trends, attachments, and environment info.',
        tip: 'Attach screenshots and videos on failure for easier debugging.',
        url: 'https://allurereport.org/docs/',
      },
      {
        name: 'TestRail',
        emoji: '🛤️',
        description: 'Test case management platform. Link automated results to manual test cases.',
        tip: 'Use the TestRail API to push automated results automatically after each run.',
        url: 'https://support.testrail.com/hc/en-us',
      },
      {
        name: 'Grafana',
        emoji: '📉',
        description: 'Visualize k6 performance metrics, flaky test rates, and build health over time.',
        tip: 'Pair with InfluxDB for k6 real-time dashboards.',
        url: 'https://grafana.com/docs/grafana/latest/',
      },
    ],
  },
  {
    title: 'Containerization',
    emoji: '🐳',
    color: 'border-cyan-700',
    items: [
      {
        name: 'Docker',
        emoji: '🐋',
        description: 'Run tests in isolated containers. Ensures consistent environments across local and CI.',
        tip: 'Use official Playwright Docker images for reproducible browser testing.',
        url: 'https://docs.docker.com/',
      },
      {
        name: 'Docker Compose',
        emoji: '🗂️',
        description: 'Spin up multi-service test environments (app + DB + mock server) with a single command.',
        tip: 'Use `depends_on` with health checks to avoid race conditions on startup.',
        url: 'https://docs.docker.com/compose/',
      },
      {
        name: 'Kubernetes',
        emoji: '☸️',
        description: 'Orchestrate distributed test execution at scale. Run thousands of parallel test pods.',
        tip: 'Combine with Selenoid or Playwright Grid for browser farm setups.',
        url: 'https://kubernetes.io/docs/home/',
      },
    ],
  },
  {
    title: 'Version Control & Collaboration',
    emoji: '🗃️',
    color: 'border-orange-700',
    items: [
      {
        name: 'Git',
        emoji: '🌿',
        description: 'Foundation of every AQA workflow. Branching, rebasing, and clean commit hygiene matter.',
        tip: 'Adopt conventional commits (feat/fix/test) for clear changelog and automation.',
        url: 'https://git-scm.com/doc',
      },
      {
        name: 'GitHub',
        emoji: '😺',
        description: 'Host repos, manage PRs, run CI, and track issues — all in one platform.',
        tip: 'Use branch protection rules to require passing tests before merging.',
        url: 'https://docs.github.com/en',
      },
    ],
  },
  {
    title: 'Languages & SDKs',
    emoji: '💻',
    color: 'border-purple-700',
    items: [
      {
        name: 'TypeScript',
        emoji: '🔷',
        description: 'Adds type safety to JS-based test frameworks. Catches bugs before runtime.',
        tip: 'Enable `strict` mode and type your page objects — it pays off fast.',
        url: 'https://www.typescriptlang.org/docs/',
      },
      {
        name: 'JavaScript (Node.js)',
        emoji: '🟡',
        description: 'The native language for Playwright, Cypress, and most modern web test frameworks.',
        tip: 'Prefer async/await over .then() chains for cleaner test code.',
        url: 'https://nodejs.org/en/docs',
      },
      {
        name: 'Python',
        emoji: '🐍',
        description: 'Popular for Playwright Python, Selenium, and pytest-based test suites.',
        tip: 'Use pytest fixtures for setup/teardown — they\'re more powerful than unittest.',
        url: 'https://docs.pytest.org/en/stable/',
      },
    ],
  },
  {
    title: 'Debugging & Dev Tools',
    emoji: '🔍',
    color: 'border-red-700',
    items: [
      {
        name: 'Playwright Trace Viewer',
        emoji: '🎞️',
        description: 'Step-by-step visual replay of test execution with DOM snapshots, network, console logs.',
        tip: 'Always save traces on CI failure: `--trace on-first-retry`.',
        url: 'https://playwright.dev/docs/trace-viewer',
      },
      {
        name: 'Chrome DevTools',
        emoji: '🔧',
        description: 'Inspect elements, capture network traffic, and debug JS during test development.',
        tip: 'Use the "Recorder" tab to generate Playwright/Puppeteer scripts from user actions.',
        url: 'https://developer.chrome.com/docs/devtools/',
      },
      {
        name: 'Postman Console',
        emoji: '🖥️',
        description: 'Inspect actual HTTP requests/responses when debugging API test failures.',
        tip: 'Use `pm.test` with descriptive names so failures are obvious in reports.',
        url: 'https://learning.postman.com/docs/sending-requests/response-data/troubleshooting-api-requests/',
      },
    ],
  },
]

function ToolsPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Tools</h1>
        <p className="text-gray-400 mb-10">
          Essential tools every AQA engineer should know — from CI/CD pipelines to debugging and reporting.
        </p>

        <div className="flex flex-col gap-10">
          {TOOL_GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>{group.emoji}</span> {group.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group bg-gray-800 border ${group.color} rounded-xl p-4 flex flex-col gap-2 hover:bg-gray-750 hover:brightness-110 transition-all cursor-pointer`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{tool.emoji}</span>
                        <span className="font-bold text-white group-hover:text-blue-300 transition-colors">{tool.name}</span>
                      </div>
                      <svg
                        className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                    {tool.tip && (
                      <div className="mt-auto pt-2 border-t border-gray-700">
                        <p className="text-xs text-blue-300">
                          <span className="font-semibold">Pro tip:</span> {tool.tip}
                        </p>
                      </div>
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

export default ToolsPage
