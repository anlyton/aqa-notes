export type Note = {
  slug: string
  title: string
  category: string
  description: string
  content: string
  tags: string[]
  image?: string
  docs?: { label: string; url: string }[]
}

export const notes: Note[] = [
  // ─── Web Automation ───────────────────────────────────────────────────────
  {
    slug: 'playwright-selectors',
    title: 'Playwright Selectors Best Practices',
    category: 'web',
    description: 'How to write resilient, maintainable locators in Playwright.',
    tags: ['playwright', 'locators', 'selectors'],
    image: 'https://cdn.simpleicons.org/playwright',
    docs: [
      { label: 'Playwright Locators', url: 'https://playwright.dev/docs/locators' },
      { label: 'Best Practices', url: 'https://playwright.dev/docs/best-practices' },
      { label: 'Codegen', url: 'https://playwright.dev/docs/codegen' },
    ],
    content: `Resilient selectors are the single biggest factor in stable end-to-end tests. Playwright offers several locator strategies — the recommended approach is to prefer **user-visible attributes** over implementation details.

## Prefer semantic locators

Use \`getByRole\`, \`getByLabel\`, \`getByPlaceholder\`, and \`getByText\` whenever possible. These mirror how real users interact with the UI and survive visual redesigns.

## Avoid fragile selectors

Avoid CSS class selectors and XPaths that encode DOM structure:

- ❌ \`.btn-primary\` — breaks on style refactors
- ❌ \`//div[3]/span[1]\` — breaks on markup changes
- ✅ \`data-testid\` — explicit contract between dev and QA

## Chaining locators

Chaining is powerful and readable. Instead of a long CSS path:

\`\`\`ts
page.getByRole('dialog').getByRole('button', { name: 'Confirm' })
\`\`\`

This scopes the search to the dialog, avoids ambiguity, and reads like a sentence.

## Filtering lists

Use \`locator.filter()\` to narrow down a list of matching elements:

\`\`\`ts
page.getByRole('listitem').filter({ hasText: 'Invoice #1042' })
\`\`\`

Combine with \`.first()\`, \`.last()\`, or \`.nth()\` only when the ordering is semantically stable.

## Strict mode

Playwright throws if a locator matches multiple elements by default in action calls — this surfaces ambiguous selectors early. Run \`playwright codegen\` to generate initial locators quickly, then review and harden them before committing.`,
  },
  {
    slug: 'playwright-page-objects',
    title: 'Page Object Model in Playwright',
    category: 'web',
    description: 'Structuring Playwright tests with the Page Object Model pattern.',
    tags: ['playwright', 'pom', 'architecture'],
    image: 'https://cdn.simpleicons.org/playwright',
    docs: [
      { label: 'Page Object Models', url: 'https://playwright.dev/docs/pom' },
      { label: 'Playwright Fixtures', url: 'https://playwright.dev/docs/test-fixtures' },
      { label: 'Test Organization', url: 'https://playwright.dev/docs/test-projects' },
    ],
    content: `The **Page Object Model (POM)** encapsulates the UI structure of a page behind a class, so tests interact with a readable API rather than raw selectors.

## Basic page object

\`\`\`ts
export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email)
    await this.page.getByLabel('Password').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }
}
\`\`\`

The test then reads:

\`\`\`ts
await loginPage.login('user@example.com', 'secret')
\`\`\`

## Keep page objects thin

- ✅ Expose user actions: \`login()\`, \`submitForm()\`, \`openMenu()\`
- ❌ Do not put assertions inside page objects — move those to the test or a dedicated helper
- A page object that checks text content mixes responsibilities and becomes hard to reuse

## Composing page objects

For complex flows, compose page objects together:

\`\`\`ts
await checkout
  .addItem('Widget')
  .proceedToShipping()
  .fillAddress(addr)
  .pay(card)
  .assertOrderConfirmed()
\`\`\`

## Use Playwright fixtures for injection

Create a custom fixture that instantiates your page objects and passes them to every test automatically — this eliminates repetitive setup code and makes the test file itself a clean specification of behavior.`,
  },
  {
    slug: 'playwright-network-interception',
    title: 'Network Interception and Mocking in Playwright',
    category: 'web',
    description: 'Intercept, mock, and stub network requests to isolate UI tests.',
    tags: ['playwright', 'network', 'mocking', 'api'],
    image: 'https://cdn.simpleicons.org/playwright',
    docs: [
      { label: 'Network API', url: 'https://playwright.dev/docs/network' },
      { label: 'Mock APIs', url: 'https://playwright.dev/docs/mock' },
      { label: 'Route from HAR', url: 'https://playwright.dev/docs/mock#record-and-replay-requests' },
    ],
    content: `Playwright's \`page.route()\` API lets you intercept any network request and respond with a fixture, modify it in flight, or abort it entirely.

## Mocking a successful response

\`\`\`ts
await page.route('**/api/users', route =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(users),
  })
)
\`\`\`

Keep fixture files in a \`__fixtures__\` directory so they can be shared across tests.

## Simulating errors

\`\`\`ts
await page.route('**/api/checkout', route =>
  route.fulfill({ status: 500, body: 'Internal Server Error' })
)
\`\`\`

Verify the UI shows a meaningful error message rather than crashing silently.

## Performance & stability benefits

Network interception is also useful in CI to:

- Block third-party analytics, chat widgets, and CDN assets irrelevant to the feature under test
- Speed up test runs by removing dependency on external services
- Eliminate flakiness from slow or unavailable upstream APIs

## Replay with HAR files

\`\`\`ts
await page.routeFromHAR('./fixtures/api.har', { update: false })
\`\`\`

Record a real session once with browser DevTools, then use it as a stable mock layer. This captures realistic response shapes and headers without maintaining individual JSON fixtures for every endpoint.`,
  },

  // ─── Mobile Automation ────────────────────────────────────────────────────
  {
    slug: 'detox-getting-started',
    title: 'Getting Started with Detox',
    category: 'mobile',
    description: 'Set up Detox for React Native end-to-end testing on iOS and Android.',
    tags: ['detox', 'react-native', 'ios', 'android'],
    image: 'https://cdn.simpleicons.org/reactnative',
    docs: [
      { label: 'Detox Getting Started', url: 'https://wix.github.io/Detox/docs/introduction/getting-started' },
      { label: 'Detox Configuration', url: 'https://wix.github.io/Detox/docs/config/overview' },
      { label: 'Detox GitHub', url: 'https://github.com/wix/Detox' },
    ],
    content: `**Detox** is a grey-box end-to-end testing framework for React Native. Unlike black-box approaches, Detox synchronises with the React Native runtime — waiting for animations, network calls, and JS timers to settle before acting. This eliminates the #1 source of mobile test flakiness: arbitrary \`sleep()\` calls.

## Setup

Install Detox as a dev dependency and configure \`detox.config.js\`:

- Specify device type (simulator or emulator)
- Set the app binary path
- Choose the test runner (Jest is standard)

Build commands:
- **iOS** — \`xcodebuild\` in Debug configuration
- **Android** — \`gradlew assembleDebug\`

## Writing tests

\`\`\`ts
await element(by.id('login-button')).tap()
\`\`\`

The \`by.id()\` matcher maps to \`testID\` props in your React Native components. **Add these from day one** — they are the most stable locator strategy available. Avoid \`by.text()\` for interactive elements since visible labels change with localisation.

## State management between tests

- Use \`device.reloadReactNative()\` to reset JS state cheaply without a full restart
- For a clean database state, expose a test-only endpoint or use Detox \`launchArgs\` to pass flags that enable mock data

## CI setup

- Cache the simulator boot to save minutes per run
- Use \`--maxWorkers\` to run tests in parallel across multiple simulators — Detox handles device allocation automatically`,
  },
  {
    slug: 'maestro-flows',
    title: 'Writing Test Flows with Maestro',
    category: 'mobile',
    description: 'Use Maestro YAML flows for fast, readable mobile UI tests.',
    tags: ['maestro', 'mobile', 'yaml', 'ios', 'android'],
    image: 'https://cdn.simpleicons.org/android',
    docs: [
      { label: 'Maestro Docs', url: 'https://maestro.mobile.dev/getting-started/installing-maestro' },
      { label: 'Flow Commands Reference', url: 'https://maestro.mobile.dev/api-reference/commands' },
      { label: 'Maestro GitHub', url: 'https://github.com/mobile-dev-inc/maestro' },
    ],
    content: `**Maestro** is a mobile UI testing framework that uses simple YAML files to describe user flows. No compilation step — run \`maestro test flow.yaml\` and see results in seconds.

## Basic flow

\`\`\`yaml
appId: com.example.app
---
- launchApp
- tapOn: "Sign In"
- inputText: "user@example.com"
- tapOn: "Continue"
- assertVisible: "Welcome"
\`\`\`

Maestro automatically waits for elements to appear before interacting, so explicit waits are rarely needed.

## Maestro Studio

Run \`maestro studio\` to open an interactive browser UI that mirrors your device screen. Tap elements to generate YAML steps — the fastest way to bootstrap a new flow.

## Reusable subflows

\`\`\`yaml
- runFlow: ../shared/login.yaml
- tapOn: "Dashboard"
\`\`\`

Create a \`login.yaml\` subflow and reference it from every test that requires an authenticated state. This keeps individual flows short and focused on the feature under test.

## CI integration

\`\`\`bash
maestro test --format junit flows/
\`\`\`

Outputs JUnit XML that your CI pipeline can parse. For parallel execution, run multiple flows simultaneously across different connected devices.`,
  },
  {
    slug: 'mobile-testing-strategies',
    title: 'Mobile Testing Strategies',
    category: 'mobile',
    description: 'Practical strategies for effective mobile test coverage.',
    tags: ['mobile', 'strategy', 'coverage', 'testing'],
    image: 'https://cdn.simpleicons.org/android',
    docs: [
      { label: 'Firebase Test Lab', url: 'https://firebase.google.com/docs/test-lab' },
      { label: 'BrowserStack App Automate', url: 'https://www.browserstack.com/docs/app-automate/appium/getting-started' },
      { label: 'Appium Docs', url: 'https://appium.io/docs/en/latest/' },
    ],
    content: `Mobile testing is harder than web testing due to device fragmentation, OS version differences, network variability, hardware permissions, and the difficulty of resetting app state.

## Apply the testing pyramid

- **Unit tests** — business logic in pure JS/Kotlin/Swift (fast, many)
- **Integration tests** — component interactions (moderate)
- **E2E tests** — only critical happy paths (slow, few)

Full E2E tests on simulators can take 2–5 minutes per test on a cold boot. Reserve them for journeys that cannot be verified any other way.

## Real devices vs simulators

| | Simulators | Real Devices |
|---|---|---|
| Speed | Fast | Slow |
| GPU rendering | ❌ | ✅ |
| Touch latency | ❌ | ✅ |
| Camera/GPS/Biometrics | Limited | ✅ |

Use **Firebase Test Lab** or **BrowserStack App Automate** for broad device coverage without a physical lab.

## Handle permissions explicitly

\`\`\`ts
// Detox
await device.launchApp({
  permissions: { camera: 'YES', location: 'inuse' }
})
\`\`\`

Never rely on OS defaults — they vary by version and simulator state.

## Test data and state reset

Options between tests:
1. **Clear app data** — slow but thorough
2. **Debug reset screen** — expose a dev-only reset button
3. **Deep link seeding** — inject state via a test scheme URL`,
  },

  // ─── API / Backend ────────────────────────────────────────────────────────
  {
    slug: 'rest-api-testing',
    title: 'REST API Testing Fundamentals',
    category: 'api',
    description: 'Core principles and techniques for testing REST APIs effectively.',
    tags: ['rest', 'api', 'http', 'testing'],
    image: 'https://cdn.simpleicons.org/postman',
    docs: [
      { label: 'Postman Learning Center', url: 'https://learning.postman.com/docs/getting-started/overview/' },
      { label: 'Supertest (Node.js)', url: 'https://github.com/ladjs/supertest' },
      { label: 'REST API Testing Guide', url: 'https://www.postman.com/api-platform/api-testing/' },
    ],
    content: `REST API testing validates that your service behaves correctly across all HTTP verbs, status codes, and payload shapes — without a browser or UI. It is faster, more stable, and more precise than E2E tests.

## Status code coverage matrix

Every endpoint should be tested for:

| Code | Meaning |
|---|---|
| \`200\` | Success |
| \`201\` | Created |
| \`204\` | No content |
| \`400\` | Bad request / validation errors |
| \`401\` | Unauthenticated |
| \`403\` | Forbidden |
| \`404\` | Not found |
| \`409\` | Conflict |
| \`422\` | Unprocessable entity |
| \`500\` | Server error |

## Example with Supertest

\`\`\`ts
const res = await request(app)
  .post('/api/users')
  .send({ email: 'user@example.com' })
  .expect(201)

expect(res.body).toMatchObject({ id: expect.any(String) })
\`\`\`

## Schema validation

Use **Zod** or **Ajv** to assert that responses conform to the documented contract — not just a single field.

## Auth coverage checklist

- ✅ Valid token → access granted
- ✅ No token → \`401\`
- ✅ Expired token → \`401\`
- ✅ Valid token, wrong role → \`403\`

## Test data setup

Use \`beforeAll\`/\`afterAll\` hooks to create and tear down test data programmatically. Never depend on pre-existing database state.`,
  },
  {
    slug: 'graphql-testing',
    title: 'Testing GraphQL APIs',
    category: 'api',
    description: 'Strategies and tools for testing GraphQL queries, mutations, and subscriptions.',
    tags: ['graphql', 'api', 'testing', 'schema'],
    image: 'https://cdn.simpleicons.org/graphql',
    docs: [
      { label: 'GraphQL Inspector', url: 'https://the-guild.dev/graphql/inspector' },
      { label: 'Mock Service Worker (MSW)', url: 'https://mswjs.io/docs/' },
      { label: 'GraphQL spec', url: 'https://spec.graphql.org/' },
    ],
    content: `GraphQL testing differs from REST because **the schema is the contract**. Start by validating the schema itself, then test queries, mutations, and subscriptions.

## Schema diff in CI

Use **graphql-inspector** to detect breaking changes between schema versions:

- Removed fields
- Changed types
- Changed nullability

Integrate as a schema diff step on every pull request.

## Testing queries

\`\`\`ts
const { data, errors } = await client.query({
  query: GET_USER,
  variables: { id: '123' },
})

expect(errors).toBeUndefined()
expect(data.user.email).toBe('user@example.com')
\`\`\`

> ⚠️ A GraphQL endpoint always returns \`200\` even for errors. Always check \`response.errors\` — a test that only asserts status 200 gives false confidence.

## Testing mutations

Verify **both** the mutation response **and** the resulting state:

1. Run \`createUser\` mutation → assert returned user fields
2. Run \`getUser\` query → confirm the record was actually persisted

This catches mutations that return a fabricated response without writing to the database.

## Frontend integration tests with MSW

\`\`\`ts
server.use(
  graphql.query('GetUser', (req, res, ctx) =>
    res(ctx.data({ user: { id: '1', email: 'user@example.com' } }))
  )
)
\`\`\`

## Subscriptions

Test the full WebSocket lifecycle: connection → message delivery → graceful closure. Use a test client in test mode and verify events are delivered when underlying data changes.`,
  },
  {
    slug: 'api-authentication-testing',
    title: 'API Authentication and Authorization Testing',
    category: 'api',
    description: 'How to thoroughly test auth flows, tokens, and access control in APIs.',
    tags: ['auth', 'jwt', 'oauth', 'security', 'api'],
    image: 'https://cdn.simpleicons.org/jsonwebtokens',
    docs: [
      { label: 'JWT.io Debugger', url: 'https://jwt.io/' },
      { label: 'OAuth 2.0 Spec', url: 'https://oauth.net/2/' },
      { label: 'OWASP Auth Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/' },
    ],
    content: `**Authentication** = who are you? **Authorization** = what are you allowed to do? Both are critical and frequently undertested.

## JWT token lifecycle tests

Test every case:

| Scenario | Expected result |
|---|---|
| Valid token | \`200\` + data |
| No token | \`401\` |
| Expired token | \`401\` |
| Tampered signature | \`401\` |
| Wrong audience claim | \`401\` |

## Privilege escalation

**Vertical** — can a regular user call admin endpoints?
\`\`\`
GET /admin/users  →  403 (with user token)
\`\`\`

**Horizontal** — can user A access user B's resources?
\`\`\`
GET /orders/USER_B_ORDER_ID  →  403 (with user A's token)
\`\`\`

## OAuth2 flows

Skip the browser-based consent screen in tests by using a service account or calling the token endpoint directly with client credentials:

\`\`\`
POST /oauth/token
  grant_type=client_credentials
  client_id=...
  client_secret=...
\`\`\`

Verify: access token works, refresh tokens produce new access tokens, revoked tokens are rejected.

## Brute-force protection

Send N consecutive failed login attempts and assert:
- Account is locked or IP is throttled
- Lockout cannot be bypassed by rotating endpoints or changing \`User-Agent\``,
  },

  // ─── Performance ──────────────────────────────────────────────────────────
  {
    slug: 'k6-load-testing',
    title: 'Load Testing with k6',
    category: 'performance',
    description: 'Write and run load tests using k6 with realistic traffic scenarios.',
    tags: ['k6', 'load-testing', 'performance', 'javascript'],
    image: 'https://cdn.simpleicons.org/k6',
    docs: [
      { label: 'k6 Documentation', url: 'https://k6.io/docs/' },
      { label: 'Running k6', url: 'https://k6.io/docs/get-started/running-k6/' },
      { label: 'k6 Thresholds', url: 'https://k6.io/docs/using-k6/thresholds/' },
    ],
    content: `**k6** is a developer-focused load testing tool that lets you write test scripts in JavaScript. Scripts version-control well and integrate naturally with CI pipelines.

## Basic script

\`\`\`js
import http from 'k6/http'
import { check } from 'k6'

export default function () {
  const res = http.get('https://api.example.com/products')
  check(res, { 'status is 200': r => r.status === 200 })
}
\`\`\`

## Load scenarios (ramp-up pattern)

\`\`\`js
export const options = {
  stages: [
    { duration: '1m', target: 50 },   // ramp up to 50 VUs
    { duration: '5m', target: 50 },   // hold
    { duration: '1m', target: 0 },    // ramp down
  ],
}
\`\`\`

## Thresholds (fail the build on regression)

\`\`\`js
export const options = {
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95th percentile < 500ms
    http_req_failed:   ['rate<0.01'],  // error rate < 1%
  },
}
\`\`\`

> 💡 Track **p95** and **p99** latencies, not just averages — averages hide tail latency problems.

## Extensions (xk6)

| Extension | Use case |
|---|---|
| \`xk6-browser\` | Browser-level performance metrics |
| \`xk6-websocket\` | WebSocket load testing |
| \`xk6-kafka\` | Event-driven system testing |

Output results to **InfluxDB + Grafana** or **k6 Cloud** for trend analysis across runs.`,
  },
  {
    slug: 'lighthouse-performance-audits',
    title: 'Web Performance Audits with Lighthouse',
    category: 'performance',
    description: 'Automate Lighthouse audits in CI to catch performance regressions.',
    tags: ['lighthouse', 'performance', 'core-web-vitals', 'ci'],
    image: 'https://cdn.simpleicons.org/googlechrome',
    docs: [
      { label: 'Lighthouse CI', url: 'https://github.com/GoogleChrome/lighthouse-ci' },
      { label: 'Core Web Vitals', url: 'https://web.dev/explore/learn-core-web-vitals' },
      { label: 'Lighthouse Scoring', url: 'https://developer.chrome.com/docs/lighthouse/performance/performance-scoring' },
    ],
    content: `**Lighthouse** audits web pages for performance, accessibility, SEO, and best practices. Automate it in CI to catch regressions before production.

## Lighthouse CI setup

\`\`\`js
// lighthouserc.js
module.exports = {
  ci: {
    collect: { url: ['http://localhost:3000'] },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['warn',  { minScore: 0.9 }],
      },
    },
  },
}
\`\`\`

Fails the build if the performance score drops below **90**.

## Core Web Vitals targets

| Metric | Good | Needs work |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | > 4s |
| **CLS** (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| **INP** (Interaction to Next Paint) | < 200ms | > 500ms |

## Lab vs field data

- **Lab** (Lighthouse) — controlled environment with CPU throttling; good for regression detection
- **Field** (CrUX / RUM) — real users on real devices; ground truth for UX

## Common LCP fixes

- Add \`fetchpriority="high"\` to the hero image
- Use **WebP** format with explicit \`width\` and \`height\`
- Eliminate render-blocking resources

## Common CLS fixes

- Set explicit dimensions on all images and ads
- Use \`font-display: optional\` or \`swap\` to avoid layout shifts from web fonts`,
  },

  // ─── CI/CD & Infrastructure ───────────────────────────────────────────────
  {
    slug: 'github-actions-testing',
    title: 'Running Tests in GitHub Actions',
    category: 'cicd',
    description: 'Set up efficient CI pipelines for automated testing with GitHub Actions.',
    tags: ['github-actions', 'ci', 'yml', 'pipeline'],
    image: 'https://cdn.simpleicons.org/githubactions',
    docs: [
      { label: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions' },
      { label: 'Playwright in CI', url: 'https://playwright.dev/docs/ci-intro' },
      { label: 'Actions Marketplace', url: 'https://github.com/marketplace?type=actions' },
    ],
    content: `GitHub Actions is the standard CI platform for GitHub projects. Running tests on every pull request is the foundation of a healthy quality process.

## Basic workflow skeleton

\`\`\`yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - uses: actions/cache@v4
        with:
          path: ~/.npm
          key: \${{ runner.os }}-npm-\${{ hashFiles('package-lock.json') }}
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
\`\`\`

## Caching Playwright browsers

\`\`\`yaml
- uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: playwright-\${{ hashFiles('package-lock.json') }}
\`\`\`

Saves 1–3 minutes per run.

## Split jobs by type

\`\`\`yaml
jobs:
  unit:   { runs-on: ubuntu-latest, steps: [...] }
  api:    { needs: unit, services: { postgres: ... } }
  e2e:    { needs: unit, steps: [...] }
\`\`\`

## Browser matrix

\`\`\`yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
steps:
  - run: npx playwright test --project=\${{ matrix.browser }}
\`\`\`

Use **GitHub Secrets** for API keys and tokens — never hardcode them in workflow files.`,
  },
  {
    slug: 'docker-test-environments',
    title: 'Docker for Test Environments',
    category: 'cicd',
    description: 'Use Docker and Docker Compose to create reproducible test environments.',
    tags: ['docker', 'docker-compose', 'containers', 'ci'],
    image: 'https://cdn.simpleicons.org/docker',
    docs: [
      { label: 'Docker Compose Docs', url: 'https://docs.docker.com/compose/' },
      { label: 'Playwright Docker Image', url: 'https://playwright.dev/docs/docker' },
      { label: 'Docker Hub', url: 'https://hub.docker.com/' },
    ],
    content: `Docker solves the "works on my machine" problem by ensuring every developer and every CI run executes tests in an **identical, reproducible environment**.

## docker-compose.test.yml

\`\`\`yaml
services:
  app:
    build: .
    depends_on:
      postgres: { condition: service_healthy }

  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: test
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "postgres"]
      interval: 5s
      retries: 5
\`\`\`

The \`healthcheck\` ensures dependent services wait for dependencies to be ready.

## Playwright E2E in Docker

Use the official image — all browser dependencies are pre-installed:

\`\`\`dockerfile
FROM mcr.microsoft.com/playwright:v1.50.0-jammy
WORKDIR /app
COPY . .
RUN npm ci
CMD ["npx", "playwright", "test"]
\`\`\`

## Multi-stage Dockerfile

\`\`\`dockerfile
# Stage 1: test
FROM node:20 AS test
RUN npm ci && npm test

# Stage 2: build
FROM node:20 AS build
RUN npm run build

# Stage 3: production
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
\`\`\`

Prevents test tooling from leaking into the production image.

## GitHub Actions service containers

\`\`\`yaml
services:
  postgres:
    image: postgres:16
    env: { POSTGRES_PASSWORD: test }
    ports: ['5432:5432']
\`\`\`

GitHub manages the container lifecycle automatically — accessible at \`localhost:5432\`.`,
  },
  {
    slug: 'parallel-test-execution',
    title: 'Parallel Test Execution Strategies',
    category: 'cicd',
    description: 'Speed up test suites by running tests in parallel effectively.',
    tags: ['parallelism', 'sharding', 'ci', 'speed'],
    image: 'https://cdn.simpleicons.org/playwright',
    docs: [
      { label: 'Playwright Sharding', url: 'https://playwright.dev/docs/test-sharding' },
      { label: 'GitHub Actions Matrix', url: 'https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs' },
      { label: 'Playwright Parallelism', url: 'https://playwright.dev/docs/test-parallel' },
    ],
    content: `Parallel test execution is the highest-leverage optimisation for slow test suites. A **30-minute** sequential run can become a **5-minute** parallel run with 6 workers — no code changes, just infrastructure.

## Playwright sharding

\`\`\`bash
# Run shard 1 of 4
npx playwright test --shard=1/4
\`\`\`

In GitHub Actions, use a matrix:

\`\`\`yaml
strategy:
  matrix:
    shardIndex: [1, 2, 3, 4]
    shardTotal: [4]
steps:
  - run: npx playwright test --shard=\${{ matrix.shardIndex }}/\${{ matrix.shardTotal }}
\`\`\`

Merge reports afterwards:

\`\`\`bash
npx playwright merge-reports ./all-blob-reports --reporter html
\`\`\`

## Prerequisites: test isolation

Tests that share mutable state produce race conditions when run concurrently. Solutions:

1. **Separate schema per worker** — create/drop DB schema per test run
2. **Unique test data** — use \`user+\${Date.now()}@example.com\`
3. **Transactions** — rollback after each test

## Per-machine parallelism

- **Jest** — \`--maxWorkers=N\` or \`--runInBand\` (sequential, for debugging)
- **Vitest** — worker threads by default
- **Playwright** — \`workers\` config option

## Find bottlenecks

Monitor test run time distribution. Look for:
- The longest-running test file — break it up
- \`beforeEach\` setup that could be \`beforeAll\`
- Duplicated tests that could be parameterised`,
  },

  // ─── Test Design ──────────────────────────────────────────────────────────
  {
    slug: 'test-pyramid',
    title: 'The Test Pyramid',
    category: 'test-design',
    description: 'Understanding the test pyramid and applying it to your test strategy.',
    tags: ['strategy', 'pyramid', 'unit-testing', 'integration', 'e2e'],
    image: 'https://cdn.simpleicons.org/pytest',
    docs: [
      { label: 'Martin Fowler – Test Pyramid', url: 'https://martinfowler.com/articles/practical-test-pyramid.html' },
      { label: 'Testing Trophy (Kent C. Dodds)', url: 'https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications' },
      { label: 'Google Testing Blog', url: 'https://testing.googleblog.com/' },
    ],
    content: `The **test pyramid**, introduced by Mike Cohn, is a model for allocating test effort across different levels. Inverting it — relying mostly on E2E tests — leads to slow, brittle, hard-to-maintain suites.

## The three levels

| Level | Speed | Cost | Quantity |
|---|---|---|---|
| **Unit** | Milliseconds | Cheap | Many |
| **Integration** | Seconds | Moderate | Some |
| **E2E** | Minutes | Expensive | Few |

## Unit tests

Cover individual functions and classes in isolation. Write them for:
- Business logic and data transformations
- Validation rules
- Utility functions

A good unit test is **deterministic** — given the same inputs, always produces the same output.

## Integration tests

Verify components working correctly together:
- Service layer connecting to a real database
- API client talking to a real server
- Message consumer processing real events

These catch **contract mismatches** that unit tests with mocks cannot detect.

## E2E tests

Use sparingly for the most critical paths:
- Login / authentication
- Purchase / checkout flow
- Core feature workflows

Every time you add an E2E test, ask: *could a lower-level test give the same confidence at lower cost?*

## The Testing Trophy (modern variant)

Kent C. Dodds elevates **integration tests**:

> Static → Unit → **Integration** (most) → E2E (few)

In frontend and service-oriented systems, integration tests give the best signal-to-cost ratio.`,
  },
  {
    slug: 'test-data-management',
    title: 'Test Data Management',
    category: 'test-design',
    description: 'Strategies for creating, managing, and cleaning up test data reliably.',
    tags: ['test-data', 'fixtures', 'factories', 'database'],
    image: 'https://cdn.simpleicons.org/postgresql',
    docs: [
      { label: 'Fishery (Factory Library)', url: 'https://github.com/thoughtbot/fishery' },
      { label: 'Playwright Fixtures', url: 'https://playwright.dev/docs/test-fixtures' },
      { label: 'Faker.js', url: 'https://fakerjs.dev/guide/' },
    ],
    content: `Test data management is one of the most underrated challenges in automated testing. Poor strategies lead to tests that pass locally but fail in CI, or fail in suites but pass in isolation.

## The golden rule

> **Tests should own their data.** Each test creates what it needs and cleans it up after. Never rely on data that "should be there".

## Factory functions

\`\`\`ts
import { factory } from 'fishery'

const userFactory = factory.define<User>(() => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  role: 'user',
}))

// Override per test
const admin = userFactory.build({ role: 'admin' })
\`\`\`

Factories centralise the knowledge of what a valid entity looks like.

## Database isolation strategies

| Strategy | How | Speed | Parallelism |
|---|---|---|---|
| **Transaction rollback** | Wrap each test in a transaction, rollback after | ✅ Fast | ⚠️ Single worker |
| **Truncation** | Delete all rows before each test | ✅ Fast | ⚠️ Ordering matters |
| **Separate schema** | Each test run uses its own schema | ❌ Slower setup | ✅ Full parallelism |

## Unique identifiers for parallel tests

\`\`\`ts
const email = \`user+\${Date.now()}@example.com\`
\`\`\`

Prevents two workers from colliding on the same test account.

## Anti-patterns to avoid

- ❌ Shared mutable data between tests
- ❌ Relying on seeded data from a previous run
- ❌ Hard-coded IDs that conflict across environments`,
  },
  {
    slug: 'flaky-test-prevention',
    title: 'Preventing and Fixing Flaky Tests',
    category: 'test-design',
    description: 'Identify root causes of test flakiness and apply systematic fixes.',
    tags: ['flaky', 'reliability', 'debugging', 'best-practices'],
    image: 'https://cdn.simpleicons.org/playwright',
    docs: [
      { label: 'Playwright Retries', url: 'https://playwright.dev/docs/test-retries' },
      { label: 'Playwright Auto-waiting', url: 'https://playwright.dev/docs/actionability' },
      { label: 'Pact Contract Testing', url: 'https://docs.pact.io/' },
    ],
    content: `A flaky test produces different results on the same code without any changes. **Flaky tests are worse than no tests** — they erode trust, cause re-runs, and mask real failures in the noise.

## Most common root causes

| Cause | Fix |
|---|---|
| Clicking before element is interactive | Use \`expect(locator).toBeVisible()\` instead of \`sleep()\` |
| Test order dependence | Isolate test data — each test owns its state |
| Asserting during animation | Disable animations in test mode |
| External service flakiness | Mock the external dependency |
| Parallel resource collision | Unique data per worker (email+timestamp, separate schema) |

## Timing: never use sleep()

\`\`\`ts
// ❌ Flaky
await page.click('#submit')
await sleep(2000)
await expect(page.locator('.success')).toBeVisible()

// ✅ Reliable
await page.click('#submit')
await expect(page.locator('.success')).toBeVisible()
// Playwright auto-waits up to the timeout
\`\`\`

## Network flakiness

Use **contract tests** (Pact) to verify that mocks match reality. In E2E tests, use the application's loading states (spinners, skeleton screens) as wait conditions.

## Flake detection process

\`\`\`bash
# Playwright — run each test 5 times
npx playwright test --repeat-each=5
\`\`\`

Run the full suite nightly multiple times. Flag any test that fails even once. When a test is flagged:

1. **Quarantine** — skip in CI with a tracking issue
2. **Isolate** — reproduce in isolation
3. **Fix** — address the root cause
4. **Re-enable** — restore to the suite`,
  },

  // ─── Tools & Misc ─────────────────────────────────────────────────────────
  {
    slug: 'typescript-for-testers',
    title: 'TypeScript for Test Engineers',
    category: 'tools',
    description: 'Key TypeScript concepts that make test code safer and more maintainable.',
    tags: ['typescript', 'types', 'testing', 'developer-tools'],
    image: 'https://cdn.simpleicons.org/typescript',
    docs: [
      { label: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/' },
      { label: 'TS Config Reference', url: 'https://www.typescriptlang.org/tsconfig' },
      { label: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play' },
    ],
    content: `TypeScript adds static type checking to JavaScript — catching bugs at **compile time** that would otherwise surface at runtime.

## Enable strict mode

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

This enables \`strictNullChecks\`, \`noImplicitAny\`, and several other checks. Treat every type error as a finding.

## Model your domain

\`\`\`ts
interface User {
  id: string
  email: string
  role: 'admin' | 'user'
}

// TypeScript catches missing/misspelled fields immediately
const user: User = { id: '1', email: 'a@b.com', role: 'admin' }

// Useful type utilities
type PartialUser = Partial<User>      // for factory defaults
type RequiredUser = Required<User>    // for full assertions
\`\`\`

## Typed HTTP client

\`\`\`ts
async function get<T>(url: string): Promise<T> {
  const res = await fetch(url)
  return res.json() as T
}

const user = await get<User>('/api/me')
// TypeScript knows user.email is a string
\`\`\`

## Literal types for fixture data

\`\`\`ts
const ROLES = ['admin', 'user', 'guest'] as const
type Role = typeof ROLES[number]  // 'admin' | 'user' | 'guest'

const config = {
  timeout: 5000,
  retries: 3,
} satisfies TestConfig
\`\`\`

\`as const\` preserves literal types; \`satisfies\` validates the shape while keeping type inference.`,
  },
  {
    slug: 'git-for-qa',
    title: 'Git Workflows for QA Engineers',
    category: 'tools',
    description: 'Git strategies and commands every QA engineer should know.',
    tags: ['git', 'workflow', 'branching', 'collaboration'],
    image: 'https://cdn.simpleicons.org/git',
    docs: [
      { label: 'Git Documentation', url: 'https://git-scm.com/doc' },
      { label: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2' },
      { label: 'Git Bisect', url: 'https://git-scm.com/docs/git-bisect' },
    ],
    content: `Git proficiency is a core skill for modern QA engineers. Beyond basic commit and push, these tools will save hours.

## Feature branches for test development

\`\`\`bash
git checkout -b test/login-flow
# write tests, push, open PR
git push -u origin test/login-flow
\`\`\`

Never commit directly to \`main\`. Branches give developers visibility into what is being tested and enable code review of test quality.

## git bisect — find the breaking commit

\`\`\`bash
git bisect start
git bisect bad                    # current commit is broken
git bisect good abc123            # last known good commit
# Git checks out the midpoint
# Run your tests, then:
git bisect good   # or git bisect bad
# Repeat until Git finds the introducing commit
git bisect reset
\`\`\`

Finds the culprit in **O(log n)** steps.

## git stash — context switching

\`\`\`bash
git stash push -m "wip: flaky test investigation"
# switch branches, do other work...
git stash pop       # restore your changes
git stash list      # see all saved stashes
\`\`\`

## Interactive rebase — clean up before a PR

\`\`\`bash
git rebase -i HEAD~4
\`\`\`

- **squash** several "WIP" commits into one meaningful commit
- **reword** commit messages
- **reorder** commits for logical flow

> ⚠️ Never rebase commits that have already been pushed to a shared branch.`,
  },
  {
    slug: 'debugging-tools',
    title: 'Debugging Tools and Techniques for QA',
    category: 'tools',
    description: 'Systematic approaches and tools for debugging test failures efficiently.',
    tags: ['debugging', 'devtools', 'playwright', 'troubleshooting'],
    image: 'https://cdn.simpleicons.org/googlechrome',
    docs: [
      { label: 'Playwright Debugger', url: 'https://playwright.dev/docs/debug' },
      { label: 'Playwright Trace Viewer', url: 'https://playwright.dev/docs/trace-viewer' },
      { label: 'Chrome DevTools Docs', url: 'https://developer.chrome.com/docs/devtools/' },
    ],
    content: `Debugging failed tests is a core QA skill. The key is being **systematic** rather than guessing.

## Rule #1: reproduce first

Run the test in isolation (not as part of the full suite) to rule out test order dependence before investigating the test itself.

\`\`\`bash
npx playwright test tests/login.spec.ts --headed
\`\`\`

## Playwright Inspector

\`\`\`bash
npx playwright test --debug
\`\`\`

Opens a step-by-step debugger — shows the browser state at each action, lets you evaluate locators interactively. Far more efficient than adding \`console.log\` statements.

## Pause in-test

\`\`\`ts
await page.pause()  // opens DevTools on the attached browser
\`\`\`

Use the Console to run \`document.querySelector()\` to test your locator manually.

## Trace Viewer (for CI failures)

\`\`\`bash
# Collect traces on CI
npx playwright test --trace on-first-retry

# Open locally
npx playwright show-trace trace.zip
\`\`\`

Captures a full timeline of every action, network request, console log, and DOM snapshot. Replay the test exactly as it ran in CI.

## Structured logging

Add timestamps to major actions instead of ad-hoc \`console.log\`:

\`\`\`ts
console.log(\`[\${new Date().toISOString()}] Clicking submit button\`)
\`\`\`

Tools like **Allure Report** and the **Playwright HTML reporter** aggregate these into a browsable timeline that makes failure analysis much faster.`,
  },

  // ─── Security Testing ─────────────────────────────────────────────────────
  {
    slug: 'owasp-top-10',
    title: 'OWASP Top 10 for QA Engineers',
    category: 'security',
    description: 'Understanding and testing for the most critical web application security risks.',
    tags: ['owasp', 'security', 'vulnerabilities', 'web'],
    image: 'https://cdn.simpleicons.org/owasp',
    docs: [
      { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
      { label: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
      { label: 'OWASP Cheat Sheet Series', url: 'https://cheatsheetseries.owasp.org/' },
    ],
    content: `The **OWASP Top 10** is the definitive list of critical web application security risks. QA engineers don't need to be penetration testers — but including basic checks in regression testing adds significant security value.

## A01: Broken Access Control *(most critical)*

Test by:
- Accessing resources belonging to another user
- Escalating privileges (using a regular user token on admin endpoints)
- Accessing authenticated resources without any token

These are **functional tests** you can add to your existing API test suite.

## A03: Injection

Submit common payloads in every input field:

| Type | Payload |
|---|---|
| SQL injection | \`' OR '1'='1\` |
| XSS | \`<script>alert(1)</script>\` |
| Command injection | \`; ls -la\` |

A properly built application sanitises or escapes these. A vulnerable one reflects them or reveals implementation details in errors.

## A02: Cryptographic Failures

- ✅ All endpoints use HTTPS (HTTP → redirect)
- ✅ Tokens/passwords not exposed in URLs or logs
- ✅ Security headers present: \`Strict-Transport-Security\`, \`Content-Security-Policy\`, \`X-Frame-Options\`

## A07: Identification & Authentication Failures

- Session tokens are invalidated on logout
- Passwords have minimum complexity requirements
- Repeated failed logins trigger lockout or CAPTCHA

These checks can be included in your regular regression suite.`,
  },
  {
    slug: 'auth-testing',
    title: 'Authentication and Authorization Testing',
    category: 'security',
    description: 'Comprehensive testing of auth flows, session management, and access control.',
    tags: ['auth', 'authorization', 'session', 'security', 'rbac'],
    image: 'https://cdn.simpleicons.org/jsonwebtokens',
    docs: [
      { label: 'OWASP Auth Testing', url: 'https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/' },
      { label: 'OpenID Connect Spec', url: 'https://openid.net/connect/' },
      { label: 'OAuth 2.0 Security BCP', url: 'https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics' },
    ],
    content: `**Authentication** (who are you?) and **authorization** (what are you allowed to do?) are the two security pillars of any multi-user app. Vulnerabilities here expose all user data.

## Permission matrix

Map all roles and resources before writing tests:

| Role | GET /users | DELETE /users/:id | POST /admin |
|---|---|---|---|
| Guest | ❌ | ❌ | ❌ |
| User | ✅ (own) | ❌ | ❌ |
| Admin | ✅ (all) | ✅ | ✅ |

Every cell is a test case.

## Session management checklist

- After logout → old session token returns \`401\`
- After password change → all other active sessions invalidated
- Session tokens have reasonable expiry time
- Application enforces the expiry

## IDOR (Insecure Direct Object Reference)

\`\`\`
GET /orders/12345   ← user A's token
→ Should return 403 if 12345 belongs to user B
\`\`\`

Create two test users, create resources under each, then verify cross-access is blocked. IDOR is extremely common and easy to test automatically.

## OAuth2 / OIDC edge cases

| Check | Why |
|---|---|
| \`state\` parameter mismatch rejected | Prevents CSRF |
| Auth code usable only once | Prevents replay attacks |
| \`redirect_uri\` strictly validated | Prevents open redirect |

Coordinate with developers to expose these flows in a test environment.`,
  },
  {
    slug: 'zap-security-scanning',
    title: 'Automated Security Scanning with OWASP ZAP',
    category: 'security',
    description: 'Use OWASP ZAP to add automated security scanning to your CI pipeline.',
    tags: ['zap', 'owasp', 'security', 'scanning', 'ci', 'automation'],
    image: 'https://cdn.simpleicons.org/owasp',
    docs: [
      { label: 'OWASP ZAP Docs', url: 'https://www.zaproxy.org/docs/' },
      { label: 'ZAP Docker Images', url: 'https://www.zaproxy.org/docs/docker/about/' },
      { label: 'ZAP GitHub', url: 'https://github.com/zaproxy/zaproxy' },
    ],
    content: `**OWASP ZAP** (Zed Attack Proxy) is a free, open-source security scanner. Run it in CI on every deployment to catch common vulnerabilities before production.

## Two scanning modes

| Mode | Description | Safe for CI? |
|---|---|---|
| **Baseline scan** | Passive, read-only spider crawl | ✅ Yes |
| **Full active scan** | Sends attack payloads | ⚠️ Use carefully |

Start with the **baseline scan** — it flags obvious issues (missing headers, exposed stack traces, information disclosure) without any risk to data.

## Baseline scan via Docker

\`\`\`bash
docker run -t owasp/zap2docker-stable \
  zap-baseline.py -t http://your-app -r report.html
\`\`\`

## Configure rules

\`\`\`tsv
# .zap/rules.tsv
10016\tIGNORE\t(Web Browser XSS Protection Not Enabled)
\`\`\`

Focus on **High** and **Medium** risk alerts in CI. Mark false positives as informational.

## Combine with Playwright tests

Run your Playwright tests **through ZAP as a proxy**:

\`\`\`ts
// playwright.config.ts
use: {
  proxy: { server: 'http://localhost:8080' }
}
\`\`\`

ZAP scans all URLs visited during the test — far more effective than its own spider for SPAs where content is dynamically loaded.

## API scanning

\`\`\`bash
docker run -t owasp/zap2docker-stable \
  zap-api-scan.py -t openapi.yaml -f openapi
\`\`\`

Point it at your OpenAPI/Swagger definition to generate and send test requests for every endpoint.`,
  },
]
