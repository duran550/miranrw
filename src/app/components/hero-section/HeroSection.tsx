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
      <div className="px-6 lg:px-12 my-12    ">
        {/* text-content */}
        <div className="flex flex-col lg:flex-row lg:gap-x-10 justify-between w-full lg:items-center pb:8 lg:pb-0">
          <div className=" lg:max-w-2xl lg:ml-16">
            <h2 className="font-bold text-3xl  lg:text-4xl">MIQ</h2>
            <div className="pt-4">
              <h1 className="font-bold text-xl lg:text-4xl">{content.title}</h1>
              <p className="mt-2 w-fit lg:mt-8 max-w-sm lg:max-w-xl">
                {content?.description?.firstParagraph}
              </p>
              <p className="mt-2 pt-1 w-fit max-w-sm lg:max-w-xl">
                {content?.description?.secondParagraph}
              </p>
            </div>
            <Button
              href={`/${lang}/report`}
              className=" w-full sm:w-fit lg:w-[20rem] bg-primaryColor text-white font-bold rounded-full text-lg"
            >
              {content.buttonText}
            </Button>
          </div>

          <iframe
            src="https://wwwcom/embed/9zWPJR2u01w?si=iUdQY2YiqrJGzSOX"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full lg:max-w-4xl lg:mr-0 h-[20rem]  lg:h-[25rem] mt-8"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
