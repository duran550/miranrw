'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import Image from 'next/image';
import Logo from '../../../../../public/logo.svg';
import { useClickOutside } from '@/app/hooks/useClickOutside';

type NavBarProps = {
  navigation: any;
  lang: string;
};

const NavBar: React.FC<NavBarProps> = ({ navigation, lang }) => {
  const [navbar, setNavbar] = useState(false);

  /* Container 36 */

  let domNode = useClickOutside(() => {
    setNavbar(false);
  });

  return (
    <nav ref={domNode} className="w-full relative z-20">
      <div className="w-full items-center relative  py-12 md:pb-2 justify-between px-2 mx-auto md:items-center flex  bg-primaryColor md:flex md:px-8">
        <div
          className={`${
            navbar
              ? 'bg-primaryColor absolute pt-2 top-0 px-0 right-0 left-0 shadow  '
              : ''
          } flex  h-full justify-center  absolute md:relative top-0 left-0 right-0  flex-col md:mt-0`}
        >
          <div className={`flex px-2 z-10 items-center justify-between py-0 `}>
            <Link className="pt-2.5" href="/">
              <Image width="220" src={Logo} alt="Logo" />
            </Link>
            <div className="md:hidden flex flex-col">
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
            className={`container z-10 ${
              navbar ? 'block' : 'hidden'
            } flex absolute top-24 left-0 bg-primaryColor w-full z-20 px-8 text-white items-center justify-between `}
          >
            <ul className="flex flex-col mb-8 gap-x-8">
              <li className="mt-4">
                <Link href={`/${lang}`}>{navigation.home}</Link>
              </li>
              <li className="mt-4">
                <Link href={`/${lang}/about`}>{navigation.about}</Link>
              </li>
            </ul>
            <LocaleSwitcher />
          </nav>
        </div>
        <div className="md:justify-between text-white items-center w-full max-w-lg hidden md:flex">
          {/* Horizontal or desktop navigation */}
          <nav
            className={`container opacity-0 md:opacity-100 md:block flex  items-center justify-between  `}
          >
            <ul className="flex gap-x-8">
              <li>
                <Link href={`/${lang}`}>{navigation.home}</Link>
              </li>
              <li>
                <Link href={`/${lang}/about`}>{navigation.about}</Link>
              </li>
            </ul>
          </nav>
          {/* <LocaleSwitcher /> */}
          <div className="opacity-0 md:opacity-100">
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
