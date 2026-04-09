import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import { TEST_USER } from './helpers/env'

test('login with valid credentials navigates to home', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(TEST_USER.email, TEST_USER.password)
  await expect(page).toHaveURL('/')
})
