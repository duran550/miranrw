import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.slow()
  await page.goto('https://miq-nrw.vercel.app/de');
  await page.locator('div').filter({ hasText: /^Vorfall melden$/ }).getByRole('link').click();
  await page.getByRole('button', { name: 'Los geht’s' }).click();
  await page.getByLabel('Ich selbst').check();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByPlaceholder('Bitte beschreibe den Vorfall so genau wie möglich.').click();
  await page.getByPlaceholder('Bitte beschreibe den Vorfall so genau wie möglich.').fill('kdjnkfl kffjokdfkfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkf');
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByRole('gridcell', { name: '17' }).click();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByLabel('Es ist online passiert.').check();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByLabel('Geschlechtliche Identität').check();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByLabel('Lesbenfeindlichkeit').check();
  await page.getByLabel('Inter*feindlichkeit').check();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByLabel('Nein').check();
  await page.locator('div').filter({ hasText: /^Weiter$/ }).first().click();
  await page.getByLabel('agendar').check();
  await page.getByLabel('lesbisch').check();
  await page.getByLabel('unter 18 Jahre').check();
  await page.getByLabel('Ich willige ein, dass meine Eingaben im Falle von Mehrfachdiskriminierung anonymisiert mit den zuständigen Meldestellen (Hyperlink zu Auflistung) geteilt werden.').check();
  await page.getByRole('button', { name: 'Meldung abschicken' }).click();
  await page.getByRole('button', { name: 'Verweisberatung' }).click();
});