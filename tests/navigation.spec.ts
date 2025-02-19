import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {

    const secciones = [
        { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
        { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy' },
        { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
    ]

    for (const seccion of secciones) {
        test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {
            await test.step('Estando yo en la web principal https://www.freerangetesters.com', async () => {
                await page.goto('https://www.freerangetesters.com/');
                await expect(page).toHaveTitle(/Free Range Testers/);
            });
    
            await test.step(`Cuando haga click en "${seccion.nombre}"`  , async () => {
                await page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true }).click();
                await page.waitForURL(`**${seccion.url}`);
            });
    
            await test.step(`Soy dirigido a la sección de título ${seccion.tituloEsperado}`, async () => {
                await expect(page).toHaveTitle(seccion.tituloEsperado);
            });
        });
    }


});