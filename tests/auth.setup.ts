import { test as setup, expect } from '@playwright/test';
import users from '../test-data/users.json';

const authFile = 'auth/auth.json';

setup('authenticate', async ({ page }) => {
  setup.setTimeout(60000);

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 60000 });
  
  const validUser = users.validUsers[0];
  await page.getByPlaceholder('Username').fill(validUser.username);
  await page.getByPlaceholder('Password').fill(validUser.password);
  await page.getByRole('button', { name: 'Login' }).click();
  
  await expect(page).toHaveURL(/dashboard/, { timeout: 30000 });
  
  await page.context().storageState({ path: authFile });
});