import React from 'react';
import NavLink from './NavLink';
import { adminLinks } from './links';
import Image from 'next/image';

const Sidebar = () => {
  return (
    <div className="w-1/6 sticky top-0 border-r-2 h-screen px-8">
      <div>
        <Image src={''} alt="Logo" />
      </div>
      <div className="my-24">
        {adminLinks?.map((nav) => (
          <NavLink key={nav.name} href={nav.href} name={nav.name} />
        ))}
      </div>

      <div className="absolute bottom-12">Logout</div>
    </div>
  );
};

export default Sidebar;
