import { test, expect } from '@playwright/test';

const REPO = 'DevJobs';
const USER = 'JRGironDev';

test('Se puede crear un Issue en el repositrio de GitHub ', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues/`, {
        data: {
            title: '[BUG] reporte 1',
            body: 'Este es un reporte de un bug',
        }
    });

    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.status()).toBe(200);
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[BUG] reporte 1',
        body: 'Este es un reporte de un bug',
    }));
}); 