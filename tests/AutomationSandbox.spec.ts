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
            await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();

        });
    })

    test('Lleno el campo de texto en Automation Sandbox', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando lleno el campo de texto Un aburrido texto', async () => {
            const campoTexto = page.getByRole('textbox', { name: 'Un aburrido texto' });
            await expect(campoTexto, 'Campo de texto no permite edición').toBeEditable();
            await campoTexto.fill(textoAEscrbir);
            await expect(campoTexto, `No tiene el texto ${textoAEscrbir}`).toHaveValue(textoAEscrbir);
            await campoTexto.clear();
            await expect(campoTexto, 'Campo de texto debería estar vacío').toHaveValue('');
        });
    })

    test('Puedo seleccionar check box', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando selecciono check box', async () => {
            const checkBox = page.getByRole('checkbox', { name: 'Pasta 🍝' });
            await checkBox.check();

            await expect(checkBox, 'Checkbox no estaba seleccionado').toBeChecked();
        });
    })
    
    test('Puedo seleccionar radio button', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando selecciono radio button', async () => {
            const radioButton = page.getByLabel('No');
            await radioButton.check();

            expect(await radioButton.isChecked()).toBe(true);
        });
    })

    test('Puedo seleccionar opciones de select', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando selecciono opciones de select', async () => {
            const deportes = ['Fútbol', 'Tennis', 'Basketball'];

            for (let opcion of deportes) {
                const elemento = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`)

                if (elemento) {
                    console.log(`Elemento encontrado: ${opcion}`);
                }
                else {
                    throw new Error(`Elemento no encontrado: ${opcion}`);
                }
            }

            const dropdownDeportes = page.getByLabel('Dropdown');
            await dropdownDeportes.selectOption( 'Fútbol' );
            await expect(dropdownDeportes, 'Debe estar seleccionado el deporte Fútbol').toHaveValue('Fútbol');
        });
    })

    test('Puedo seleccionar opciones de select con botones', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })  

        await test.step('Selecciono un día de la semana', async () => {
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            await page.getByRole('link', { name: 'Martes' }).click();
        })
    })

    test('Puedo subir archivos', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando subio un archivo', async () => {
            const inputFile = page.getByRole('textbox', { name: 'Archivo' });
            await inputFile.setInputFiles('tests/files/file.txt');
            //await inputFile.setInputFiles(['tests/files/file.txt', 'tests/files/file2.txt']);
        })
    })

    test('Puedo hacer un Drag and Drop', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatizaciónde pruebas', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando hago un Drag and Drop', async () => {
            await page.getByTestId('DragFrom').dragTo(page.getByTestId('DropTo'));
        })
    })

})
