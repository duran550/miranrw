'use client';
import React, { FC, useContext } from 'react';
import NavLink from './NavLink';
import {
  adminLinks,
  viewerLinks,
  cleanerLinks,
  riskManagerLinks,
} from './links';
import Logo from '../../../../../../public/logo.svg';
import Image from 'next/image';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import LogoutIcon from './icons/LogoutIcon';
import { useAuth } from '@/app/hooks/useAuth';
import { removeRefreshToken, removeUserCookies } from '@/cookies/cookies';
import Link from 'next/link';
import { AuthContext } from '@/app/context/AuthContext';

interface SidebarProps {
  lang: string;
}

const Sidebar: FC<SidebarProps> = ({ lang }) => {
  const { isShow, IshowHandler, setReports } = useContext(AuthContext);

  const { push } = useRouter();
  const { user } = useAuth();
  const activeSegment = useSelectedLayoutSegment();

  const handleLogout = () => {
    removeUserCookies();
    push('/login');
    // setReports([]);
  };

  return (
    <div
      className={`sm:w-1/6   flex  sm:relative fixed z-[100] duration-300 ease-linear
      ${!isShow ? 'sm:translate-x-0 -translate-x-full ' : ' translate-x-0 '}
      fixed top-0 border-r-2 h-screen lg:px-8 px-3 overflow-y-auto  flex-col justify-between pb-10 bg-[#F3F3F3]`}
    >
      <div className=" flex flex-col gap-5">
        <div className="mt-8">
          <Link href="/">
            <Image src={Logo} alt="Logo" className='sm:w-auto w-56'/>
          </Link>
        </div>
        {user &&
          user.role == 1 &&
          adminLinks?.map((nav) => (
            <NavLink
              icon={<nav.icon isActive={activeSegment === nav.targetSegment} />}
              key={nav.name}
              href={nav.href}
              name={nav.name}
              targetSegment={nav.targetSegment}
              lang={lang}
            />
          ))}
        {user &&
          user.role == 2 &&
          viewerLinks?.map((nav: any) => (
            <NavLink
              icon={<nav.icon isActive={activeSegment === nav.targetSegment} />}
              key={nav.name}
              href={nav.href}
              name={nav.name}
              targetSegment={nav.targetSegment}
              lang={lang}
            />
          ))}
        {user &&
          user.role == 3 &&
          cleanerLinks?.map((nav) => (
            <NavLink
              icon={<nav.icon isActive={activeSegment === nav.targetSegment} />}
              key={nav.name}
              href={nav.href}
              name={nav.name}
              targetSegment={nav.targetSegment}
              lang={lang}
            />
          ))}
        {/* {user &&
          user.role == 4 &&
          riskManagerLinks?.map((nav: any) => (
            <NavLink
              icon={<nav.icon isActive={activeSegment === nav.targetSegment} />}
              key={nav.name}
              href={nav.href}
              name={nav.name}
              targetSegment={nav.targetSegment}
              lang={lang}
            />
          ))} */}
      </div>

      <div
        onClick={handleLogout}
        className=" cursor-pointer hover:text-primary flex lg:justify-start sm:justify-center items-center lg:gap-x-2 bottom-12"
      >
        <LogoutIcon />
        <div className="sm:hidden lg:block">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
