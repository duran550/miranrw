import Footer from '@/app/components/footer/Footer';
import MultiStepForm from '@/app/components/forms/multistep/MultiStepForm';
import Header from '@/app/components/header/header';
import GeneralLayout from '@/app/components/layout/general/GeneralLayout';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function report({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <GeneralLayout lang={lang} generalLayoutTranslation={page?.cookiesConsent}>
      <div className="">
        <Header lang={lang} />
        <div className="md:mt-16 h-full  py-16 px-4 sm:px-[40px] lg:px-[250px]  ">
          <MultiStepForm lang={lang} formTranslation={page.melden} />
        </div>
        <div className="mt-0">
          <Footer lang={lang} footer={page.footer} />
        </div>
      </div>
    </GeneralLayout>
  );
}
