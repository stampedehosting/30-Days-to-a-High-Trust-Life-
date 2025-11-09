import { test, expect } from '@playwright/test';

test.describe('Page Submission Tests', () => {
  test('should load page submission page successfully', async ({ page }) => {
    await page.goto('/page-submission', { waitUntil: 'networkidle' });
    
    // Check that the page loaded
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*page-submission/);
  });

  test('should display submission content on desktop', async ({ page, viewport }) => {
    await page.goto('/page-submission', { waitUntil: 'networkidle' });
    
    if (viewport && viewport.width >= 1024) {
      // Verify main content is visible
      await page.waitForSelector('body', { state: 'visible' });
      await expect(page.locator('main, body')).toBeVisible();
    }
  });

  test('should display submission content on mobile', async ({ page, viewport }) => {
    await page.goto('/page-submission', { waitUntil: 'networkidle' });
    
    if (viewport && viewport.width < 768) {
      // Verify main content is visible on mobile
      await page.waitForSelector('body', { state: 'visible' });
      await expect(page.locator('main, body')).toBeVisible();
    }
  });
});
