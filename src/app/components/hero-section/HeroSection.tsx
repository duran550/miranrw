import React from 'react';
import { Button } from '../button/Button';

type heroSectionPropsValuesType = {
  title: string;
  description: { firstParagraph: string; secondParagraph: string };
  buttonText: string;
};

type heroSectionPropsType = {
  content: heroSectionPropsValuesType;
  lang: string;
};

const HeroSection: React.FC<heroSectionPropsType> = ({ lang, content }) => {
  return (
    <>
      <div className="px-6 lg:px-12 md:my-12 max-sm:my-5">
        {/* text-content */}
        <div className="flex flex-col max-sm:gap-y-5 gap-y-16 lg:flex-row justify-between w-full lg:items-center lg:pb-0">
          <div className="flex flex-col gap-y-5 sm:gap-y-10 lg:max-w-2xl">
            <div className="">
              <h2 className="font-bold text-3xl  sm:text-4xl m-0">MIQ</h2>
              <h1 className="font-bold text-xl sm:text-3xl m-0">
                {content.title}{' '}
              </h1>
            </div>
            <div className="grid gap-y-2 text-sm sm:text-xl">
              <p className=" w-fit max-w-sm md:max-w-xl m-0">
                {content?.description?.firstParagraph}
              </p>
              <p className="w-fit max-w-sm md:max-w-xl m-0">
                {content?.description?.secondParagraph}
              </p>
            </div>
            <Button
              href={`/${lang}/report`}
              className="sm:w-2/5 lg:w-[20rem] bg-primaryColor text-white font-bold rounded-full text-sm sm:text-lg m-0"
            >
              {content.buttonText}
            </Button>
          </div>

          <div className="hidden">
            <h1 className="font-bold underline text-xl mt-8 mb-4">
              Über Queerfeindlichkeit
            </h1>
            <p>
              Text text text Text text text Text text text Text text text Text
              text text Text text text Text text text Text text text Text text
              text Text text text Text text text Text text text Text text text
              Text text text Text text text Text text text Text text text
            </p>
          </div>

          <iframe
            src="https://wwwcom/embed/9zWPJR2u01w?si=iUdQY2YiqrJGzSOX"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full md:w-3/5 md:h-[18rem] lg:max-w-xl lg:mr-24  lg:h-[22rem]"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
