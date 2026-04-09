import { test, expect } from '@playwright/test'

test('login with valid credentials navigates to home', async ({ page }) => {
  await page.goto('/login')
  await page.fill('#email', 'admin@aqa.dev')
  await page.fill('#password', 'aqa2024')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page).toHaveURL('/')
})
