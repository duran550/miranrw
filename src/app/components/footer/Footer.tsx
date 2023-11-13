import React from 'react';
import CopyRightSection from './CopyRightSection';
import FacebookIcon from '../../../../public/icons/icons8-facebook.svg';
import InstagramIcon from '../../../../public/icons/icons8-instagram.svg';
import Image from 'next/image';
import AnimateClick from '../animate-click/AnimateClick';

type FooterValues = {
  partners: string;
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
            <ul className="flex my-4 flex-col max-w-xl lg:max-w-3xl lg:flex-row lg:w-full items-start justify-between gap-x-16">
              <li className="w-72">
                <div className="w-fit font-bold">{footer?.contact}</div>
                <div className="w-fit inline-block mt-2">
                  Queeres Netzwerk NRW e.V. Lindenstraße 20 50674 Köln
                </div>
              </li>
              <div className="w-full mb-2 xl:mb-0 md:w-96  h-[1px] bg-gray-800 lg:hidden"></div>
              <li className="w-[24rem]">
                <div className="font-bold">{footer?.spendenkonto}</div>
                <div className="mt-2">IBAN: DE89 3702 0500 0007 0255 01</div>
                <div className="mb-2">BIC: BFSWDE33XXX</div>
              </li>
              <div className="w-full mb-2 lg:mb-0 md:w-96 h-[1.2px] bg-gray-800 lg:hidden"></div>

              <li className="flex font-bold pb-1 lg:items-center flex-col w-[9rem]">
                {footer?.socials}
                <div className="flex mb-3 mt-3 lg:items-center justify-start lg:justify-center ">
                  <AnimateClick>
                    <Image
                      src={FacebookIcon}
                      alt="facebook icon"
                      className=""
                    />
                  </AnimateClick>
                  <AnimateClick>
                    <Image
                      src={InstagramIcon}
                      alt="instagram icon"
                      className=""
                    />
                  </AnimateClick>
                </div>
              </li>
              <div className="w-full md:w-96 h-[1.2px] bg-gray-800 lg:hidden"></div>
            </ul>
          </div>
        </div>
      </div>
      <CopyRightSection lang={lang} copyrightTranslation={footer} />
    </>
  );
};

export default Footer;
