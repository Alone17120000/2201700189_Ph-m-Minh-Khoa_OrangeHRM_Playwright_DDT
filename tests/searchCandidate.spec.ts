import { test, expect } from '@playwright/test';
import searchData from '../test-data/searchCandidate.json';

test.use({ storageState: 'auth/auth.json' });

for (const item of searchData.validSearch) {
  test(`Search Candidate - ${item.candidateName}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    await page.getByRole('link', { name: 'Recruitment' }).click();
    await page.waitForTimeout(3000);
    
    await page.getByPlaceholder('Type for hints...').first().fill(item.candidateName);
    await page.getByRole('button', { name: 'Search' }).click();
    
    await page.waitForTimeout(2000);
    await expect(page.locator('.oxd-table-card').first()).toBeVisible({ timeout: 15000 });
  });
}