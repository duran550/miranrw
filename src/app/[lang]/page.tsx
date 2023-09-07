import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { Suspense } from 'react';
import Header from '../components/header/header';
import Carousel from '../components/carousel/Carousel';
import HeroSection from '../components/hero-section/HeroSection';
import Footer from '../components/footer/Footer';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} />
      <HeroSection lang={lang} content={page.home.heroSection} />
      <Footer footer={page.footer} />
    </>
  );
}
