import { test, expect } from '@playwright/test';

test.describe('Automation Sandbox', () => {
    test('Click en botón ID dinámico', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando hago clic en el botón con ID dinámico', async () => {
            await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
        });
    })
    
    
})
