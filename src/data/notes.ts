export type Note = {
  slug: string
  title: string
  category: string
  description: string
  content: string
  tags: string[]
}

export const notes: Note[] = [
  // ─── Web Automation ───────────────────────────────────────────────────────
  {
    slug: 'playwright-selectors',
    title: 'Playwright Selectors Best Practices',
    category: 'web',
    description: 'How to write resilient, maintainable locators in Playwright.',
    tags: ['playwright', 'locators', 'selectors'],
    content: `Resilient selectors are the single biggest factor in stable end-to-end tests. Playwright offers several locator strategies, and the recommended approach is to prefer user-visible attributes over implementation details. Use getByRole, getByLabel, getByPlaceholder, and getByText whenever possible — these mirror how real users interact with the UI and survive visual redesigns.

Avoid CSS class selectors and XPaths that encode DOM structure. A selector like .btn-primary or //div[3]/span[1] will break the moment a developer refactors markup. If no semantic attribute is available, add a data-testid attribute explicitly — this is a contract between the dev team and QA, and it makes intent clear.

Chaining locators is powerful and readable. Instead of a long CSS path, write page.getByRole('dialog').getByRole('button', { name: 'Confirm' }). This scopes the search to the dialog, avoids ambiguity, and reads like a sentence.

Use locator.filter() when you need to narrow down a list of matching elements based on visible text or child elements. For example: page.getByRole('listitem').filter({ hasText: 'Invoice #1042' }). Combine this with .first(), .last(), or .nth() only when the ordering is semantically meaningful and stable.

Always prefer strict mode: Playwright throws if a locator matches multiple elements by default in action calls, which surfaces ambiguous selectors early. Run playwright codegen to generate initial locators quickly, then review and harden them before committing.`,
  },
  {
    slug: 'playwright-page-objects',
    title: 'Page Object Model in Playwright',
    category: 'web',
    description: 'Structuring Playwright tests with the Page Object Model pattern.',
    tags: ['playwright', 'pom', 'architecture'],
    content: `The Page Object Model (POM) encapsulates the UI structure of a page behind a class, so tests interact with a readable API rather than raw selectors. In Playwright, a page object receives the Page fixture in its constructor and exposes methods that represent user actions: login(), submitForm(), assertSuccessBanner().

A minimal page object looks like this: export class LoginPage { constructor(private page: Page) {} async login(email: string, password: string) { await this.page.getByLabel('Email').fill(email); await this.page.getByLabel('Password').fill(password); await this.page.getByRole('button', { name: 'Sign in' }).click(); } }. The test then reads: await loginPage.login('user@example.com', 'secret').

Keep page objects thin. They should not contain assertions — move those into the test or into a dedicated assertion helper. A page object that also checks text content mixes responsibilities and becomes hard to reuse across different test scenarios.

Compose page objects for complex flows. A CheckoutFlow class might internally use CartPage, ShippingPage, and PaymentPage objects. This mirrors the real user journey and makes the test narrative clear: await checkout.addItem('Widget').proceedToShipping().fillAddress(addr).pay(card).assertOrderConfirmed().

Use Playwright fixtures to inject page objects. Create a custom fixture that instantiates your page objects and passes them to every test automatically, eliminating repetitive setup code and making the test file itself a clean specification of behavior.`,
  },
  {
    slug: 'playwright-network-interception',
    title: 'Network Interception and Mocking in Playwright',
    category: 'web',
    description: 'Intercept, mock, and stub network requests to isolate UI tests.',
    tags: ['playwright', 'network', 'mocking', 'api'],
    content: `Playwright's page.route() API lets you intercept any network request and respond with a fixture, modify it in flight, or abort it entirely. This is invaluable when you want to test UI behaviour under specific API conditions — slow responses, error states, or data that is hard to produce in a real backend.

To mock an endpoint: await page.route('**/api/users', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(users) })). The test now runs deterministically regardless of backend state. Keep fixture files in a __fixtures__ directory and load them with fs.readFileSync so they can be shared across tests.

For testing error handling, abort or return 500: await page.route('**/api/checkout', route => route.fulfill({ status: 500, body: 'Internal Server Error' })). Verify that the UI shows a meaningful error message rather than crashing silently.

Network interception is also useful for performance testing in CI: intercept third-party analytics, chat widgets, and CDN assets that are irrelevant to your feature under test. This speeds up test runs and removes flakiness caused by external services being slow or unavailable.

Use page.routeFromHAR() to replay a recorded HAR file. Record a real session once with browser DevTools, then use it as a stable mock layer. This captures realistic response shapes and headers without maintaining individual JSON fixtures for every endpoint.`,
  },

  // ─── Mobile Automation ────────────────────────────────────────────────────
  {
    slug: 'detox-getting-started',
    title: 'Getting Started with Detox',
    category: 'mobile',
    description: 'Set up Detox for React Native end-to-end testing on iOS and Android.',
    tags: ['detox', 'react-native', 'ios', 'android'],
    content: `Detox is a grey-box end-to-end testing framework for React Native. Unlike black-box approaches that treat the app as a binary, Detox synchronises with the React Native runtime, waiting for animations, network calls, and JS timers to settle before acting. This eliminates the most common source of mobile test flakiness: arbitrary sleep() calls.

Install Detox as a dev dependency and add a detox configuration to package.json or detox.config.js. You need to specify a device type (simulator or emulator), the app binary path, and the test runner (Jest is standard). For iOS you will build the app in Debug configuration using xcodebuild; for Android you use gradlew assembleDebug.

Write your first test using Detox's element API: await element(by.id('login-button')).tap(). The by.id() matcher corresponds to testID props in your React Native components — add these from day one, they are the most stable locator strategy available. Avoid by.text() for interactive elements since visible labels change with localisation.

Detox tests run on real simulators/emulators, not in a browser. This means you must manage app state explicitly: use device.reloadReactNative() between tests to reset JS state cheaply without a full app restart. For a clean database state, expose a test-only endpoint or use the Detox launchArgs to pass flags that enable mock data.

Set up Detox in CI using GitHub Actions or Bitrise. Cache the simulator boot to save minutes on each run. Run tests in parallel across multiple simulators using the --maxWorkers flag — Detox handles device allocation automatically.`,
  },
  {
    slug: 'maestro-flows',
    title: 'Writing Test Flows with Maestro',
    category: 'mobile',
    description: 'Use Maestro YAML flows for fast, readable mobile UI tests.',
    tags: ['maestro', 'mobile', 'yaml', 'ios', 'android'],
    content: `Maestro is a mobile UI testing framework that uses simple YAML files to describe user flows. Unlike code-based frameworks, Maestro flows are readable by anyone on the team and require no compilation step — you run maestro test flow.yaml and see results in seconds. This makes it an excellent tool for fast feedback during development.

A basic flow looks like: appId: com.example.app, then a sequence of commands: - launchApp, - tapOn: "Sign In", - inputText: "user@example.com". Maestro automatically waits for elements to appear before interacting, so you rarely need explicit waits.

Use maestro studio (maestro studio) for interactive flow recording. It opens a browser UI that mirrors your device screen and lets you tap elements to generate YAML steps. This is the fastest way to bootstrap a new flow — record it, then clean up the generated YAML and extract reusable subflows.

Subflows (runFlow) let you compose tests from reusable building blocks. Create a login.yaml subflow and reference it from every test that requires an authenticated state: - runFlow: ../shared/login.yaml. This keeps individual test flows short and focused on the feature being tested.

Maestro integrates with CI through the Maestro Cloud service or by running the CLI directly on a connected device or emulator. Use maestro test --format junit to output JUnit XML reports that your CI pipeline can parse. For parallel execution, run multiple flows simultaneously across different connected devices.`,
  },
  {
    slug: 'mobile-testing-strategies',
    title: 'Mobile Testing Strategies',
    category: 'mobile',
    description: 'Practical strategies for effective mobile test coverage.',
    tags: ['mobile', 'strategy', 'coverage', 'testing'],
    content: `Mobile testing is harder than web testing for several reasons: device fragmentation, OS version differences, network variability, hardware permissions, and the difficulty of resetting app state. A good mobile test strategy accounts for all of these rather than assuming a single device and happy path.

Apply the testing pyramid to mobile: most coverage should come from unit tests and integration tests of business logic (pure JS/Kotlin/Swift), fewer from component tests, and only the critical happy paths from E2E. Full E2E tests on simulators are slow — 2-5 minutes per test on a cold boot — so reserve them for user journeys that cannot be verified any other way.

Test on real devices for release validation. Simulators miss GPU rendering issues, actual touch latency, memory pressure under real conditions, and edge cases in camera/GPS/biometric APIs. Use a device farm (BrowserStack App Automate, Firebase Test Lab) for broad device coverage without maintaining a physical lab.

Handle permissions (camera, location, notifications) explicitly. In Detox, set permissions via the launch configuration: { permissions: { camera: 'YES', location: 'inuse' } }. In Maestro, use setPermissions. Never rely on the OS default — it varies by version and simulator state.

Invest in test data management. Mobile apps often cache data locally (AsyncStorage, SQLite, Keychain). Between tests you need a reliable reset mechanism. Options include: clearing app data before each test (slow), exposing a debug reset screen, or seeding state through a deep link. Choose based on how much isolation your test suite actually needs.`,
  },

  // ─── API / Backend ────────────────────────────────────────────────────────
  {
    slug: 'rest-api-testing',
    title: 'REST API Testing Fundamentals',
    category: 'api',
    description: 'Core principles and techniques for testing REST APIs effectively.',
    tags: ['rest', 'api', 'http', 'testing'],
    content: `REST API testing validates that your service behaves correctly across all HTTP verbs, status codes, and payload shapes — without involving a browser or UI. It is faster, more stable, and more precise than end-to-end UI tests, which makes it ideal for catching contract breakages and regression early.

Cover the full status code matrix for each endpoint: 200 success, 201 created, 204 no content, 400 bad request with validation errors, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 422 unprocessable entity, and 500 server error. Each code path represents a decision in your application logic and deserves a test.

Use a library like supertest (Node.js) or requests (Python) to make HTTP calls in your tests. Prefer asserting on the full response body shape rather than just a single field — this catches unexpected changes in payload structure. Use JSON Schema validation (Ajv, zod) to assert that responses conform to the documented contract.

Test authentication and authorisation explicitly. Verify that unauthenticated requests return 401, that a user with a valid token but insufficient role gets 403, and that token expiry is handled gracefully. These checks are easy to skip but represent critical security coverage.

Group tests by resource and use beforeAll/afterAll hooks to set up and tear down test data. Avoid depending on existing database state — create your test data programmatically in the test setup. This makes tests portable across environments (local, staging, CI) and prevents order-dependent failures.`,
  },
  {
    slug: 'graphql-testing',
    title: 'Testing GraphQL APIs',
    category: 'api',
    description: 'Strategies and tools for testing GraphQL queries, mutations, and subscriptions.',
    tags: ['graphql', 'api', 'testing', 'schema'],
    content: `GraphQL testing differs from REST testing because the schema is the contract. Start by validating that your schema itself is correct: use tools like graphql-inspector to detect breaking changes (removed fields, changed types, changed nullability) between schema versions. Integrate this into CI as a schema diff step on every pull request.

Test queries by sending them to the /graphql endpoint with a specific operation and variables. Assert on the data shape in the response. Unlike REST, a GraphQL endpoint always returns 200 even for errors — check response.errors to detect application-level failures. A test that only asserts status 200 gives false confidence.

Test mutations by verifying both the mutation response and the resulting state. After createUser, assert that the returned user object has the expected fields, then make a getUser query to confirm the record was actually persisted. This two-step verification catches mutations that return a fabricated response without writing to the database.

Use MSW (Mock Service Worker) or a test GraphQL server for frontend integration tests. Define handlers that return fixture data for specific operations. This decouples frontend tests from backend availability and makes them fast and deterministic. Keep handlers in a shared location so they mirror the real schema and get updated when the schema changes.

For subscriptions, test the full WebSocket lifecycle: connection, message delivery, and graceful closure. Use a test client like graphql-ws's createClient in test mode. Verify that subscription events are delivered when the underlying data changes and that the client handles reconnection correctly.`,
  },
  {
    slug: 'api-authentication-testing',
    title: 'API Authentication and Authorization Testing',
    category: 'api',
    description: 'How to thoroughly test auth flows, tokens, and access control in APIs.',
    tags: ['auth', 'jwt', 'oauth', 'security', 'api'],
    content: `Authentication tests verify that the system correctly identifies who you are. Authorization tests verify that it correctly controls what you can do. Both are critical and frequently undertested — most teams check the happy path (valid token → access granted) but skip the negative cases.

For JWT-based auth, test the full token lifecycle: obtain a token via login, use it on a protected endpoint, use an expired token, use a token with a tampered signature, use a token with the wrong audience claim, and use no token at all. Each of these should return a specific, documented error response.

Test vertical privilege escalation: can a regular user call admin endpoints? Send requests with a valid user token to routes that require admin role and assert 403. Test horizontal privilege escalation: can user A access user B's resources? Send a request with user A's token to an endpoint that returns user B's data.

OAuth2 flows require testing the full redirect dance. In automated tests, skip the browser-based consent screen by using a service account or by directly calling the token endpoint with client credentials. Verify that the access token works, that refresh tokens produce new access tokens, and that revoked tokens are rejected promptly.

Rate limiting and brute-force protection should be tested with consecutive failed attempts. Verify that after N failures the account is locked or the IP is throttled. Check that the lockout mechanism itself cannot be bypassed by rotating through multiple endpoints or by changing the User-Agent header.`,
  },

  // ─── Performance ──────────────────────────────────────────────────────────
  {
    slug: 'k6-load-testing',
    title: 'Load Testing with k6',
    category: 'performance',
    description: 'Write and run load tests using k6 with realistic traffic scenarios.',
    tags: ['k6', 'load-testing', 'performance', 'javascript'],
    content: `k6 is a developer-focused load testing tool that lets you write test scripts in JavaScript. Unlike older tools such as JMeter, k6 scripts look like regular code, version-control well, and integrate naturally with CI pipelines. k6 runs test scenarios from a single binary with no JVM or browser overhead.

A basic k6 script exports a default function that describes one virtual user's behaviour. Use the http module to make requests: import http from 'k6/http'; export default function() { http.get('https://api.example.com/products'); }. Add checks to assert response correctness: check(res, { 'status is 200': r => r.status === 200 }).

Define load scenarios using the options export. A typical ramp-up pattern uses stages: [{ duration: '1m', target: 50 }, { duration: '5m', target: 50 }, { duration: '1m', target: 0 }]. This ramps to 50 virtual users, holds for 5 minutes, then ramps back down. Use multiple scenarios in one run (constant-arrival-rate, ramping-arrival-rate) for more realistic traffic modelling.

Set performance thresholds: options.thresholds = { http_req_duration: ['p(95)<500'], http_req_failed: ['rate<0.01'] }. k6 exits with a non-zero code if thresholds are breached, making it easy to fail a CI build when performance degrades. Track the p95 and p99 latencies, not just the average, since averages hide tail latency problems.

Use k6 extensions (xk6) for advanced scenarios: xk6-browser for browser-level performance metrics, xk6-websocket for WebSocket load testing, xk6-kafka for event-driven systems. Output results to InfluxDB + Grafana or k6 Cloud for trend analysis across runs.`,
  },
  {
    slug: 'lighthouse-performance-audits',
    title: 'Web Performance Audits with Lighthouse',
    category: 'performance',
    description: 'Automate Lighthouse audits in CI to catch performance regressions.',
    tags: ['lighthouse', 'performance', 'core-web-vitals', 'ci'],
    content: `Lighthouse is a Google tool that audits web pages for performance, accessibility, SEO, and best practices. Running it manually in DevTools is useful for spot-checking, but the real value comes from automating it in CI and asserting on scores over time to catch regressions before they reach production.

Use the Lighthouse CI (LHCI) tool to run audits as part of your pipeline. Install @lhci/cli and add a lighthouserc.js config: module.exports = { ci: { collect: { url: ['http://localhost:3000'] }, assert: { assertions: { 'categories:performance': ['error', { minScore: 0.9 }] } } } }. This will fail the build if the performance score drops below 90.

Focus on Core Web Vitals: Largest Contentful Paint (LCP < 2.5s), Cumulative Layout Shift (CLS < 0.1), and Interaction to Next Paint (INP < 200ms). These are the metrics Google uses for search ranking and they correlate directly with user experience. Lighthouse measures all three and surfaces the specific resources causing the issues.

Understand the difference between lab and field data. Lighthouse runs in a controlled environment with CPU throttling — scores will differ from real-user measurements in your analytics tool. Use the Chrome User Experience Report (CrUX) or your own RUM data for field validation. Treat Lighthouse as a regression detector and real-user metrics as ground truth.

When diagnosing LCP issues, look for render-blocking resources, unoptimised images (use WebP, set explicit dimensions, add fetchpriority="high" to the hero image), and slow server response times. For CLS, ensure all images and ads have explicit width/height, avoid inserting content above the fold after load, and use font-display: optional or swap to avoid layout shifts from web fonts.`,
  },

  // ─── CI/CD & Infrastructure ───────────────────────────────────────────────
  {
    slug: 'github-actions-testing',
    title: 'Running Tests in GitHub Actions',
    category: 'cicd',
    description: 'Set up efficient CI pipelines for automated testing with GitHub Actions.',
    tags: ['github-actions', 'ci', 'yml', 'pipeline'],
    content: `GitHub Actions is the standard CI platform for projects hosted on GitHub. Configuring your test suite to run on every pull request is the foundation of a healthy quality process — it makes broken code visible before it reaches main and gives reviewers confidence in proposed changes.

A basic test workflow lives in .github/workflows/test.yml. Trigger it on push and pull_request to the main branch. Use the ubuntu-latest runner for most test jobs. Steps typically look like: checkout the code, set up Node.js with a specific version, restore the npm cache, install dependencies, and run your test command.

Cache dependencies aggressively. The actions/cache action with a key based on the hash of package-lock.json restores node_modules between runs, saving 30-90 seconds per job. For Playwright, also cache the browser binaries: npx playwright install --with-deps and cache ~/.cache/ms-playwright.

Split test jobs by type for faster feedback. Run unit tests in one job (fast, no external dependencies), API tests in a second job (needs a service container), and E2E tests in a third job (slowest). Use the needs keyword to sequence jobs or run them in parallel. Upload test reports and screenshots as artifacts with actions/upload-artifact so failures can be diagnosed without re-running.

Use matrix builds to test across multiple Node.js versions or browser configurations: strategy: { matrix: { node: [18, 20], browser: ['chromium', 'firefox'] } }. The env: block lets you pass environment variables securely — use GitHub Secrets for API keys, tokens, and connection strings rather than hardcoding them in workflow files.`,
  },
  {
    slug: 'docker-test-environments',
    title: 'Docker for Test Environments',
    category: 'cicd',
    description: 'Use Docker and Docker Compose to create reproducible test environments.',
    tags: ['docker', 'docker-compose', 'containers', 'ci'],
    content: `Docker solves the "works on my machine" problem for test environments. By containerising your application and its dependencies (database, message queue, cache), you ensure that every developer and every CI run executes tests in an identical, reproducible environment.

Write a docker-compose.test.yml that defines all services needed for integration tests: your app container, a Postgres container, a Redis container, and any mocks (WireMock, LocalStack). Use healthchecks so dependent services wait for dependencies to be ready before starting: healthcheck: { test: ["CMD", "pg_isready", "-U", "postgres"], interval: "5s", retries: 5 }.

For Playwright E2E tests, use the official Playwright Docker image (mcr.microsoft.com/playwright). It includes all browser dependencies pre-installed, which avoids the common CI failure of missing shared libraries. Mount your test source as a volume and run npx playwright test inside the container.

Use multi-stage Dockerfiles to separate the test environment from the production image. Stage 1 installs dev dependencies and runs tests; stage 2 builds the production bundle; stage 3 is the minimal production image. This prevents test tooling from leaking into the production image and keeps image sizes small.

In GitHub Actions, use the services block to spin up containers for your job: services: { postgres: { image: 'postgres:16', env: { POSTGRES_PASSWORD: 'test' }, ports: ['5432:5432'] } }. GitHub manages the container lifecycle automatically. The service is accessible at localhost with the mapped port.`,
  },
  {
    slug: 'parallel-test-execution',
    title: 'Parallel Test Execution Strategies',
    category: 'cicd',
    description: 'Speed up test suites by running tests in parallel effectively.',
    tags: ['parallelism', 'sharding', 'ci', 'speed'],
    content: `Parallel test execution is the highest-leverage optimisation for slow test suites. A 30-minute sequential run can become a 5-minute parallel run with 6 workers — no code changes required, just infrastructure. The key is partitioning tests so work is distributed evenly and tests do not interfere with each other.

Playwright has native sharding support: npx playwright test --shard=1/4 runs the first quarter of tests. In GitHub Actions, create a matrix with shardIndex and shardTotal values and pass them to the test command. Each shard runs as a separate job and they execute in parallel. Merge the resulting reports with playwright merge-reports.

Test isolation is a prerequisite for parallelism. Tests that share mutable state (a single database, a single user account) will produce race conditions when run concurrently. Solutions: use a separate database per worker (create schema per test run, drop after), use unique identifiers in test data (user+timestamp), or use transactions that rollback after each test.

Jest supports --runInBand (sequential) for debugging and --maxWorkers=N for parallel execution within a single machine. Vitest uses worker threads by default. For cross-machine parallelism, use a CI matrix strategy or a distributed test orchestrator like Nx Cloud or Turborepo remote caching.

Monitor your test run time distribution using CI analytics. Look for the longest-running test file and break it up, look for setup/teardown that could be shared via beforeAll instead of beforeEach, and look for tests that could be parameterised instead of duplicated. Even with parallelism, a single slow test file becomes the bottleneck.`,
  },

  // ─── Test Design ──────────────────────────────────────────────────────────
  {
    slug: 'test-pyramid',
    title: 'The Test Pyramid',
    category: 'test-design',
    description: 'Understanding the test pyramid and applying it to your test strategy.',
    tags: ['strategy', 'pyramid', 'unit-testing', 'integration', 'e2e'],
    content: `The test pyramid, introduced by Mike Cohn, is a model for allocating test effort across different test levels. The base is unit tests (many, fast, cheap), the middle is service/integration tests (some, moderate speed, moderate cost), and the apex is UI/E2E tests (few, slow, expensive). Inverting this pyramid — relying mostly on E2E tests — leads to slow, brittle, hard-to-maintain test suites.

Unit tests should cover individual functions and classes in isolation. They run in milliseconds, require no external services, and give precise failure messages. Write them for all business logic, data transformations, validation rules, and utility functions. A good unit test is deterministic: given the same inputs, it always produces the same output.

Integration tests verify that components work correctly together: your service layer connecting to a real database, your API client talking to a real server, your message consumer processing real events. These are slower than unit tests but faster than E2E tests, and they catch contract mismatches that unit tests with mocks cannot detect.

E2E tests verify complete user journeys through the deployed application. Use them sparingly for the most critical paths: login, purchase, core feature workflows. They are the most expensive tests to write, run, and maintain. Every time you add an E2E test, ask whether a lower-level test could give you the same confidence at lower cost.

The "testing trophy" (Kent C. Dodds) is a modern variant that elevates integration tests: many unit tests, even more integration tests, few E2E tests, a handful of static checks. This reflects the reality that in frontend and service-oriented systems, integration tests give the best signal-to-cost ratio.`,
  },
  {
    slug: 'test-data-management',
    title: 'Test Data Management',
    category: 'test-design',
    description: 'Strategies for creating, managing, and cleaning up test data reliably.',
    tags: ['test-data', 'fixtures', 'factories', 'database'],
    content: `Test data management is one of the most underrated challenges in automated testing. Poor strategies lead to tests that pass locally but fail in CI, tests that pass in isolation but fail in suites, and test environments that gradually become unusable as data accumulates.

The golden rule is: tests should own their data. Each test should create the data it needs in a setup step and clean it up in a teardown step. This makes tests independent of each other and of the environment's pre-existing state. Never rely on data that "should be there" — seed it explicitly.

Factory functions (or factory libraries like factory-bot, fishery) generate test objects with sensible defaults that can be overridden per test: const user = factory.create('user', { role: 'admin' }). Factories centralise the knowledge of what a valid entity looks like and prevent tests from becoming cluttered with irrelevant field values.

For database-backed tests, use one of these isolation strategies: (1) transactions — wrap each test in a transaction and rollback after, zero cleanup needed; (2) truncation — delete all rows from affected tables before each test, fast but requires careful ordering for foreign keys; (3) separate schema — each test run uses its own schema, allows parallelism but needs more setup.

Avoid shared mutable data between tests. If two tests read from the same record and one modifies it, the other will see unexpected state depending on execution order. Even if your tests pass today, parallel execution will expose the coupling. Build data independence as a habit from the start.`,
  },
  {
    slug: 'flaky-test-prevention',
    title: 'Preventing and Fixing Flaky Tests',
    category: 'test-design',
    description: 'Identify root causes of test flakiness and apply systematic fixes.',
    tags: ['flaky', 'reliability', 'debugging', 'best-practices'],
    content: `A flaky test is one that produces different results on the same code without any code changes. Flaky tests are worse than no tests — they erode trust in the test suite, cause developers to re-run failures hoping they pass, and mask real failures in the noise. Eliminating flakiness should be a priority, not a backlog item.

The most common causes of flakiness in web E2E tests: (1) timing — clicking an element before it is interactive; fix by using proper wait conditions (waitForSelector, expect(locator).toBeVisible()) rather than sleep(). (2) test order dependence — shared state modified by a previous test; fix by isolating test data. (3) animation — asserting on a value mid-animation; fix by disabling animations in test mode.

For network-related flakiness, identify tests that depend on external services or slow APIs. Mock the external service in unit/integration tests and use contract tests (Pact) to verify the mock matches reality. In E2E tests, use the application's loading states (spinners, skeleton screens) as wait conditions rather than fixed timeouts.

Parallelism flakiness happens when tests share a resource — a port, a user account, a database row — and race conditions emerge. Assign unique resources per test: generate unique email addresses with timestamps, use separate database schemas per worker, and avoid ports by using random available port assignment.

Build a flake detection process: run the full test suite nightly multiple times and flag any test that fails even once. Use pytest-repeat, jest --testRepeats, or Playwright's --repeat-each flag. Keep a flakiness dashboard. When a test is flagged as flaky, quarantine it (skip in CI, fix in isolation) rather than leaving it to pollute results.`,
  },

  // ─── Tools & Misc ─────────────────────────────────────────────────────────
  {
    slug: 'typescript-for-testers',
    title: 'TypeScript for Test Engineers',
    category: 'tools',
    description: 'Key TypeScript concepts that make test code safer and more maintainable.',
    tags: ['typescript', 'types', 'testing', 'developer-tools'],
    content: `TypeScript adds static type checking to JavaScript, catching a class of bugs at compile time that would otherwise surface at runtime. For test engineers, TypeScript is especially valuable because it documents the shape of API responses, component props, and test fixtures, making tests self-documenting and resilient to backend changes.

Start with strict mode enabled in tsconfig.json: "strict": true. This enables strictNullChecks (no accidental undefined access), noImplicitAny (every variable must have a known type), and several other checks. Strict mode catches real bugs — treat every type error as a finding, not a nuisance.

Use interfaces and types to model your domain: interface User { id: string; email: string; role: 'admin' | 'user' }. When you write a test that creates a user object, TypeScript will catch any missing or misspelled fields immediately. Use Partial<User> for factory functions that fill in defaults, and Required<User> for assertions that need every field present.

Generics make utility functions and test helpers reusable without losing type safety. A typed HTTP client: async function get<T>(url: string): Promise<T> { const res = await fetch(url); return res.json() as T; }. Call it as get<User>('/api/me') and the return type is known throughout the test.

Use as const for fixture data to preserve literal types: const ROLES = ['admin', 'user', 'guest'] as const; type Role = typeof ROLES[number]. Use satisfies for objects that should conform to a type while preserving the literal values: const config = { timeout: 5000, retries: 3 } satisfies TestConfig. These patterns give you the best of both type safety and type inference.`,
  },
  {
    slug: 'git-for-qa',
    title: 'Git Workflows for QA Engineers',
    category: 'tools',
    description: 'Git strategies and commands every QA engineer should know.',
    tags: ['git', 'workflow', 'branching', 'collaboration'],
    content: `Git proficiency is a core skill for modern QA engineers. Beyond basic commit and push, understanding branching strategies, bisect, and stash will save hours and enable collaboration with development teams more effectively.

Use feature branches for all test development. The pattern is: git checkout -b test/login-flow, write tests, push to origin, open a pull request. This gives developers visibility into what is being tested, enables code review of test quality, and ensures test code goes through the same merge process as production code. Never commit directly to main.

git bisect is one of the most powerful debugging tools available. When you discover that tests started failing at some point in the past, run git bisect start, mark the current commit as bad (git bisect bad), mark the last known good commit (git bisect good abc123), and Git will binary-search the commit history. After each bisect step, run your tests and mark good or bad. You will find the introducing commit in O(log n) steps.

Use git stash when you need to context-switch mid-task: git stash push -m "wip: flaky test investigation". Your changes are saved, the working tree is clean, you can switch branches, and git stash pop brings your changes back. Use git stash list to see all stashes and git stash drop to clean up.

Learn interactive rebase (git rebase -i) for cleaning up commits before a PR. Squash several "WIP" commits into one meaningful commit, reorder commits for logical flow, and rewrite commit messages. A clean commit history makes code review easier and git blame more informative. Never rebase commits that have already been pushed to a shared branch.`,
  },
  {
    slug: 'debugging-tools',
    title: 'Debugging Tools and Techniques for QA',
    category: 'tools',
    description: 'Systematic approaches and tools for debugging test failures efficiently.',
    tags: ['debugging', 'devtools', 'playwright', 'troubleshooting'],
    content: `Debugging failed tests is a core QA skill. The key is being systematic rather than guessing. Start by reproducing the failure reliably — a failure you can reproduce is a failure you can fix. Run the test in isolation (not as part of the full suite) to rule out test order dependence before investigating the test itself.

Playwright's --debug flag opens Playwright Inspector, a step-by-step debugger that shows you the browser state at each action. Use npx playwright test --debug to pause execution and inspect the DOM, check network requests, and evaluate locators interactively. This is far more efficient than adding console.log statements to test code.

Browser DevTools are essential for understanding why a selector fails or why a network request returns unexpected data. In Playwright, page.pause() pauses execution and opens DevTools on the attached browser. Use the Console to run document.querySelector() to test your locator manually. Use the Network tab to see request/response payloads.

For CI failures that cannot be reproduced locally, use artifacts: screenshots, videos, and trace files. Playwright's built-in trace recording (npx playwright test --trace=on) captures a full timeline of every action, network request, console log, and DOM snapshot. Open the trace with npx playwright show-trace trace.zip to replay the test exactly as it ran in CI.

Add structured logging to your test helpers rather than ad-hoc console.log statements. Log the start and end of major actions with timestamps. When a test fails, the log becomes a timeline of what happened. Tools like Allure Report and Playwright HTML reporter aggregate these into a browsable report that makes failure analysis much faster.`,
  },

  // ─── Security Testing ─────────────────────────────────────────────────────
  {
    slug: 'owasp-top-10',
    title: 'OWASP Top 10 for QA Engineers',
    category: 'security',
    description: 'Understanding and testing for the most critical web application security risks.',
    tags: ['owasp', 'security', 'vulnerabilities', 'web'],
    content: `The OWASP Top 10 is the definitive list of critical web application security risks, updated periodically by security experts. QA engineers do not need to be penetration testers, but understanding these categories and knowing how to include basic checks in regression testing adds significant security value without requiring specialised tooling.

A01: Broken Access Control is the most critical risk. Test it by attempting to access resources belonging to another user, by escalating privileges (using a regular user token on admin endpoints), and by accessing authenticated resources without a token. These are functional tests you can add to your existing API test suite without any security tooling.

A03: Injection (SQL, command, LDAP) occurs when untrusted data is sent to an interpreter. Test by submitting common injection payloads in every input field: ' OR '1'='1 for SQL injection, <script>alert(1)</script> for XSS. A properly built application will sanitise or escape these; a vulnerable one will reflect them or produce an error that reveals implementation details.

A02: Cryptographic Failures means sensitive data is not properly protected in transit or at rest. Verify that all endpoints use HTTPS and that HTTP requests are redirected to HTTPS. Check that tokens and passwords are not exposed in URLs, logs, or error messages. Inspect response headers for security headers: Strict-Transport-Security, Content-Security-Policy, X-Frame-Options.

A07: Identification and Authentication Failures covers weak password policies, missing brute-force protection, and insecure session management. Test that session tokens are invalidated on logout, that passwords have minimum complexity requirements, and that repeated failed logins trigger a lockout or CAPTCHA. These tests can be included in your regular regression suite.`,
  },
  {
    slug: 'auth-testing',
    title: 'Authentication and Authorization Testing',
    category: 'security',
    description: 'Comprehensive testing of auth flows, session management, and access control.',
    tags: ['auth', 'authorization', 'session', 'security', 'rbac'],
    content: `Authentication (who are you?) and authorization (what are you allowed to do?) are the two security pillars of any multi-user application. Testing them thoroughly is one of the highest-value activities a QA engineer can perform — vulnerabilities here expose all user data and application functionality.

Map out all roles and permissions in your application before writing tests. Create a matrix: rows are roles (guest, user, admin), columns are resources/actions (GET /users, DELETE /users/:id, POST /admin/settings). Every cell in the matrix is a test case: does role X have access to action Y? This matrix-driven approach ensures complete coverage of the permission model.

Test session management explicitly: after logout, verify that the old session token is rejected (returns 401). After password change, verify that all other active sessions are invalidated. Verify that session tokens have a reasonable expiry time and that the application enforces it. These checks prevent session fixation and token theft from being exploitable long-term.

Test for IDOR (Insecure Direct Object Reference): if a URL contains /orders/12345, change 12345 to another user's order ID and verify that access is denied. IDOR is extremely common and the fix is simple (check ownership server-side), but it is often overlooked in development. Automated IDOR tests are easy to write — create two test users, create resources under each, and verify cross-access is blocked.

For OAuth2/OIDC flows, test the full callback handling: a state parameter mismatch should be rejected (prevents CSRF), a code should only be usable once (prevents replay), and the redirect_uri should be strictly validated against a whitelist (prevents open redirect). These checks require access to the auth flow internals, so coordinate with developers to expose them in a test environment.`,
  },
  {
    slug: 'zap-security-scanning',
    title: 'Automated Security Scanning with OWASP ZAP',
    category: 'security',
    description: 'Use OWASP ZAP to add automated security scanning to your CI pipeline.',
    tags: ['zap', 'owasp', 'security', 'scanning', 'ci', 'automation'],
    content: `OWASP ZAP (Zed Attack Proxy) is a free, open-source security scanner widely used for automated vulnerability detection. Unlike manual penetration testing, ZAP can be run in a CI pipeline on every deployment to catch common vulnerabilities before they reach production.

ZAP has two main scanning modes: the baseline scan (passive, read-only) and the full active scan (sends attack payloads). Start with the baseline scan in CI — it spider-crawls the application and flags obvious issues (missing security headers, exposed stack traces, information disclosure) without any risk to data. Use the Docker image: docker run -t owasp/zap2docker-stable zap-baseline.py -t http://your-app.

Configure ZAP rules to match your application's risk tolerance. Use a .zap/rules.tsv file to ignore false positives and mark specific alerts as informational rather than failures. Focus on High and Medium risk alerts in CI — Low risk alerts are often informational and can be reviewed separately in a security backlog.

Integrate ZAP with your existing E2E tests for maximum coverage. Run your Playwright or Selenium tests through a ZAP proxy — ZAP will automatically scan all URLs and forms visited during the test. This is more effective than ZAP's own spider for single-page applications (SPAs) where content is loaded dynamically and URLs are not discoverable by crawling.

Use ZAP's API to programmatically start scans, wait for completion, and retrieve results in your CI pipeline. The zap-api-scan.py script is designed for API testing — point it at your OpenAPI/Swagger definition and it will generate and send test requests for every endpoint. Export results in XML or JSON for ingestion into your security dashboard.`,
  },
]
