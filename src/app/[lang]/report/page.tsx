import CookieConsent from '@/app/components/banners/CookieConsent';
import Footer from '@/app/components/footer/Footer';
import MultiStepForm from '@/app/components/forms/multistep/MultiStepForm';
import { MultiStepFormValuesProps } from '@/app/components/forms/multistep/multiStepForm';
import Header from '@/app/components/header/header';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function report({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="">
      <Header lang={lang} /> 
      <div className="md:mt-5 h-full 2xl:w-[1335px] 2xl:px-0 2xl:mx-auto  pb-16 pt-6 px-4 sm:px-[40px] lg:px-14 ">
        <MultiStepForm lang={lang} formTranslation={page.melden as MultiStepFormValuesProps} />
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
