import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Header from '../components/header/header';
import HeroSection from '../components/hero-section/HeroSection';
import Footer from '../components/footer/Footer';
import GeneralLayout from '../components/layout/general/GeneralLayout';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <GeneralLayout lang={lang} generalLayoutTranslation={page?.cookiesConsent}>
      <Header lang={lang} />
      <HeroSection lang={lang} content={page?.home?.heroSection} />

      <Footer lang={lang} footer={page?.footer} />
    </GeneralLayout>
  );
}
