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
    <div className="lg:py-6 lg:space-x-16 flex flex-col-reverse xl:flex-row lg:flex lg:px-12 bg-menuAndFooterColor lg:border-t-8 border-dividerColor lg:justify-between lg:items-center xl:items-center text-textColor xl:justify-between">
      <div className="flex w-fit flex-col space-y-8 py-4 lg:my-0 lg:flex-row  mx-4 mt-4 lg:mt-0 lg:mx-0 gap-x-8">
        <Image className="xl:w-48 w-48" src={QNWLogo} alt="QNW Logo" />
        <Image className="xl:w-48 w-48" src={NGVTLogo} alt="NGVT Logo" />
        <Image className="xl:w-48 w-48" src={RubikonLogo} alt="Rubikon Logo" />
        <Image className="xl:w-48 w-48" src={LSVDLogo} alt="LSVD Logo" />
        <Image
          className="xl:w-96  w-[20rem]"
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
