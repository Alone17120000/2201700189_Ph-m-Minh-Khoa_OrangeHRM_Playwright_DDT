import { test, expect } from '@playwright/test';
import users from '../test-data/users.json';

for (const user of users.validUsers) {
  test(`Login thanh cong - ${user.role}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill(user.username);
    await page.getByPlaceholder('Password').fill(user.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(new RegExp(user.expectedUrl));
  });
}

for (const user of users.invalidUsers) {
  test(`Login that bai - ${user.description}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    if (user.username !== "") {
      await page.getByPlaceholder('Username').fill(user.username);
    }
    if (user.password !== "") {
      await page.getByPlaceholder('Password').fill(user.password);
    }
    
    await page.getByRole('button', { name: 'Login' }).click();
    
    if (user.expectedError === 'Required') {
      await expect(page.locator('.oxd-input-field-error-message').first()).toBeVisible();
    } else {
      await expect(page.getByText(user.expectedError)).toBeVisible();
    }
  });
}