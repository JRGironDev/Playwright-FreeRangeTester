import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('navigation to https://www.freerangetesters.com', async ({ page }) => {
        await test.step('navigation to https://www.freerangetesters.com', async () => {
            await page.goto('https://www.freerangetesters.com/');
            await expect(page).toHaveTitle(/Free Range Testers/);
        });

        await test.step('Cuando haga click en "Cursos"', async () => {
            page.locator('#page_header').getByRole('link', { name: 'Cursos', exact: true }).click();
            await page.waitForURL('**/cursos');
        });

        await test.step('Soy dirigido a la sección de cursos', async () => {
            await expect(page).toHaveTitle('Cursos');
        });
    });
});