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
      <div className="md:mt-16 h-full  py-16 px-4 sm:px-4 lg:px-12  ">
        <SinglePageLayout buttonTitle={page.home?.heroSection?.buttonText}>
          <div className="flex lg:gap-x-32 gap-y-8  flex-col lg:flex-row">
            <div className="">
              <h1 className="font-bold text-3xl mb-16">
                {navigation?.aboutUs.title}
              </h1>
              <p className="w-full lg:max-w-2xl">
                Text text text Text text text Text text text Text text text Text
                text text Text text text Text text text Text text text Text text
                text Text text text Text text text Text text text Text text text
                Text text text Text text text Text text text Text text text
              </p>
            </div>
            <div>
              <iframe
                src="https://www.youtube.com/embed/9zWPJR2u01w?si=iUdQY2YiqrJGzSOX"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full lg:w-[40rem] lg:mr-24  lg:h-[20rem] mt-8"
              ></iframe>
            </div>
          </div>
          <div className="mt-16" id="referalCounseling">
            <h1 className="font-bold text-3xl mb-16">
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
            <h1 className="font-bold text-3xl mb-16">
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
            <h1 className="font-bold text-3xl mb-16">
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
            <h1 className="font-bold text-3xl mb-16">
              {navigation?.aboutUs?.team}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div>

          <div className="mt-16" id="team">
            <h1 className="font-bold text-3xl mb-16">
              {navigation?.aboutUs?.partners}
            </h1>
            <p className="w-full lg:max-w-2xl">
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div>
        </SinglePageLayout>
      </div>
      <div className="mt-32 lg:mt-[6rem]">
        <Footer footer={page.footer} />
      </div>
    </div>
  );
}
