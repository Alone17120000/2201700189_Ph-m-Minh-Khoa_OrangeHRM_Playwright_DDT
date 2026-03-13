import { test, expect } from '@playwright/test';
import employeeData from '../test-data/employee.json';

test.use({ storageState: 'auth/auth.json' });

for (const emp of employeeData.employees) {
  test(`Add Employee - ${emp.firstName} ${emp.lastName}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    await expect(page.locator('h6').filter({ hasText: 'Dashboard' })).toBeVisible({ timeout: 15000 });
    
    await page.getByRole('link', { name: 'PIM' }).click({ noWaitAfter: true });
    
    await expect(page.getByRole('link', { name: 'Add Employee' })).toBeVisible({ timeout: 15000 });
    await page.getByRole('link', { name: 'Add Employee' }).click();
    
    await expect(page.locator('h6').filter({ hasText: 'Add Employee' })).toBeVisible({ timeout: 15000 });
    
    await page.waitForTimeout(2000); 

    await page.getByPlaceholder('First Name').fill(emp.firstName);
    await page.getByPlaceholder('Last Name').fill(emp.lastName);
    
    await page.waitForTimeout(2000);
    
    await page.getByRole('button', { name: 'Save' }).click();
    
    await expect(page.locator('.oxd-toast-content--success').first()).toBeVisible({ timeout: 15000 });
  });
}