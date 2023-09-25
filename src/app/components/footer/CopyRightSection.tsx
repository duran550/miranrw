import Link from 'next/link';
import React from 'react';

type CopyrightProps = {
  datenshutz: string;
};

const CopyRightSection: React.FC<CopyrightProps> = ({ datenshutz }) => {
  return (
    <div className="hidden lg:py-6 lg:flex lg:px-12 bg-primaryColor lg:border-t-2 border-white lg:justify-between lg:items-center items-center text-white justify-between">
      <div className="flex gap-x-6">
        <div>Logo</div>
        <div>Logo</div>
        <div>Logo</div>
      </div>
      <div className="flex max-w-lg items-center justify-between gap-x-8">
        <Link href="/datenschutz">Datenschutz</Link>
        <Link href="/impressum">Impressum</Link>
      </div>
    </div>
  );
};

export default CopyRightSection;
