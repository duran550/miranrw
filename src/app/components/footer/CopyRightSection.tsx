import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RubikonLogo from '../../../../public/images/secondImage.png';
import NGVTLogo from '../../../../public/images/fourthImg.svg';
import LSVDLogo from '../../../../public/images/thirdImg.svg';
import MinisteriumLogo from '../../../../public/images/firstImg.png';
import QNWLogo from '../../../../public/images/fifthLogo.svg';

type CopyrightProps = {
  copyrightTranslation: {
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
    <div className="lg:py-6 lg:space-x-16  flex flex-col-reverse xl:flex-row lg:flex lg:px-12 bg-menuAndFooterColor lg:border-t-8 border-dividerColor lg:justify-between lg:items-center xl:items-center text-textColor xl:justify-between">
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
            className="sm:w-32 lg:w-64 w-32 m-0 border"
            src={RubikonLogo}
            alt="Rubikon Logo"
          />
        </Link>
        <Link href="https://nrw.lsvd.de/" target="_blank">
          <Image
            className="sm:w-32 lg:w-40 w-32 m-0 border"
            src={LSVDLogo}
            alt="LSVD Logo"
          />
        </Link>

        <Image
          className="sm:w-45  w-[20rem] border"
          src={MinisteriumLogo}
          alt="Ministerium Logo"
        />
      </div>
      <div className="flex font-bold space-y-2 lg:space-y-0 flex-col px-4 lg:mx-0 lg:flex-row w-full lg:w-[18rem] lg:items-center justify-between lg:gap-x-8">
        <Link href={`/${lang}/datenschutz`}>
          {copyrightTranslation?.datenschutz}
        </Link>
        <Link href={`/${lang}/impressum`}>
          {copyrightTranslation?.impressum}
        </Link>
      </div>
    </div>
  );
};

export default CopyRightSection;
