import React from 'react';
import LocaleSwitcher from '../header/locale-switcher/locale-switcher';
import Image from 'next/image';
import FacebookIcon from '../../../../public/icons/facebook.svg';
import LinkedIcon from '../../../../public/icons/linkedin.svg';
import YoutubeIcon from '../../../../public/icons/youtube.svg';

type CopyrightProps = {
  datenshutz: string;
};

const CopyRightSection: React.FC<CopyrightProps> = ({ datenshutz }) => {
  return (
    <div className="flex py-8 mb-0 justify-between md:justify-between">
      <div className="hidden md:block">
        <LocaleSwitcher />
      </div>
      <div className="flex w-full mx-4 text-white md:text-black md:mx-0 justify-between md:justify-center items-center">
        &copy; 2023 DINA NRW{' '}
        <span className="mx-2 w-1 h-1 rounded-full bg-white  md:bg-gray-600"></span>{' '}
        AGB
        <span className="mx-2 w-1 h-1 rounded-full bg-white md:bg-gray-600"></span>{' '}
        {datenshutz}
      </div>
      <div className="flex hidden md:visible md:flex justify-between w-24">
        <Image src={FacebookIcon} alt="Facebook Icon" />
        <Image src={LinkedIcon} alt="LinkedIn Icon" />
        <Image src={YoutubeIcon} alt="Youtube Icon" />
      </div>
    </div>
  );
};

export default CopyRightSection;
