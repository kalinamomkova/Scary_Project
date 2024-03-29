const { test, expect } = require('@playwright/test');

test('user can delete a task', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test task');
    await page.click('#add-task');
    await page.click('#task-0 .delete-task');

    const tasks = await page.$$eval('.task', tasks => tasks.map( task => task.textContent));
    expect(tasks).not.toContain('Test task');
});