'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type NavLinkProps = {
  name: string;
  href: string;
  icon?: ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ name, href, icon }) => {
  const pathname = usePathname();

  return (
    <Link
      key={name}
      href={href}
      className={clsx(
        `flex h-[48px] ${
          (pathname === href && 'hover:bg-primary text-white') ||
          'hover:bg-gray-50 hover:text-primary'
        } hover: my-1 grow items-center justify-center gap-2 rounded-md   p-4 text-sm font-medium   md:flex-none md:justify-start md:p-2 md:px-3`,
        {
          'bg-primary text-white hover:text-white': pathname === `${href}`,
        }
      )}
    >
      {icon}
      <p className="hidden md:block">{name}</p>
    </Link>
  );
};

export default NavLink;
