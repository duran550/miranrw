import Footer from '@/app/components/footer/Footer';
import MultiStepForm from '@/app/components/forms/multistep/MultiStepForm';
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
      <div className="md:mt-16 h-full  py-16 px-4 sm:px-[40px] lg:px-[250px]  ">
        <MultiStepForm formTranslation={page.melden} />
      </div>
      <div className="mt-0">
        <Footer footer={page.footer} />
      </div>
    </div>
  );
}
