import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/header';
import SinglePageLayout from '@/app/components/layout/SinglePageLayout';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function aboutUs({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, navigation } = await getDictionary(lang);

  return (
    <div className="">
      <Header lang={lang} />
      <div className="md:mt-16 h-full  py-16 px-4 sm:px-4 lg:px-12">
        <SinglePageLayout
          lang={lang}
          buttonTitle={page.home?.heroSection?.buttonText}
        >
          <div className="flex lg:gap-x-32 sm:gap-y-8  flex-col lg:flex-row">
            <div className="">
              <h1 className="font-bold text-3xl sm:mb-16 mb-6">
                {navigation?.aboutUs.title}
              </h1>
              <p className="w-full lg:max-w-2xl">
                Text text text Text text text Text text text Text text text Text
                text text Text text text Text text text Text text text Text text
                text Text text text Text text text Text text text Text text text
                Text text text Text text text Text text text Text text text
              </p>
            </div>
          </div>
          <div className="mt-16" id="referalCounseling">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.referalCounseling}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div>
          <div className="mt-16" id="news">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.news}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div>

          <div className="mt-16" id="publications">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.publications}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div>
          <div className="mt-16" id="team">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.team}
            </h1>
            <div className="grid grid-cols-4 gap-x-2 w-4/6 pb-6 hidden sm:block"></div>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div>

          <div className="mt-16" id="team">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.partners}
            </h1>
          </div>
        </SinglePageLayout>
      </div>
      <div className="mt-32 lg:mt-[6rem]">
        <Footer lang={lang} footer={page.footer} />
      </div>
    </div>
  );
}
