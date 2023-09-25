import Link from 'next/link';
import React, { ReactNode } from 'react';

type NavItemProps = {
  children: ReactNode;
  href: string;
};
const NavItem: React.FC<NavItemProps> = ({ children, href }) => {
  return (
    <Link
      className="my-1 py-1 px-3 rounded-md hover:text-white duration-100 hover:bg-indigo-800 transition ease-in-out hover:transition hover:duration-100 hover:ease-in-out hover:rounded-md hover:px-3 hover:py-1"
      href={`${href}`}
    >
      {children}
    </Link>
  );
};

export default NavItem;
