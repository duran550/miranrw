'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import Image from 'next/image';
import Logo from '../../../../../public/logo.svg';
import { useClickOutside } from '@/app/hooks/useClickOutside';
import { usePathname } from 'next/navigation';

type NavBarProps = {
  navigation: {
    home: string;
    reportIncident: string;
    aboutQueer: string;
    aboutUs: {
      title: string;
      referalCounseling: string;
      news: string;
      publications: string;
      team: string;
      partners: string;
    };
    faqs: string;
  };
  lang: string;
};

const NavBar: React.FC<NavBarProps> = ({ navigation, lang }) => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const pathname = usePathname();

  /* Container 36 */

  let domNode = useClickOutside(() => {
    setNavbar(false);
    setToggle(false);
  });

  return (
    <nav ref={domNode} className="w-full relative z-20">
      <div className="w-full items-center relative  py-12 lg:py-4 justify-between px-2 mx-auto lg:items-center flex  bg-primaryColor lg:flex lg:px-8">
        <div
          className={`${
            navbar
              ? 'bg-primaryColor w-full absolute pt-2 top-0 px-0 right-0 left-0 shadow  '
              : 'w-full'
          } flex  h-full justify-center  absolute lg:relative top-0 left-0 right-0  flex-col lg:mt-0`}
        >
          <div
            className={`flex px-2 w-full z-10 items-center justify-between py-0 `}
          >
            <Link className="pt-2.5" href="/">
              <Image width="220" src={Logo} alt="Logo" />
            </Link>
            <div className="lg:hidden flex flex-col">
              <button
                className="p-0 mr-1 text-gray-700 bg-white  outline-none focus:border-gray-400 focus:border-none"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
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
                    className="w-8 h-8"
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
            } flex absolute lg:hidden right-0 ml-auto top-24 left-0 bg-primaryColor  z-20 px-8  text-white items-center justify-between `}
          >
            <ul className="flex flex-col gap-y-4 pt-8 mb-8">
              <li>
                <Link href={`/${lang}`}>{navigation?.home}</Link>
              </li>
              <li>
                <Link href={`/${lang}/report`}>
                  {navigation?.reportIncident}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about-queer`}>
                  {navigation?.aboutQueer}
                </Link>
              </li>
              <li onClick={() => setToggle(!toggle)} className="relative">
                <Link
                  className={`${toggle ? 'font-bold' : ''}`}
                  href={`/${lang}/about-us`}
                >
                  {navigation.aboutUs?.title}
                </Link>
                {toggle && (
                  <ul className="bg-primaryColor py-3 px-6 -left-6 w-[15rem] flex flex-col shadow-lg absolute top-6">
                    <Link href="/about-us/#referalCounseling">
                      {navigation.aboutUs?.referalCounseling}
                    </Link>
                    <Link href="/about-us/#news" className="py-2">
                      {navigation.aboutUs?.news}
                    </Link>
                    <Link href="/about-us/#publications">
                      {navigation.aboutUs?.publications}
                    </Link>
                    <Link href="/about-us/#team" className="py-2">
                      {navigation.aboutUs?.team}
                    </Link>
                    <Link href="/about-us/#partners">
                      {navigation.aboutUs?.partners}
                    </Link>
                  </ul>
                )}
              </li>
              <li>
                <Link href={`/${lang}/faqs`}>{navigation?.faqs}</Link>
              </li>
            </ul>
            <LocaleSwitcher />
          </nav>
        </div>
        <div className="lg:justify-between  text-white items-center w-full max-w-lg lg:max-w-3xl hidden lg:flex">
          {/* Horizontal or desktop navigation */}
          <nav
            className={`container opacity-0 lg:opacity-100 lg:block flex  items-center justify-between  `}
          >
            <ul className="flex gap-x-8">
              <li>
                <Link
                  className={`${
                    pathname === '/en' || pathname == '/de' ? 'font-bold' : ''
                  }`}
                  href={`/${lang}`}
                >
                  {navigation?.home}
                </Link>
              </li>
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
              <li>
                <Link
                  className={`${
                    pathname?.split('/')[2] === 'about-queer' ? 'font-bold' : ''
                  }`}
                  href={`/${lang}/about-queer`}
                >
                  {navigation?.aboutQueer}
                </Link>
              </li>
              <li onClick={() => setToggle(!toggle)} className="relative">
                <Link
                  className={`${toggle ? 'font-bold' : ''} ${
                    pathname?.split('/')[2] === 'about-us' ? 'font-bold' : ''
                  } `}
                  href={`/${lang}/about-us`}
                >
                  {navigation.aboutUs?.title}
                </Link>
                {toggle && (
                  <ul className="bg-primaryColor py-3 px-6 -left-6 w-[15rem] flex flex-col shadow-lg absolute top-6">
                    <Link href="/about-us/#referalCounseling">
                      {navigation.aboutUs?.referalCounseling}
                    </Link>
                    <Link href="/about-us/#news" className="py-2">
                      {navigation.aboutUs?.news}
                    </Link>
                    <Link href="/about-us/#publications">
                      {navigation.aboutUs?.publications}
                    </Link>
                    <Link href="/about-us/#team" className="py-2">
                      {navigation.aboutUs?.team}
                    </Link>
                    <Link href="/about-us/#partners">
                      {navigation.aboutUs?.partners}
                    </Link>
                  </ul>
                )}
              </li>
              <li>
                <Link href={`/${lang}/faqs`}>{navigation?.faqs}</Link>
              </li>
            </ul>
          </nav>
          {/* <LocaleSwitcher /> */}
          <div className="opacity-0 lg:opacity-100">
            {/* Language switcher */}

            <LocaleSwitcher />
            {/* <LocaleSwitcher /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
