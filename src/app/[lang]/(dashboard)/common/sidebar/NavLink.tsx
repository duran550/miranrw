'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode } from 'react';

type NavLinkProps = {
  name: string;
  href: string;
  icon?: ReactNode;
  targetSegment?: string | null;
  lang: string;
};

const NavLink: React.FC<NavLinkProps> = ({
  name,
  href,
  icon,
  targetSegment,
  lang,
}) => {
  const activeSegment = useSelectedLayoutSegment();

  console.log(activeSegment, 'this is my active segment');

  return (
    <Link
      key={name}
      href={href}
      className={clsx(
        `flex py-2 ${
          (activeSegment === targetSegment && 'hover:bg-primary text-white') ||
          'hover:bg-gray-50 hover:text-primary'
        } my-1 grow items-center sm:justify-center gap-2 rounded-md   p-4 text-sm font-medium   lg:flex-none lg:justify-start md:p-2 lg:px-3 px-3`,
        {
          'bg-primary text-white hover:text-white  cursor-default':
            activeSegment === targetSegment,
        }
      )}
    >
      {icon}
      <p className="sm:hidden lg:block">{name}</p>
    </Link>
  );
};

export default NavLink;
