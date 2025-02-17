import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('navigation to https://www.freerangetesters.com', async ({ page }) => {
        await test.step('navigation to https://www.freerangetesters.com', async () => {
            await page.goto('https://www.freerangetesters.com/');
        });

        // Expect a title "to contain" a substring.
        //await expect(page).toHaveTitle(/Free Range Testers/);
    });
});