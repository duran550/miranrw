import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import LocaleSwitcher from './locale-switcher/locale-switcher';
import { useState } from 'react';
import NavBar from './navbar/NavBar';

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <header>
      <NavBar lang={lang} navigation={navigation} />
    </header>
  );
}
