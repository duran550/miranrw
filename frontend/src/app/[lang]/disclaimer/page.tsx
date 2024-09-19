import CookieConsent from '@/app/components/banners/CookieConsent';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/header';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function disclaimer({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="">
      <Header lang={lang} />
      <div className="md:mt-2 md:mb-64 h-full w-full md:max-w-3xl  py-16 px-4 sm:px-[40px] lg:px-16  ">
        <h1 className="font-bold mb-24 text-2xl">Disclaimer</h1>
        <p className="my-4">{page?.datenschutz.firstParagraph}</p>
        <p>{page?.datenschutz.secondParagraph}</p>
      </div>
      <div className="mt-0">
        <Footer lang={lang} footer={page.footer} />
      </div>
      <CookieConsent
        lang={lang}
        cookieConsentTranslation={page?.cookiesConsent}
      />
    </div>
  );
}
