import React from 'react';
import Image from 'next/image';
import graphic from '../../../../public/images/people-working-together-online.svg';
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
      <div className="px-6 md:px-12 my-12    ">
        {/* text-content */}
        <div className="flex flex-col md:flex-row justify-between w-full  items-center">
          <div>
            <h2 className="font-bold text-3xl md:text-2xl lg:text-5xl">MIQ</h2>
            <div className="pt-4">
              <h1 className="font-bold text-xl  md:text-4xl lg:text-6xl">
                {content.title}{' '}
              </h1>
              <p className="mt-2 w-fit max-w-sm">
                {content?.description?.firstParagraph}
              </p>
              <p className="mt-2 pt-1 w-fit max-w-sm">
                {content?.description?.secondParagraph}
              </p>
            </div>
            <Button
              href={`/${lang}/report`}
              className=" w-full sm:w-fit bg-primaryColor text-white font-bold rounded-full text-lg"
            >
              {content.buttonText}
            </Button>
          </div>

          <div>
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
            src="https://www.youtube.com/embed/9zWPJR2u01w?si=iUdQY2YiqrJGzSOX"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full mt-8"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
