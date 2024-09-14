import React from 'react';
import { Button } from '../button/Button';
import Image from 'next/image';
import videoPlaceholder from '../../../../public/images/videoPlaceholder.png';
import MeldungIcon from '../../../../public/icons/meldungIcon.svg';
import Link from 'next/link';

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
      <div className="2xl:w-[1325px] 2xl:px-0 2xl:mx-auto px-6 lg:px-12z-0 py-12">
        {/* text-content */}
        <div className="flex flex-col-reverse lg:flex-row lg:gap-x-10 justify-between w-full lg:items-center pb:8 lg:pb-0">
          <div className=" lg:max-w-2xl">
            <div className="pt-4">
              <h1 className="font-bold text-2xl lg:text-4xl">
                {content.title}
              </h1>
              <p className="w-fit mt-4 lg:mt-8 max-w-sm lg:max-w-xl">
                {content?.description?.firstParagraph}
              </p>
              <p className="mt-2 pt-1 w-fit max-w-sm lg:max-w-xl">
                {content?.description?.secondParagraph}
              </p>
            </div>

            <div className="mt-8 w-full space-x-4 flex items-center">
              <Link href={`/${lang}/report`}>
                <Image className="w-24 " src={MeldungIcon} alt="Meldung icon" />
              </Link>
              <Button
                href={`/${lang}/report`}
                className=" w-full md:w-fit lg:w-[20rem] bg-primaryColor text-white font-bold text-lg"
              >
                {content.buttonText}
              </Button>
            </div>
          </div>

          <Image
            className="w-full mb-8 xl:mb-0 xl:w-6/12 lg:h-[25rem] object-cover"
            src={videoPlaceholder}
            alt="video"
          />

          {/* <iframe
            src="https://wwwcom/embed/9zWPJR2u01w?si=iUdQY2YiqrJGzSOX"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full lg:max-w-4xl lg:mr-0 h-[20rem]  lg:h-[25rem] mt-8"
          ></iframe> */}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
