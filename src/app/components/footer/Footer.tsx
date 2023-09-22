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
    <div className="flex relative w-full bottom-0 sleft-0 flex-col md:flex-row justify-start md:justify-between text-white   md:items-end h d border-t-2 bg-primaryColor py-5 px-8 ">
      <div className="flex flex-col space-y-2">
        <div className="">
          <ul>
            <li>Addresse</li>
            <li>impressum</li>
            <li>kontakt</li>
            <li>Datenschutz</li>
          </ul>
        </div>
      </div>
      {/* <CopyRightSection datenshutz={footer?.datenschutz} /> */}
    </div>
  );
};

export default Footer;
