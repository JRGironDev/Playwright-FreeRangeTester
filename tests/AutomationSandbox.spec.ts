import { test, expect } from '@playwright/test';

const textoAEscrbir = 'Un aburrido texto';

test.describe('Automation Sandbox', () => {
    test('Click en botón ID dinámico', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando hago clic en el botón con ID dinámico', async () => {
            const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
            await botonIDDinamico.click({ force: true });
            //await botonIDDinamico.dblclick();
            //await botonIDDinamico.click({ button: 'right' });
            //await botonIDDinamico.click({ modifiers: ['Shift'] });
            //await botonIDDinamico.hover();
        });
    })

    test('Lleno el campo de texto en Automation Sandbox', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando lleno el campo de texto Un aburrido texto', async () => {
            const campoTexto = page.getByRole('textbox', { name: 'Un aburrido texto' });
            await campoTexto.fill(textoAEscrbir);

            expect(await campoTexto.inputValue()).toBe(textoAEscrbir);
        });
    })

})
