import { test, expect } from '@playwright/test';

const REPO = 'Playwright-FreeRangeTester';
const USER = 'JRGironDev';

let apiContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
})

test.afterAll(async ({ request }) => {
    await apiContext.dispose();
})


test('El último issue creado es el primero en la lista', async ({ page }) => {
    const data = {
        title: '[Feature] Que el framework sea open source'
    };

    //let headers = {
    //    'Accept': 'application/vnd.github.v3+json',
    //    'Authorization': `token ${process.env.API_TOKEN}`,
    //};
    
    const newIssue = await apiContext.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, 
    { data });

    expect(newIssue.ok()).toBeTruthy();

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator('li').filter({ hasText: '[Feature] Que el framework sea open sourceStatus: Open.#9 In JRGironDev/' }).getByRole('link').first();
    await expect(firstIssue).toBeVisible();
});