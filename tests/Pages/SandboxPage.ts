import { type Locator, type Page } from '@playwright/test';

export class Sandbox{
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }
}

