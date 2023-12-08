import CookieConsent from '@/app/components/banners/CookieConsent';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/header';
import SinglePageLayout from '@/app/components/layout/SinglePageLayout';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import img1 from '../../../../public/images/VERWEISBERATUNG Illu Image.png'
import img2 from '../../../../public/images/AKTUELLES Illu Image.png';
import Image from 'next/image';

export default async function aboutUs({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, navigation } = await getDictionary(lang);

  return (
    <div className="w-full overflow-hidden">
      <Header lang={lang} />
      {/* <div className="md:mt-16 h-full  py-16 px-4 sm:px-4 lg:px-12"> */}
      <div className="">
        <SinglePageLayout
          lang={lang}
          buttonTitle={page.home?.heroSection?.buttonText}
        >
          {/* <div className="flex lg:gap-x-32 sm:gap-y-8  flex-col lg:flex-row">
            <div className="">
              <h1 className="font-bold text-3xl sm:mb-16 mb-6">
                {navigation?.aboutUs.title}
              </h1>

              <p className="w-full lg:max-w-2xl">
                Taxt text text Text text text Text text text Text text text Text
                text text Text text text Text text text Text text text Text text
                text Text text text Text text text Text text text Text text text
                Text text text Text text text Text text text Text text text
              </p>
            </div>
          </div> */}

          <div className=" px-4 md:px-0  md:ml-[12%] lg:mt-14 mt-4">
            <h1 className="lg:text-4xl md:text-3xl text-2xl mb-3 w-auto md:w-5/12">
              {page.about.block1.title1}
            </h1>
            <p className="md:text-xl text-base md:w-8/12 w-auto">
              {page.about.block1.p}
            </p>
          </div>
          <div className="w-[100vw] md:pl-[12%]  pl-4 md:px-0 md:flex py-5 md:py-0 my-14 bg-[#EDECF3] box-border pr-2 block">
            <div className="md:w-auto w-full md:ml-14 md:mb-0 mb-8 md:pr-3 	">
              <Image
                src={img1}
                alt=""
                className="md:h-[80%] md:mt-[10%]  w-[100%] md:w-auto  "
              />
            </div>
            <div className="md:w-8/12 w-full md:py-5 md:ml-11">
              <p className="mb-3 text-2xl md:text-3xl ">
                {page.about.block2.title}
              </p>
              <p className="md:text-xl text-base w-full lg:w-7/12">
                {page.about.block2.p}
              </p>
            </div>
          </div>

          <div className="w-[100vw] md:pl-[12%]  pl-4 md:px-0 md:flex pt-5 md:py-0 my-14  box-border pr-2 block ">
            <div className="md:w-[30%] w-full md:pt-5 text-justify	 ">
              <p className="mb-3 text-2xl md:text-3xl ">
                {page.about.block3.title}
              </p>
              <p className="md:text-xl text-base ">{page.about.block3.p}</p>
            </div>
            <div className="md:w-6/12 w-full md:pr-3 md:ml-7 ">
              <Image
                src={img2}
                alt=""
                className="h-[100%]   w-[100%] md:w-auto  "
              />
            </div>
          </div>
          {/* <div className="mt-16" id="referalCounseling">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.referalCounseling}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div> */}
          {/* <div className="mt-16" id="news">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.news}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div> */}

          {/* <div className="mt-16" id="publications">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.publications}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div> */}
          {/* <div className="mt-16" id="team">
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
          </div> */}

          {/* <div className="mt-16" id="team">
            <h1 className="font-bold text-3xl sm:mb-16 mb-6">
              {navigation?.aboutUs?.partners}
            </h1>
          </div> */}
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
