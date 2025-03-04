import { test, expect } from '@playwright/test';

const REPO = 'DevJobs';
const USER = 'JRGironDev';

test('Se puede crear un Issue en el repositrio de GitHub ', async ({ request }) => {
    const data = {
        title: 'Issue creado desde Playwright',
        body: 'Este issue fue creado desde Playwright',
    };

    let headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${process.env.API_TOKEN}`,
    };
    
    const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, 
    { headers, data });

    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.status()).toBe(200);
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[BUG] reporte 1',
        body: 'Este es un reporte de un bug',
    }));
}); 

test('Puedo crear un bug en el repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] Explotó todo',
            body: 'Estamos perdidirijillos!',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
 
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] Explotó todo',
        body: 'Estamos perdidirijillos!'
    }));
});