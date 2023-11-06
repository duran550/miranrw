import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RubikonLogo from '../../../../public/images/secondImage.png';
import NGVTLogo from '../../../../public/images/fourthImg.svg';
import LSVDLogo from '../../../../public/images/thirdImg.svg';
import MinisteriumLogo from '../../../../public/images/ministerium.svg';
import QNWLogo from '../../../../public/images/fifthLogo.svg';

type CopyrightProps = {
  copyrightTranslation: {
    partners: string;
    datenschutz: string;
    impressum: string;
    contact: string;
    spendenkonto: string;
    socials: string;
  };
  lang: string;
};

const CopyRightSection: React.FC<CopyrightProps> = ({
  copyrightTranslation,
  lang,
}) => {
  return (
    <div className="bg-menuAndFooterColor lg:border-t-8  lg:px-12  lg:py-6 border-dividerColor">
      <h1 className="font-bold text-xl px-4 hidden lg:block lg:px-0 py-4">
        {copyrightTranslation?.partners}
      </h1>
      <div className=" lg:space-x-16  flex flex-col-reverse xl:flex-row lg:flex  lg:justify-between lg:items-center xl:items-center text-textColor xl:justify-between">
        <div className="flex flex-wrap items-center space-y-4 space-x-6 mt-4 px-4">
          <Link target="_blank" href="https://queeres-netzwerk.nrw/ ">
            <Image
              className="sm:w-32 lg:w-40 w-32 m-0"
              src={QNWLogo}
              alt="QNW Logo"
            />
          </Link>
          <Link href="https://ngvt.nrw/" target="_blank">
            <Image
              className="sm:w-32 lg:w-40 w-32 m-0 max-sm:max-h-14"
              src={NGVTLogo}
              alt="NGVT Logo"
            />
          </Link>

          <Link target="_blank" href="https://rubicon-koeln.de/">
            <Image
              className="sm:w-32 lg:w-64 w-32 m-0"
              src={RubikonLogo}
              alt="Rubikon Logo"
            />
          </Link>
          <Link href="https://nrw.lsvd.de/" target="_blank">
            <Image
              className="sm:w-32 lg:w-40 w-32 m-0"
              src={LSVDLogo}
              alt="LSVD Logo"
            />
          </Link>

          <Image
            className="sm:w-45  w-[20rem] "
            src={MinisteriumLogo}
            alt="Ministerium Logo"
          />
        </div>
        <h1 className="font-bold lg:hidden text-xl px-4 lg:px-0 py-8">
          {copyrightTranslation?.partners}
        </h1>
        <div className="flex font-bold space-y-2 lg:space-y-0 flex-col px-4 lg:mx-0 lg:flex-row w-full lg:w-[18rem] lg:items-center justify-between lg:gap-x-8">
          <Link href={`/${lang}/datenschutz`}>
            {copyrightTranslation?.datenschutz}
          </Link>
          <Link href={`/${lang}/impressum`}>
            {copyrightTranslation?.impressum}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CopyRightSection;
