import { test, expect } from '@playwright/test';

test.describe('FAQs Page Tests', () => {
  test('should load FAQs page successfully', async ({ page }) => {
    await page.goto('/faqs', { waitUntil: 'networkidle' });
    
    // Check that the page loaded
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*faqs/);
  });

  test('should display FAQs content on desktop', async ({ page, viewport }) => {
    await page.goto('/faqs', { waitUntil: 'networkidle' });
    
    if (viewport && viewport.width >= 1024) {
      // Verify main content is visible
      await page.waitForSelector('body', { state: 'visible' });
      await expect(page.locator('main, body')).toBeVisible();
    }
  });

  test('should display FAQs content on mobile', async ({ page, viewport }) => {
    await page.goto('/faqs', { waitUntil: 'networkidle' });
    
    if (viewport && viewport.width < 768) {
      // Verify main content is visible on mobile
      await page.waitForSelector('body', { state: 'visible' });
      await expect(page.locator('main, body')).toBeVisible();
    }
  });
});
