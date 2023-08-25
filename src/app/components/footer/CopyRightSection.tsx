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
    <div className="flex items-center justify-between md:justify-between">
      <div className="hidden md:block">
        <LocaleSwitcher />
      </div>
      <div className="flex w-full  text-black md:text-black md:mx-0 justify-between md:justify-center items-start">
        &copy; 2023 MIQ NRW{' '}
        {datenshutz}
      </div>
  
    </div>
  );
};

export default CopyRightSection;
