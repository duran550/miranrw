'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import Image from 'next/image';
import Logo from '../../../../../public/logo.svg';
import { useClickOutside } from '@/app/hooks/useClickOutside';
import { usePathname } from 'next/navigation';
import { NavBarProps } from './navbar.d';
import { Button } from '../../button/Button';

const NavBar: React.FC<NavBarProps> = ({ navigation, lang }) => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle1, setToggle1] = useState<boolean>(false);

  const pathname = usePathname();
  const urlSplit = pathname.split('/');

  /* Container 36 */

  let domNode = useClickOutside(() => {
    setNavbar(false);
    setToggle(false);
  });

  return (
    <nav ref={domNode} className="w-full relative">
      <div className=" w-screen border-b-[1.2px] py-5 border-black">
        <div className=" 2xl:w-[1335px] 2xl:mx-auto lg:w-fit md:w-full  sm:ml-auto flex justify-end  ">
          {/* Language switcher */}

          <LocaleSwitcher />
        </div>
      </div>
      <div className="w-full  2xl:w-[1325px] 2xl:gap-10  2xl:px-0 items-center relative  py-12 xl:py-4 justify-between px-2 mx-auto xl:items-center flex  bg-white xl:flex xl:px-8">
        <div
          className={`${
            navbar
              ? 'bg-menuAndFooterColor w-full absolute pt-2 top-0 px-0 right-0 left-0 shadow  '
              : 'w-full'
          } flex  h-full justify-center  absolute xl:relative top-0 left-0 right-0  flex-col xl:mt-0`}
        >
          <div
            className={`flex lg:px-8 2xl:px-0 xl:px-2 w-full z-10 items-center justify-between py-0 `}
          >
            <Link className=" 2xl:-ml-5" href={'/' + urlSplit[1]}>
              <Image className="md:w-96 w-72" src={Logo} alt="Logo" />
            </Link>
            <div className="xl:hidden flex flex-col">
              <button
                className="p-0 mr-1 text-gray-700  outline-none focus:border-gray-400 focus:border-none"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                    viewBox="0 0 20 20"
                    fill="#000000"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg> /* Container 36 */
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#000000"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links mobile version*/}

          <nav
            className={`container  z-10 ${
              navbar ? 'block w-full' : 'hidden w-full'
            } flex absolute xl:hidden right-0 ml-auto top-24 left-0 bg-menuAndFooterColor z-50 px-8  text-textColor items-start justify-between `}
          >
            <ul className="flex flex-col gap-y-4 pt-8 mb-8">
              {/* <li>
                <Link href={`/${lang}`}>{navigation?.home}</Link>
              </li> */}
              <li>
                <Link href={`/${lang}/report`}>
                  {navigation?.reportIncident}
                </Link>
              </li>
              {/* About queer section */}
              <li onClick={() => setToggle1(!toggle1)} className="relative">
                <div className={`${toggle1 ? 'font-bold' : ''} cursor-pointer`}>
                  {navigation.aboutQueer?.title}
                </div>
                {toggle1 && (
                  <ul className="pl-3 flex flex-col ">
                    <Link
                      href={`/${lang}/queerphobia/#whatIsQueerphobia`}
                      className="py-2"
                    >
                      {navigation.aboutQueer?.firstSubmenu}
                    </Link>
                    <Link href={`/${lang}/queerphobia#iNeedHelp`}>
                      {navigation.aboutQueer?.secondSubmenu}
                    </Link>
                    <Link href={`/${lang}/queerphobia#glossary`}>
                      {navigation.aboutQueer?.thirdSubmenu}
                    </Link>
                  </ul>
                )}
              </li>
              {/* About us section */}
              <li onClick={() => setToggle(!toggle)} className="relative">
                <div className={`${toggle ? 'font-bold' : ''} cursor-pointer`}>
                  <Link href={`/${lang}/about-us`}>
                    {navigation.aboutUs?.title}
                  </Link>
                </div>
                {toggle && (
                  <ul className="pl-3 flex flex-col ">
                    <Link href={`/${lang}/about-us/#team`} className="py-2">
                      Unsere Arbeit
                    </Link>
                    <Link href={`/${lang}/about-us/#partners`}>
                      {navigation.aboutUs?.partners}
                    </Link>
                    <Link href={`/${lang}/about-us/#news`} className="py-2">
                      {navigation.aboutUs?.news}
                    </Link>
                    {/* <Link href="/about-us/#referalCounseling">
                      {navigation.aboutUs?.referalCounseling}
                    </Link>
                    <Link href={`/${lang}/about-us/#publications`}>
                      {navigation.aboutUs?.publications}
                    </Link> */}
                  </ul>
                )}
              </li>
              {/* FAQs link */}
              <li>
                <Link href={`/${lang}/faqs`}>{navigation?.faqs}</Link>
              </li>
            </ul>
            <div className="pt-8 mb-8 sm:block hidden">
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
        <div className="  relative 2xl:px-0  xl:justify-between  text-textColor items-center w-full lg:w-[230rem]  xl:w-[230rem] hidden xl:flex">
          {/* Horizontal or desktop navigation */}
          <nav
            className={`container w-full opacity-0 xl:opacity-100 xl:block flex  items-center justify-between`}
          >
            <ul className="flex w-full  2xl:gap-14 gap-6">
              {/* <li>
                <Link
                  className={`${
                    pathname === '/en' ||
                    pathname == '/de' ||
                    pathname == '/de-LS'
                      ? 'font-bold'
                      : ''
                  }`}
                  href={`/${lang}`}
                >
                  {navigation?.home}
                </Link>
              </li> */}
              <li>
                <Link
                  className={`${
                    pathname?.split('/')[2] === 'report' ? 'font-bold' : ''
                  }`}
                  href={`/${lang}/report`}
                >
                  {navigation?.reportIncident}
                </Link>
              </li>
              {/* About Queerphobia link */}
              <li className="relative h-full cursor-pointer group/queerphobia">
                <Link
                  href={`/${lang}/queerphobia`}
                  className={`hover:font-bold relative ${
                    pathname?.split('/')[2] === 'queerphobia' ? 'font-bold' : ''
                  } cursor-pointer`}
                >
                  {navigation.aboutQueer?.title}
                </Link>
                {/* Submenu About Queerphobia */}
                {/* The z-index here is to for any text below dropdown */}
                <ul className="hidden group-hover/queerphobia:flex bg-white shadow-lg py-3 px-6 text-sm left-0 w-[18rem] flex-col  absolute top-6 pt-4 z-20">
                  <Link
                    href={`/${lang}/queerphobia/#whatIsQueerphobia`}
                    className="py-2 hover:font-bold"
                  >
                    {navigation.aboutQueer?.firstSubmenu}
                  </Link>
                  <Link
                    className="py-2 hover:font-bold"
                    href={`/${lang}/queerphobia#iNeedHelp`}
                  >
                    {navigation.aboutQueer?.secondSubmenu}
                  </Link>
                  <Link
                    className="py-2 hover:font-bold"
                    href={`/${lang}/queerphobia#glossary`}
                  >
                    {navigation.aboutQueer?.thirdSubmenu}
                  </Link>
                </ul>
              </li>

              {/* About us link */}
              <li className="relative cursor-pointer group/queerphobia">
                <Link
                  href={`/${lang}/about-us`}
                  className={`hover:font-bold relative ${
                    pathname?.split('/')[2] === 'about-us' ? 'font-bold' : ''
                  } cursor-pointer`}
                >
                  {navigation.aboutUs?.title}
                </Link>
                {
                  /* The z-index here is to for any text below dropdown */
                  <ul className="hidden group-hover/queerphobia:flex bg-white shadow-lg py-3 px-6 text-sm -left-6 w-[18rem] flex-col  absolute top-4.5  pt-4 z-20">
                    <Link
                      className="hover:font-bold py-3"
                      href="/about-us/#team"
                    >
                      Unsere Arbeit
                    </Link>
                    <Link
                      className="hover:font-bold"
                      href="/about-us/#partners"
                    >
                      {navigation.aboutUs?.partners}
                    </Link>
                    <Link
                      className="hover:font-bold py-3"
                      href="/about-us/#news"
                    >
                      {navigation.aboutUs?.news}
                    </Link>
                    {/* <Link
                      className="hover:font-bold "
                      href="/about-us/#referalCounseling"
                    >
                      {navigation.aboutUs?.referalCounseling}
                    </Link>
                    <Link
                      className="hover:font-bold py-3"
                      href="/about-us/#publications"
                    >
                      {navigation.aboutUs?.publications}
                    </Link> */}
                  </ul>
                }
              </li>
              <li>
                <Link
                  className={`${
                    pathname?.split('/')[2] === 'faqs' ? 'font-bold' : ''
                  } relative `}
                  href={`/${lang}/faqs`}
                >
                  {navigation?.faqs}
                </Link>
              </li>
            </ul>
          </nav>
          {/* <div className="w-fit xl:pr-4 "> */}
          <Link href={`/${lang}/report`}>
            {' '}
            <div
              className={`w-64 xl:pr-4`}
              // className={` ${
              //   pathname === '/' + lang + ''
              //     ? 'xl:pr-4 '
              //     : 'fixed  mx-auto 2xl:left-1/2 2xl:transform 2xl:-translate-x-1/2 2xl:right-auto right-4 top-28 2xl:w-[1375px]  flex justify-end'
              // } ${pathname === '/' + lang + '/report' && 'hidden'} w-64 xl:pr-4`}
            >
              <Button className={` w-64 `} variant="primary">
                {navigation?.button}
              </Button>
            </div>
          </Link>

          {/* </div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
