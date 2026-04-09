export type AutomationType = {
  slug: string
  emoji: string
  title: string
  description: string
  examples: string[]
  badge: string
  badgeColor: string
}

export const automationTypes: AutomationType[] = [
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