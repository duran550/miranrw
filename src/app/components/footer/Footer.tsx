import React from 'react';
import CopyRightSection from './CopyRightSection';
import FacebookIcon from '../../../../public/icons/icons8-facebook.svg';
import InstagramIcon from '../../../../public/icons/icons8-instagram.svg';
import Image from 'next/image';

type FooterValues = {
  datenschutz: string;
  impressum: string;
  contact: string;
  spendenkonto: string;
  socials: string;
};

type FooterProps = {
  footer: FooterValues;
  lang: string;
};

const Footer: React.FC<FooterProps> = ({ footer, lang }) => {
  return (
    <>
      <div className="flex relative w-full mt-auto left-0 flex-col md:flex-row justify-start md:justify-between text-textColor  md:items-end h d border-t- bg-menuAndFooterColor pt-5 px-4 lg:px-12">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col lg:block">
            <ul className="flex font-bold flex-col max-w-lg lg:flex-row lg:w-full items-start justify-between gap-x-16">
              <li>{footer?.contact}</li>
              <div className="w-full mb-2 xl:mb-0 md:w-96 h-[1px] bg-gray-800 xl:hidden"></div>
              <li className="">{footer?.spendenkonto}</li>
              <div className="w-full mb-2 xl:mb-0 md:w-96 h-[1px] bg-gray-800 xl:hidden"></div>

              <li className='flex items-center flex-col'>
                {footer?.socials}
                <div className='flex mb-3 mt-2 items-center justify-center max-lg:hidden'>
                  <Image src={FacebookIcon} alt="facebook icon" className=''/>
                  <Image src={InstagramIcon} alt="instagram icon" className=''/>
                </div>
              </li>
              <div className="w-full md:w-96 h-[1px] bg-gray-800 xl:hidden"></div>
            </ul>
          </div>
        </div>
      </div>
      <CopyRightSection lang={lang} copyrightTranslation={footer} />
    </>
  );
};

export default Footer;
