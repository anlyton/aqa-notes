# AQA Notes

A knowledge base web app for Automation QA engineers — built as a **Playwright portfolio project** to demonstrate real-world E2E test automation skills.

## What this is

AQA Notes is a structured reference covering web, mobile, API, performance, and security test automation. The app itself is the **test target**: it provides realistic UI flows (auth, navigation, search, i18n) that serve as a meaningful playground for writing and showcasing Playwright tests.

**Live site:** _add your deployed URL here_

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 19, TypeScript, Tailwind CSS |
| Routing | React Router v7 |
| i18n | i18next (English / Ukrainian) |
| Bundler | Vite |
| E2E tests | Playwright |
| CI | GitHub Actions |

## Project structure

```
src/
├── components/       # Layout, CategoryCard, NoteCard, ProtectedRoute
├── context/          # AuthContext (login / logout)
├── data/             # categories, notes, automation-types (static content)
├── pages/            # HomePage, CategoryPage, NotePage, SearchPage, ...
├── locales/          # en.json, uk.json
└── test-ids.ts       # data-testid constants shared with E2E tests

tests/                # Playwright specs
.github/workflows/    # CI pipeline
```

## Credentials (demo)

| Email | Password | Role |
|---|---|---|
| admin@aqa.dev | aqa2024 | Admin |
| qa@aqa.dev | test1234 | QA Engineer |

## Running locally

```bash
npm install
npm run dev          # start dev server at http://localhost:5173
```

## Running E2E tests

```bash
# against local dev server (starts automatically)
npx playwright test

# headed mode for debugging
npx playwright test --headed

# Playwright UI mode
npx playwright test --ui

# against a deployed URL
BASE_URL=https://your-site.vercel.app npx playwright test
```

## CI pipeline

Tests run automatically on every push and pull request to `main` via GitHub Actions:

1. Install dependencies
2. Build the app (`npm run build`)
3. Start production preview (`npm run preview`)
4. Run Playwright tests against `http://localhost:4173`
5. Upload HTML report as a workflow artifact (14-day retention)

See [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

## Deploying

The app is a static Vite build — deploy anywhere that serves static files:

```bash
# Vercel (recommended)
npm i -g vercel
vercel

# Netlify
npm i -g netlify-cli
netlify deploy --prod --dir=dist

# Preview the production build locally
npm run build
npm run preview
```

## Portfolio notes

- `test-ids.ts` exports `TEST_IDS` constants used in both the app and tests — no magic strings
- Auth state is persisted in `localStorage` and protected routes redirect unauthenticated users
- The `BASE_URL` env var lets tests point at any environment without changing config
- CI uses `github` reporter so failures annotate the PR diff directly
