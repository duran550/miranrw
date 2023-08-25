import React from 'react';
import HeroImage from '../../../../public/images/bgImage.png';
import Image from 'next/image';
import { Button } from '../button/Button';
import Carousel from '../carousel/Carousel';

type valuesHeror = {
  title: string;
  description: string;
  buttonText: string;
};

type HersoSectionProps = {
  heroContent: valuesHeror;
};

const firstSlide = (title: string, description: string, buttonText: string) => {
  return (
    <>
      <Image
        src={HeroImage}
        className={` object-cover absolute left-0 right-0 bottom-0 h-screen -z-10 md:relative md:object-none`}
        alt="Hero Image"
      />
      <div className="flex md:mx-[250px] justify-center relative pt-48 md:pt-0  md:absolute md:top-48 z-10 mx-8 md:mx-8 text-white flex-col">
        <div
          className="font-bold text-4xl
     md:text-6xl"
        >
          {title}
        </div>
        <div className="mt-8 md:text-xl md:max-w-md md:mt-8">{description}</div>
        <Button className="w-48 md:w-48" variant="outline">
          {buttonText}
        </Button>
      </div>
    </>
  );
};

const HeroSection: React.FC<HersoSectionProps> = ({ heroContent }) => {
  const first = firstSlide(
    heroContent.title,
    heroContent.description,
    heroContent.buttonText
  );
  const second = firstSlide(
    heroContent.title,
    heroContent.description,
    heroContent.buttonText
  );
  const third = firstSlide(
    heroContent.title,
    heroContent.description,
    heroContent.buttonText
  );

  const data = [first, second, third];
  return (
    <div className="absolute z-0 md:relative top-0 h-screen md:h-16">
      <Carousel content={data} />
    </div>
  );
};

export default HeroSection;
