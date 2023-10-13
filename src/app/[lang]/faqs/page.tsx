import Faq from '@/app/components/faq/Faq';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/header';
import SinglePageLayout from '@/app/components/layout/SinglePageLayout';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function faqs({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="">
      <Header lang={lang} />
      <div className="md:mt-16 h-full  py-16 px-4 sm:px-4 lg:px-12  ">
        <SinglePageLayout
          lang={lang}
          buttonTitle={page.home?.heroSection?.buttonText}
        >
          <h1 className="font-bold text-3xl mb-16">FAQs</h1>
          <div className="w-full lg:max-w-2xl">
            <Faq
              title={page?.faqs.group1.title}
              faqs={page?.faqs?.group1.faqs}
            />
            <Faq
              title={page?.faqs.group2.title}
              faqs={page?.faqs?.group2.faqs}
            />
            <Faq
              title={page?.faqs.group3.title}
              faqs={page?.faqs?.group3.faqs}
            />
          </div>
        </SinglePageLayout>
      </div>
      <div className="mt-32 lg:mt-[6rem]">
        <Footer lang={lang} footer={page.footer} />
      </div>
    </div>
  );
}
