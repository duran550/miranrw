'use client';
import React from 'react';
import NavLink from './NavLink';
import {
  adminLinks,
  viewerLinks,
  cleanerLinks,
  riskManagerLinks,
} from './links';
import Logo from '../../../../../../public/logo.svg';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import LogoutIcon from './icons/LogoutIcon';
import { useAuth } from '@/app/hooks/useAuth';
import { removeUserCookies } from '@/cookies/cookies';
import logo from '../../../../../../public/logo.svg';

const Sidebar = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    console.log('clicked');
    removeUserCookies();
    push('/login');
  };

  return (
    <div className="w-1/6 sticky top-0 border-r-2 h-screen px-8">
      <div className="mt-8">
        <Image src={Logo} alt="Logo" />
      </div>
      <div className="my-24">
        {user &&
          user.role == 1 &&
          adminLinks?.map((nav) => (
            <NavLink
              icon={<nav.icon isActive={pathname === nav.href} />}
              key={nav.name}
              href={nav.href}
              name={nav.name}
            />
          ))}
        {user &&
          user.role == 2 &&
          viewerLinks?.map((nav: any) => (
            <NavLink
              icon={<nav.icon isActive={pathname === nav.href} />}
              key={nav.name}
              href={nav.href}
              name={nav.name}
            />
          ))}
        {user &&
          user.role == 3 &&
          cleanerLinks?.map((nav) => (
            <NavLink
              icon={<nav.icon isActive={pathname === nav.href} />}
              key={nav.name}
              href={nav.href}
              name={nav.name}
            />
          ))}
        {user &&
          user.role == 4 &&
          riskManagerLinks?.map((nav: any) => (
            <NavLink
              icon={<nav.icon isActive={pathname === nav.href} />}
              key={nav.name}
              href={nav.href}
              name={nav.name}
            />
          ))}
      </div>

      <div
        onClick={handleLogout}
        className="absolute cursor-pointer hover:text-primary flex items-center gap-x-2 bottom-12"
      >
        <LogoutIcon />
        <div>Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
