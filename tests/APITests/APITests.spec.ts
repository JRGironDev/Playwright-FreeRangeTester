import { test, expect } from '@playwright/test';

const REPO = 'Repo-Playwright';
const USER = 'JRGironDev';

test.beforeAll(async ({ request }) => {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${process.env.API_TOKEN}`,
    };

    const response = await request.post('https://api.github.com/user/repos', {
        headers,
        data: {
            name: REPO
        }
    });

    expect(response.status()).toBe(201);
})


test('Se puede crear un Issue en el repositrio de GitHub ', async ({ request }) => {
    const data = {
        title: 'Issue creado desde Playwright con la API de GitHub',
        body: 'Este issue fue creado desde Playwright',
    };

    let headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${process.env.API_TOKEN}`,
    };
    
    const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, 
    { headers, data });

    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`https://api.github.com/repos/${USER}/${REPO}/issues`);
    expect(issues.status()).toBe(200);
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: 'Issue creado desde Playwright con la API de GitHub',
        body: 'Este issue fue creado desde Playwright',
    }));
}); 

test.afterAll(async ({ request }) => {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${process.env.API_TOKEN}`,
    };

    const response = await request.delete(`https://api.github.com/repos/${USER}/${REPO}`,
        { headers }
    );
    expect(response.ok()).toBeTruthy();
})
