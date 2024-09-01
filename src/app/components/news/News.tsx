'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Image from 'next/image';

import img2 from '../../../../public/images/AKTUELLES Illu Image.png';

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#463880',
        padding: '0',
        width: '2rem',
        height: '2rem',
        borderRadius: '.5rem',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#463880',
        padding: '0',
        width: '2rem',
        height: '2rem',
        borderRadius: '.5rem',
      }}
      onClick={onClick}
    />
  );
}

type NewsProps = {
  newsTranslation: {
    block3: { title: string; p: string };
  };
};

const News: React.FC<NewsProps> = ({ newsTranslation }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const slide1 = (
    <div className="w-full flex md:flex-row flex-col items-center lg:px-16 box-border pr-2">
      <div className=" w-full lg:max-w-lg md:pt-5 text-justify	 ">
        <p className="mb-3 text-2xl md:text-3xl ">
          {newsTranslation?.block3?.title}
        </p>
        <p className="md:text-xl text-base ">{newsTranslation?.block3?.p}</p>
      </div>
      <div className="w-full mt-8 lg:mt-0 2xl:h-[288px] h-[25vh] md:pr-3 xl:ml-16">
        <Image src={img2} alt="" className=" object-cover h-full w-full" />
      </div>
    </div>
  );

  return (
    <div className="2xl:w-[1035px] 2xl:mx-auto mx-16 ">
      <Slider className="space-x-8 h-fit" {...settings}>
        <div>{slide1}</div>
        <div>{slide1}</div>
        <div>{slide1}</div>
        <div>{slide1}</div>
        <div>{slide1}</div>
        <div>{slide1}</div>
      </Slider>
    </div>
  );
};

export default News;
