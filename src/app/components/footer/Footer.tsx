import React from 'react';
import CopyRightSection from './CopyRightSection';

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
      <div className="flex relative w-full mt-auto md:mt-32 xl:mt-16 left-0 flex-col md:flex-row justify-start md:justify-between text-textColor   md:items-end h d border-t- bg-menuAndFooterColor py-5 px-4 lg:px-12">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col lg:block">
            <ul className="flex font-bold flex-col max-w-lg lg:w-full items-start justify-between gap-x-16 h-24 ">
              <li>{footer?.contact}</li>
              <div className="w-full mb-2 xl:mb-0 md:w-96 h-[1px] bg-gray-800 xl:hidden"></div>
              <li className="">{footer?.spendenkonto}</li>
              <div className="w-full mb-2 xl:mb-0 md:w-96 h-[1px] bg-gray-800 xl:hidden"></div>

              <li>{footer?.socials}</li>
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
