import { test, expect } from '@playwright/test';

test('Hace un mock de una fruta que no viene de la API real', async ({ page }) => {
    //Hacemos un mock de la API
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Melocotón', id: 26 }];
        await route.fulfill({ json });
    });
    // vamos a la página
    await page.goto('https://demo.playwright.dev/api-mocking');

    // validamos que Melocotón está disponible
    await expect(page.getByText('Melocotón')).toBeVisible();
});

test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {

    //Obtenemos la respuesta y le agregamos un extra
    await page.route('**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Melocotón', id: 26 });
        await route.fulfill({ response, json });
    });
    
    // vamos a la página
    await page.goto('https://demo.playwright.dev/api-mocking');

    // validamos que Melocotón está disponible
    await expect(page.getByText('Melocotón', { exact: true })).toBeVisible();
});