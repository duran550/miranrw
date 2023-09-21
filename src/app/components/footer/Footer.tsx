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
    <div className="flex mt-4 left-0 flex-col md:flex-row justify-start md:justify-between   md:items-end h d border-t-2 bg-secondaryColorSlate py-5 px-12 ">
      <div className="flex flex-col space-y-2">
        <Link href={'/'} className="w-fit block">
          <Image className="w-40" src={Logo} alt="Logo" />
        </Link>
        <div className="">
          <ul>
            <li>Address</li>
            <li>impressum</li>
            <li>kontakt</li>
            <li>Datenschtz</li>
          </ul>
        </div>
      </div>
      <CopyRightSection datenshutz={footer?.datenschutz} />
    </div>
  );
};

export default Footer;
