import { test, expect } from '@playwright/test';
import searchData from '../test-data/search.json';

const SEARCH_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList';

test.use({ storageState: 'auth/auth.json' });

for (const item of searchData.validSearch) {
  test(`Search thanh cong - ${item.field}: "${item.value}"`, async ({ page }) => {
    await page.goto(SEARCH_URL);
    await page.waitForTimeout(3000);
    
    await page.locator('label').filter({ hasText: 'Employee Name' }).locator('..').locator('..').locator('input').fill(item.value);
    await page.getByRole('button', { name: 'Search' }).click();
    
    await page.waitForTimeout(2000);
    await expect(page.locator('.oxd-table-card').first()).toBeVisible({ timeout: 15000 });
  });
}

for (const item of searchData.invalidSearch) {
  test(`Search khong co ket qua - "${item.value}"`, async ({ page }) => {
    await page.goto(SEARCH_URL);
    await page.waitForTimeout(3000);
    
    await page.locator('label').filter({ hasText: 'Employee Name' }).locator('..').locator('..').locator('input').fill(item.value);
    await page.getByRole('button', { name: 'Search' }).click();
    
    await expect(page.locator(`text=${item.expectedResult}`).first()).toBeVisible({ timeout: 15000 });
  });
}