import { test, expect } from '@playwright/test';
import { url } from './site';

test('test', async ({ page }) => {
  test.slow();
  await page.goto(`${url}/en`);
  await page.getByRole('link', { name: 'Report an Incident' }).click();
  await page.getByRole('button', { name: "Let's start" }).click();
  await page
    .getByLabel("I'm reporting on behalf of the affected person")
    .check();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('hello genny');
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByRole('gridcell', { name: '13' }).click();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('It happened online').check();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('Romantic Orientation').check();
  await page.getByLabel('Body').check();
  await page.getByLabel('Other, specify').check();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('green');
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('Homophobia').check();
  await page.getByLabel('Asexual discrimination').check();
  await page.getByLabel('Other, specify').check();
  await page.getByRole('textbox').fill('challenge');
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('No').check();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('male', { exact: true }).check();
  await page.getByLabel('bi+sexual').check();
  await page.getByLabel('heterosexual').check();
  await page.getByLabel('28 - 40 years').check();
  await page.getByLabel('41 - 65 years').check();
  await page.getByLabel('28 - 40 years').check();
  await page
    .getByLabel(
      'I consent to sharing my information with the relevant reporting agencies in case of multiple discrimination, in an anonymized form (hyperlink to the list).'
    )
    .check();
  await page.getByRole('button', { name: 'Submit' }).click();
});
