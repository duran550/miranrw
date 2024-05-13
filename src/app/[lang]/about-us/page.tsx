import React from 'react';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

import About from '@/app/components/about-us/AboutsUs';
import Header from '@/app/components/header/header';

export default async function AboutUs({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="w-full overflow-hidden" key={0}>
      <Header lang={lang} />

      <About page={page} lang={lang} />
    </div>
  );
}
