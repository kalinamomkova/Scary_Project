const { test, expect } = require('@playwright/test');

test("user can add a task", async({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill("#task-input", "Test task");
    await page.click("#add-task");
    const text = await page.textContent("#task-0");
    expect(text).toContain("Test task");
});

test("user can complete task", async ({page}) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test task');
    await page.click('#add-task');
    await page.click('#task-0 .task-complete');
    const result = await page.$('#task-0.task.completed');
    expect(result).not.toBeNull();
});

test("user can filter tasks", async ({page}) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test task');
    await page.click('#add-task');
    await page.click('#task-0 .task-complete');
    await page.selectOption('#filter', 'completed');
    const result = await page.$('.task:not(.completed)');
    expect(result).toBeNull();
});