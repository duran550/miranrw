export const i18n = {
  defaultLocale: 'de-LS',
  locales: ['de-LS', 'de', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
