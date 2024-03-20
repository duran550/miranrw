import Link from 'next/link';
import React from 'react';

import BackIcon from '../../../../../../../public/icons/dashboard/backIcon.svg';
import Image from 'next/image';

type HeaderProps = {
  title: string;
  href: string;
};

const Header: React.FC<HeaderProps> = ({ href, title }) => {
  return (
    <div className="my-8">
      <h1 className="font-bold text-2xl mb-6">{title}</h1>
      <Link className="flex items-center gap-x-2" href={href}>
        <Image src={BackIcon} alt="Back icon" />
        <h1>{'Go Back'}</h1>
      </Link>
    </div>
  );
};

export default Header;
