import { test, expect } from '@playwright/test';

const REPO = 'FreRangePW';
const USER = 'TheFreRangeTester';

test('Se puede crear un Issue en el repositrio de GitHub ', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[BUG] reporte 1',
            body: 'Este es un reporte de un bug',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

});