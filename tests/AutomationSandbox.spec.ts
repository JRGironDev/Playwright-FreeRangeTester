import { test, expect } from '@playwright/test';

const textoAEscrbir = 'Un aburrido texto';

test.describe('Automation Sandbox', () => {
    test.setTimeout(90000);
    test.skip('Click en botón ID dinámico', async ({ page }) => {
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

    test.only('Lleno el campo de texto en Automation Sandbox', async ({ page }) => {
        test.info().annotations.push({
            type: 'Story DG1212 ',
            description: 'Este test es para demostrar el uso de annotations en Playwright',
        })
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

    test('Puedo seleccionar y deseleccionar un check box en el sandbox @Sandbox', async ({ page, browserName }) => {
        test.skip(browserName === 'chromium', 'Este test no se ejecuta en Chromium');
        
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando selecciono check box', async () => {
            const checkBox = page.getByRole('checkbox', { name: 'Pasta 🍝' });
            await checkBox.check();

            await expect(checkBox, 'Checkbox no estaba seleccionado').toBeChecked();
        });

        await test.step('Puedo deseleccionar el checkbox Pasta 🍝', async () => {
            const checkBox = page.getByRole('checkbox', { name: 'Pasta 🍝' });
            await checkBox.uncheck();

            await expect(checkBox, 'Checkbox estaba seleccionado').not.toBeChecked();
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

    test.skip('Puedo subir archivos', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando subio un archivo', async () => {
            const inputFile = page.getByRole('textbox', { name: 'Archivo' });
            await inputFile.setInputFiles('tests/files/file.txt');
            //await inputFile.setInputFiles(['tests/files/file.txt', 'tests/files/file2.txt']);
        })
    })

    test.skip('Puedo hacer un Drag and Drop', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatizaciónde pruebas', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando hago un Drag and Drop', async () => {
            await page.getByTestId('DragFrom').dragTo(page.getByTestId('DropTo'));
        })
    })

    test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
            const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', (elementos) => {
                return elementos.map(elemento => elemento.textContent);
            });

            const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

            console.log(valoresColumnaNombres);
            expect(valoresColumnaNombres).toEqual(nombresEsperados);
        })
    })

    test('Valido que todos los valores de la tabla dinámica cambian luego de un reload a la web', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
            const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', (elementos) => {
                return elementos.map(elemento => elemento.textContent);
            });

            console.log(valoresTablaDinamica);

            await page.reload();

            const valoresTablaDinamicaReloada = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', (elementos) => {
                return elementos.map(elemento => elemento.textContent);
            });

            console.log(valoresTablaDinamicaReloada);

            expect(valoresTablaDinamica).not.toEqual(valoresTablaDinamicaReloada);
        })
    })

    test('Ejemplo de Soft Assertion', async ({ page }) => {
        await test.step('Dado que navego al sandbox de automatización', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Valido que todos los elementos de los checkboxese estén visibles', async () => {
            await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizzau 🍕').toBeVisible();
            await expect.soft(page.getByText('Hamburguesa 🍔')).toBeVisible();
            await expect.soft(page.getByText('Pasta 🍝')).toBeVisible();
            await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helados 🍧').toBeVisible();
            await expect.soft(page.getByText('Torta 🍰')).toBeVisible();
        })
    })

    test('Validando dentro de un popup', async ({ page }) => {
        await test.step('Dado que navego al sandbox', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando hago clic en el botón popup', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
        })

        await test.step('Puedo validar un elemento dentro del popup', async () => {
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
            await page.getByRole('button', { name: 'Cerrar' }).click();
        })
    })
})
