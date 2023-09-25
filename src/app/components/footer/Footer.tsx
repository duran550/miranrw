import Link from 'next/link';
import React from 'react';
import CopyRightSection from './CopyRightSection';
import Image from 'next/image';
import Logo from '../../../../public/logo.svg';

type FooterValues = {
  datenschutz: any;
};

type FooterProps = {
  footer: FooterValues;
};

const Footer: React.FC<FooterProps> = ({ footer }) => {
  return (
    <>
      <div className="flex relative w-full mt-auto left-0 flex-col md:flex-row justify-start md:justify-between text-white   md:items-end h d border-t-2 bg-primaryColor py-5 px-8 lg:px-12">
        <div className="flex flex-col space-y-2">
          <div className="lg:hidden">
            <ul>
              <li>Addresse</li>
              <li>impressum</li>
              <li>kontakt</li>
              <li>Datenschutz</li>
            </ul>
          </div>
          <div className="hidden lg:block">
            <ul className="flex items-start justify-between gap-x-16 h-24 ">
              <li>Kontakt</li>
              <li>Spendenkonto</li>
              <li>Socials</li>
            </ul>
          </div>
        </div>
      </div>
      <CopyRightSection datenshutz={footer?.datenschutz} />
    </>
  );
};

export default Footer;
