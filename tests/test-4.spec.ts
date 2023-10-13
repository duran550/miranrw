import { test, expect } from '@playwright/test';
import { url } from './site';

test('test', async ({ page }) => {
  test.slow();
  await page.goto(`${url}/en`);
  await page.getByRole('link', { name: 'Report an Incident' }).click();
  await page.getByRole('button', { name: "Let's start" }).click();
  await page.getByLabel('An organization/institution').check();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('Cultural Institution').check();
  await page.getByLabel('Association').check();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('10-49').check();
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
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('Homophobia').check();
  await page.getByLabel('Agender discrimination').check();
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
  await page
    .getByLabel(
      'I consent to sharing my information with the relevant reporting agencies in case of multiple discrimination, in an anonymized form (hyperlink to the list).'
    )
    .check();
  await page
    .getByLabel(
      'I hereby confirm the accuracy of my information, acknowledge the data protection regulations (hyperlink to data protection concept), and consent to the described processing of my personal data.*'
    )
    .check();
  await page.getByRole('button', { name: 'Submit' }).click();
});
