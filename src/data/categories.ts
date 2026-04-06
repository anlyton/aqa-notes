export type Category = {
  slug: string
  title: string
  emoji: string
  description: string
}

export const categories: Category[] = [
  { slug: 'web', title: 'Web Automation', emoji: '🌐', description: 'Playwright, Selenium, Cypress' },
  { slug: 'mobile', title: 'Mobile Automation', emoji: '📱', description: 'Detox, Maestro, Appium' },
  { slug: 'api', title: 'API / Backend', emoji: '🔌', description: 'REST, GraphQL, Postman' },
  { slug: 'performance', title: 'Performance', emoji: '⚡', description: 'k6, Lighthouse, WebPageTest' },
  { slug: 'cicd', title: 'CI/CD & Infrastructure', emoji: '🔧', description: 'GitHub Actions, Docker, Runners' },
  { slug: 'test-design', title: 'Test Design', emoji: '📐', description: 'Patterns, POM, Strategies' },
  { slug: 'tools', title: 'Tools & Misc', emoji: '🛠️', description: 'Git, TypeScript, Debugging' },
  { slug: 'security', title: 'Security Testing', emoji: '🔒', description: 'OWASP, ZAP, Auth testing' },
]
