import Footer from '@/app/components/footer/Footer';
import MultiStepForm from '@/app/components/forms/multistep/MultiStepForm';
import Header from '@/app/components/header/header';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function impressum({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="">
      <Header lang={lang} />
      <div className="md:mt-2 md:mb-64 h-full w-full md:max-w-3xl  py-16 px-4 sm:px-[40px] lg:px-16  ">
        <h1 className="font-bold mb-24 text-2xl">{page?.impressum.title}</h1>
        <p className="my-4">{page?.impressum.firstParagraph}</p>
        <p>{page?.impressum.secondParagraph}</p>
      </div>
      <div className="mt-0">
        <Footer lang={lang} footer={page.footer} />
      </div>
    </div>
  );
}
