'use client';
import React from 'react';
import NavLink from './NavLink';
import { adminLinks } from './links';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LogoutIcon from './icons/LogoutIcon';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-1/6 sticky top-0 border-r-2 h-screen px-8">
      <div>
        <Image src={''} alt="Logo" />
      </div>
      <div className="my-24">
        {adminLinks?.map((nav) => (
          <NavLink
            icon={<nav.icon isActive={pathname === nav.href} />}
            key={nav.name}
            href={nav.href}
            name={nav.name}
          />
        ))}
      </div>

      <div className="absolute cursor-pointer hover:text-primary flex items-center gap-x-2 bottom-12">
        <LogoutIcon />
        <div>Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
