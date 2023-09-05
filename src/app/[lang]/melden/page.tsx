import Footer from '@/app/components/footer/Footer';
import MultiStepForm from '@/app/components/forms/multistep/MultiStepForm';
import Header from '@/app/components/header/header';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function melden({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="h-full md:mx-12 mx-6">
      <Header lang={lang} />
      <div className="md:mt-16 mt-4 px-2 sm:px-[40px] xl:px-[450px]  ">
        <MultiStepForm formTranslation={page.melden} />
      </div>
      <div className="mt-96 relative">
        <Footer footer={page.footer} />
      </div>
    </div>
  );
}
