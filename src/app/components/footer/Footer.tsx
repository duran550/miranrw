import Link from 'next/link';
import React from 'react';
import CopyRightSection from './CopyRightSection';
import Image from 'next/image';
import Logo from '../../../../public/logo.png';

type FooterValues = {
  datenschutz: any;
};

type FooterProps = {
  footer: FooterValues;
};

const Footer: React.FC<FooterProps> = ({ footer }) => {
  return (
    <div className="flex border-t-2  border-white md:border-top-0 md:border-none absolute md:absolute w-full px-8 md:px-24 bottom-0 flex-col md:text-gray-800">
      <div className="flex md:flex mt-8 md:mt-0 flex-row-reverse md:flex-row justify-between">
        <Link href={'/'} className="w-fit hidden md:block">
          <Image className="w-12" src={Logo} alt="Logo" />
        </Link>
        <div className="flex hidden md:block md:flex justify-between w-96">
          <ul>
            <li className="font-bold text-lg">Link</li>
            <li>Link</li>
            <li>Link</li>
          </ul>
          <ul>
            <li className="font-bold text-lg">Link</li>
            <li>Link</li>
            <li>Link</li>
          </ul>
          <ul>
            <li className="font-bold text-lg">Link</li>
            <li>Link</li>
            <li>Link</li>
          </ul>
        </div>

        <Link href={'/'} className="w-fit block md:hidden">
          <Image className="w-12" src={Logo} alt="Logo" />
        </Link>
        <div className="text-white md:text-black">
          <div className="text-lg mb-1">Spende</div>
          <div className="text-md">DINA Antiziganismus</div>
          <div className="text-md">DE 1234 5678 9012 3456 7890</div>
        </div>
      </div>
      <CopyRightSection datenshutz={footer?.datenschutz} />
    </div>
  );
};

export default Footer;
