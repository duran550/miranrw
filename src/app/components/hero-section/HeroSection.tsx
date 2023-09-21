import React from 'react';
import Image from 'next/image';
import graphic from '../../../../public/images/people-working-together-online.svg';
import { Button } from '../button/Button';

type heroSectionPropsValuesType = {
  title: string;
  description: string;
  buttonText: string;
};

type heroSectionPropsType = {
  content: heroSectionPropsValuesType;
  lang: string;
};

const HeroSection: React.FC<heroSectionPropsType> = ({ lang, content }) => {
  return (
    <>
      <div className="px-8   md:px-12 mt-32 h-[58vh]    ">
        {/* text-content */}
        <div className="flex justify-between w-full  items-center">
          <div>
            <h2 className="font-bold text-lg md:text-2xl lg:text-5xl">MIQ</h2>
            <div className="pt-4">
              <h1 className="font-bold text-3xl  md:text-4xl lg:text-6xl">
                {content.title}{' '}
              </h1>
              <p className="font-bold mt-2 w-fit max-w-sm">
                {content.description}
              </p>
            </div>
            <Button
              href={`/${lang}/melden`}
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
