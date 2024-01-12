import CookieConsent from '@/app/components/banners/CookieConsent';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/header';
import SinglePageLayout from '@/app/components/layout/SinglePageLayout';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import img1 from '../../../../public/images/VERWEISBERATUNG Illu Image.png';
import Image from 'next/image';
import News from '@/app/components/news/News';

export default async function aboutUs({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="w-full overflow-hidden">
      <Header lang={lang} />
      <div className="">
        <SinglePageLayout
          lang={lang}
          buttonTitle={page.home?.heroSection?.buttonText}
        >
          <div className="md:w-9/12 px-4 md:px-0  md:ml-[12%] lg:mt-14 mt-4">
            <h1 className="lg:text-4xl md:text-3xl text-2xl mb-3 w-auto md:w-5/12">
              {page.about.block1.title1}
            </h1>
            <p className="lg:text-xl sm:text-base text-sm md:w-8/12 w-auto">
              {page.about.block1.p}
            </p>
          </div>
          <div className="w-[100vw] md:pl-[12%]  pl-4  md:flex py-5 md:py-0 my-14 bg-[#EDECF3] box-border pr-2 block">
            <div className="md:w-auto w-full md:ml-8 lg:ml-14 md:mb-0 mb-8 md:pr-3 	">
              <Image
                src={img1}
                alt=""
                className="md:h-full   w-[100%] md:w-auto object-contain	 "
              />
            </div>
            <div className="md:w-8/12 w-full md:py-5 md:ml-11">
              <p className="mb-3 sm:text-2xl text-xl md:text-3xl md:mt-[8%] ">
                {page.about.block2.title}
              </p>
              <p className="lg:text-xl sm:text-base text-sm w-full lg:w-7/12">
                {page.about.block2.p}
              </p>
            </div>
          </div>

          <News newsTranslation={page.about} />
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
