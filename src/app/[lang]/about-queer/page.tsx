import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/header';
import SinglePageLayout from '@/app/components/layout/SinglePageLayout';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function aboutQueer({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, navigation } = await getDictionary(lang);

  return (
    <div className="">
      <Header lang={lang} />
      <div className="md:mt-16 h-full  py-16 px-4 sm:px-4 lg:px-12  ">
        <SinglePageLayout
          lang={lang}
          buttonTitle={page.home?.heroSection?.buttonText}
        >
          <div className="flex lg:gap-x-32 gap-y-8 flex-col lg:flex-row">
            <div className="">
              <h1 className="font-bold text-3xl sm:mb-16 mb-8">
                {navigation?.aboutQueer}
              </h1>
              <p className="w-full lg:max-w-2xl">
                Text text text Text text text Text text text Text text text Text
                text text Text text text Text text text Text text text Text text
                text Text text text Text text text Text text text Text text text
                Text text text Text text text Text text text Text text text
              </p>
              <p className="w-full mt-4 lg:max-w-2xl">
                Text text text Text text text Text text text Text text text Text
                text text Text text text Text text text Text text text Text text
                text Text text text Text text text Text text text Text text text
                Text text text Text text text Text text text Text text text
              </p>
            </div>
          </div>
          <div className="mt-16">
            <h1 className="font-bold text-3xl sm:mb-16 mb-8">
              {navigation?.aboutQueer}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
            <p className="w-full mt-4 lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div>
          <div></div>
        </SinglePageLayout>
      </div>
      <div className="mt-32 lg:mt-[6rem]">
        <Footer lang={lang} footer={page.footer} />
      </div>
    </div>
  );
}
