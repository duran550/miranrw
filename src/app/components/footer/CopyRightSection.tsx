import Link from 'next/link';
import React from 'react';

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
    <div className="lg:py-6 flex flex-col-reverse xl:flex-col lg:flex lg:px-12 bg-menuAndFooterColor lg:border-t-8 border-dividerColor lg:justify-between lg:items-center xl:items-center text-textColor xl:justify-between">
      <div className="flex mx-4 mt-4 lg:mt-0 lg:mx-0 gap-x-6">
        <div>Logo</div>
        <div>Logo</div>
        <div>Logo</div>
      </div>
      <div className="flex font-bold space-y-2 lg:space-y-0 flex-col mx-4 lg:mx-0 lg:flex-row max-w-lg lg:items-center justify-between gap-x-8">
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
