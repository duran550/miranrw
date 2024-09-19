'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

type NavLinkProps = {
  name: string;
  href: string;
  icon?: ReactNode;
  targetSegment?: string | null;
};

const NavLink: React.FC<NavLinkProps> = ({
  name,
  href,
  icon,
  targetSegment,
}) => {
  const activeSegment = useSelectedLayoutSegment();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link
      key={name}
      href={href}
      className={clsx(
        `flex py-2 ${
          (isClient &&
            activeSegment === targetSegment &&
            'hover:bg-primary text-white') ||
          'hover:bg-gray-50 hover:text-primary'
        } my-1 grow items-center sm:justify-center gap-2 rounded-md p-4 text-sm font-medium lg:flex-none lg:justify-start md:p-2 xl:px-3 px-3`,
        {
          'bg-primary text-white hover:text-white cursor-default':
            isClient && activeSegment === targetSegment,
        }
      )}
    >
      {icon}
      <p className="sm:hidden lg:block">{name}</p>
    </Link>
  );
};

export default NavLink;
