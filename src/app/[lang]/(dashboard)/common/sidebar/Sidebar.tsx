'use client'
import React from 'react';
import NavLink from './NavLink';
import { adminLinks, viewerLinks,cleanerLinks,riskManagerLinks } from './links';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';

const Sidebar = () => {
  const {user }=useAuth()
  return (
    <div className="w-1/6 sticky top-0 border-r-2 h-screen px-8">
      <div>
        <Image src={''} alt="Logo" />
      </div>
      <div className="my-24">
        {user &&
          user.role == 1 &&
          adminLinks?.map((nav) => (
            <NavLink key={nav.name} href={nav.href} name={nav.name} />
          ))}
        {user &&
          user.role == 2 &&
          viewerLinks?.map((nav: any) => (
            <NavLink key={nav.name} href={nav.href} name={nav.name} />
          ))}
        {user &&
          user.role == 3 &&
          cleanerLinks?.map((nav) => (
            <NavLink key={nav.name} href={nav.href} name={nav.name} />
          ))}
        {user &&
          user.role == 4 &&
          riskManagerLinks?.map((nav:any) => (
            <NavLink key={nav.name} href={nav.href} name={nav.name} />
          ))}
      </div>

      <div className="absolute bottom-12">Logout</div>
    </div>
  );
};

export default Sidebar;
