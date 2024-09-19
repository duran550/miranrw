import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Header from '../components/header/header';
import HeroSection from '../components/hero-section/HeroSection';
import Footer from '../components/footer/Footer';
import CookieConsent from '../components/banners/CookieConsent';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="w-screen overflow-x-hidden m-0">
      <Header lang={lang} />
      <HeroSection lang={lang} content={page?.home?.heroSection} />
      <Footer lang={lang} footer={page?.footer} />
      <CookieConsent
        lang={lang}
        cookieConsentTranslation={page?.cookiesConsent}
      />
    </div>
  );
}
