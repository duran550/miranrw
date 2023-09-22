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
      <div className="px-6 md:px-12 mt-12 h-[58vh]    ">
        {/* text-content */}
        <div className="flex justify-between w-full  items-center">
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
        </div>
      </div>
    </>
  );
};

export default HeroSection;
