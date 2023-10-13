import { test, expect } from '@playwright/test';
import { url } from './site';

test('test', async ({ page }) => {
  test.slow();
  await page.goto(`${url}/en`);
  await page.getByRole('link', { name: 'Report an Incident' }).click();
  await page.getByRole('button', { name: "Let's start" }).click();
  await page.getByLabel('Another person').check();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('hello');
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByRole('gridcell', { name: '14' }).click();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.locator('#place').check();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('mexico');
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('Sexual Orientation').check();
  await page.getByLabel('Other, specify').check();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('hello');
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('Homophobia').check();
  await page.getByLabel('Other, specify').check();
  await page.getByRole('textbox').fill('games');
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('Yes, specify:').check();
  await page.getByLabel('Anti-Asian Racism').check();
  await page.getByLabel('Other, specify:').check();
  await page.getByRole('textbox').fill('helium');
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('intersex').check();
  await page.getByLabel('gay').check();
  await page.getByLabel('bi+sexual').check();
  await page.getByLabel('18 - 27 years').check();
  await page
    .getByLabel(
      'I hereby confirm the accuracy of my information, acknowledge the data protection regulations (hyperlink to data protection concept), and consent to the described processing of my personal data.*'
    )
    .check();
  await page.getByRole('button', { name: 'Submit' }).click();
});
