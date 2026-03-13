import { test as setup, expect } from '@playwright/test';
import users from '../test-data/users.json';

const authFile = 'auth/auth.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
  const validUser = users.validUsers[0];
  await page.getByPlaceholder('Username').fill(validUser.username);
  await page.getByPlaceholder('Password').fill(validUser.password);
  await page.getByRole('button', { name: 'Login' }).click();
  
  await expect(page).toHaveURL(/dashboard/);
  
  await page.context().storageState({ path: authFile });
});