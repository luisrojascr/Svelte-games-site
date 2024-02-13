import { expect, test } from '@playwright/test';

test('has button that says "Svelte Component"', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Svelte Component')).toBeVisible();
});
