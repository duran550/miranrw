'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import Image from 'next/image';
import Logo from '../../../../../public/logo.svg';

type NavBarProps = {
  navigation: any;
  lang: string;
};

const NavBar: React.FC<NavBarProps> = ({ navigation, lang }) => {
  const [navbar, setNavbar] = useState(false);

  /* Container 36 */

  return (
    <nav className="w-full relative z-20">
      <div className="justify-between px-4 mx-auto md:items-center bg-secondaryColorSlate md:flex md:px-8">
        <div
          className={`${
            navbar ? 'bg-primaryColor shadow   mt-4' : ''
          } flex rounded-[8px] flex-col mt-4 md:mt-0`}
        >
          <div className={`flex px-4 z-10 items-center justify-between py-3 `}>
            <Link href="/">
              <Image width="200" src={Logo} alt="Logo" />
            </Link>
            <div className="md:hidden flex flex-col">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="#00000"
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
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#ffffff"
                    strokeWidth={2}
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
            } flex px-3 text-white items-center justify-between `}
          >
            <ul className="flex flex-col mb-8 gap-x-8">
              <li className="mt-4">
                <Link href={`/${lang}`}>{navigation.home}</Link>
              </li>
              <li className="mt-4">
                <Link href={`/${lang}/about`}>{navigation.about}</Link>
              </li>
            </ul>
            
          </nav>
        </div>
        <div className='flex items-center' >
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
