import { test, expect } from '@playwright/test';
import candidateData from '../test-data/candidate.json';

test.use({ storageState: 'auth/auth.json' });

for (const candidate of candidateData.candidates) {
  test(`Add Candidate - ${candidate.firstName} ${candidate.lastName}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    await page.getByRole('link', { name: 'Recruitment' }).click();
    await page.waitForTimeout(2000);
    
    await page.getByRole('button', { name: ' Add ' }).click();
    await page.waitForTimeout(2000);
    
    await page.getByPlaceholder('First Name').fill(candidate.firstName);
    await page.getByPlaceholder('Last Name').fill(candidate.lastName);
    
    await page.locator('label').filter({ hasText: 'Email' }).locator('..').locator('..').locator('input').fill(candidate.email);
    
    await page.getByRole('button', { name: 'Save' }).click();
    
    await expect(page.locator('.oxd-toast-content--success')).toBeVisible({ timeout: 15000 });
  });
}