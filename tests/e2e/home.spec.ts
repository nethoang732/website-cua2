import { expect, test } from '@playwright/test';

const widths = [375, 390, 768, 1024, 1440];

test('homepage loads and stays within the viewport at supported widths', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /mở lối cho ánh sáng chạm vào không gian/i }),
  ).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Điều hướng chính' })).toBeVisible();

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(
      dimensions.viewport,
    );
  }
  expect(errors).toEqual([]);
});

test('serves metadata, robots and a placeholder page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Eurowindow/);
  const robots = await page.request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  await page.goto('/san-pham');
  await expect(page.getByRole('heading', { name: 'Sản phẩm' })).toBeVisible();
});
