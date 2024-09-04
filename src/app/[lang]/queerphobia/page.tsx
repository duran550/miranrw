import CookieConsent from '@/app/components/banners/CookieConsent';
import Faq from '@/app/components/faq/Faq';
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
      <div>
        <SinglePageLayout
          lang={lang}
          buttonTitle={page.home?.heroSection?.buttonText}
        >
          <div className='2xl:w-[1335px] 2xl:mx-auto'>
            <div className="flex lg:gap-x-32 gap-y-8 flex-col lg:flex-row">
              <div className="">
                <div className="2xl:ml-0 md:w-9/12 px-4 md:px-0  md:ml-[12%] lg:mt-14 mt-4">
                  <h1 className="lg:text-4xl md:text-3xl text-2xl mb-3 w-auto md:w-5/12">
                    {navigation?.aboutQueer?.firstSubmenu}
                  </h1>
                  <p className="lg:text-xl sm:text-base text-sm md:w-8/12 w-auto">
                    Text text text Text text text Text text text Text text text
                    Text text text Text text text Text text text Text text text
                    Text text text Text text text Text text text Text text text
                    Text text text Text text text Text text text Text text text
                    Text text text
                  </p>
                </div>
              </div>
            </div>
            <div className="flex lg:gap-x-32 gap-y-8 flex-col lg:flex-row 2xl:px-0 md:px-[12%] justify-end">
              <div className=" px-4 md:px-0   lg:mt-14 mt-4">
                {' '}
                <h1 id="iNeedHelp" className="font-bold text-3xl sm:mb-16 mb-8">
                  {navigation?.aboutQueer.secondSubmenu}
                </h1>
                <p className="w-full lg:max-w-2xl">
                  Text text text Text text text Text text text Text text text
                  Text text text Text text text Text text text Text text text
                  Text text text Text text text Text text text Text text text
                  Text text text Text text text Text text text Text text text
                  Text text text
                </p>
                <p className="w-full mt-4 lg:max-w-2xl">
                  Text text text Text text text Text text text Text text text
                  Text text text Text text text Text text text Text text text
                  Text text text Text text text Text text text Text text text
                  Text text text Text text text Text text text Text text text
                  Text text text
                </p>
              </div>
            </div>
            <div className="flex lg:gap-x-32 gap-y-8 flex-col lg:flex-row">
              <div className="md:w-9/12 px-4 2xl:ml-0 md:px-0  md:ml-[12%] lg:mt-14 mt-4">
                {' '}
                <h1 id="glossary" className="font-bold text-3xl sm:mb-16 mb-8">
                  {navigation?.aboutQueer.thirdSubmenu}
                </h1>
                <div className="w-full lg:max-w-2xl">
                  <Faq
                    title={page?.aboutQueer?.glossary?.glossary1.title}
                    faqs={page?.aboutQueer?.glossary?.glossary1.glossaryArray}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Glossary section */}

          {/* <div className="mt-16"></div> */}
        </SinglePageLayout>
      </div>
      <div className="mt-32 lg:mt-[6rem]">
        <Footer lang={lang} footer={page.footer} />
      </div>
      <CookieConsent
        lang={lang}
        cookieConsentTranslation={page?.cookiesConsent}
      />
    </div>
  );
}
