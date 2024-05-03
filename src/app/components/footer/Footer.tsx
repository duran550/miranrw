import React from 'react';
import CopyRightSection from './CopyRightSection';
import FacebookIcon from '../../../../public/images/Vector (1).svg';
import InstagramIcon from '../../../../public/images/Vector.svg';
import ligne from '../../../../public/images/Frame 1.png';
import Image from 'next/image';
import Link from 'next/link';

type FooterValues = {
  partners: string;
  datenschutz: string;
  impressum: string;
  contact: string;
  spendenkonto: string;
  socials: string;
  block1: {
    title: string;
  };
  block2: {
    title: string;
  };
};

type FooterProps = {
  footer: FooterValues;
  lang: string;
};

const Footer: React.FC<FooterProps> = ({ footer, lang }) => {
  return (
    <>
      <Image src={ligne} alt="" className="w-full h-3" />
      <div className="w-full bg-[#463880] md:flex block md:px-4 px-2 lg:px-16 py-14 md:justify-between text-white	">
        <div className="	 md:mb-0 mb-12">
          <p className="font-bold text-lg">{footer.block1.title}</p>
          <ul className="font-bold">
            <li>LindenstaBe 20,50674 köln</li>
            <li>+49 (0)221-3565650</li>
            <li>info@aueeres-netzwerk.nrw</li>
          </ul>
        </div>
        <div className=" md:mb-0 mb-12">
          <p className="font-bold text-lg ">{footer.block2.title}</p>
          <ul className="font-bold">
            <li>IBAN: DE89 3702 0500 0007 0255 01</li>
            <li>BIC: BFSWDE33XXX</li>
          </ul>
        </div>

        <div className=" flex  md:pt-7">
          <a target="_blank" href="https://www.facebook.com/">
            <Image src={FacebookIcon} alt="" className="h-8 w-8 text-withe  " />
          </a>
          <a target="_blank" className="ml-2" href="https://www.instagram.com/">
            <Image src={InstagramIcon} alt="" className="h-8 w-8 text-withe" />
          </a>
        </div>
      </div>

      <CopyRightSection lang={lang} copyrightTranslation={footer} />
      <div className="bg-black w-full py-5">
        <p className="text-center	text-white font-bold ">
          {footer.block1.title +
            ' | ' +
            footer.impressum +
            ' | ' +
            footer.datenschutz}
        </p>
      </div>
    </>
  );
};

export default Footer;
