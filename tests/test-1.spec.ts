import { test, expect } from '@playwright/test';
import { url } from './site';

test('test', async ({ page }) => {
  test.slow();
  await page.goto(`${url}/en`);
  await page.getByRole('link', { name: 'Report an Incident' }).click();
  await page.getByRole('button', { name: "Let's start" }).click();
  await page.getByLabel('Myself').check();
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
  await page
    .getByLabel('Es ist über einen längeren Zeitraum passiert.')
    .check();
  await page.getByLabel('', { exact: true }).fill('12/03/2020 - 12/04/2022');
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
  await page.getByLabel('Gender Identity').check();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .first()
    .click();
  await page.getByLabel('Lesbophobia').check();
  await page.getByLabel('Other, specify').check();
  await page.getByRole('textbox').fill('germany');
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
  await page.getByLabel('agender').check();
  await page.getByLabel('lesbian').check();
  await page.getByLabel('under 18 years').check();
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
