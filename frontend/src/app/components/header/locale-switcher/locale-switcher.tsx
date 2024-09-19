'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { useState } from 'react';
import Image from 'next/image';
import GermanLogo from '../../../../../public/images/germany-flag.svg';
import EnglandLogo from '../../../../../public/images/england-flag.svg';
import AnimateClick from '../../animate-click/AnimateClick';
import LeicheSpracheLogo from '../../../../../public/icons/leichteSpracheIcon.png';
import { clearFormCookies, clearFormStep } from '@/cookies/cookies';

export default function LocaleSwitcher() {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathName = usePathname();
  const selectedLanguage: any = pathName.split('/');

  
  const redirectedPathName = (locale: string) => {
    // clearFormCookies()
    // if (!pathName) return '/';
    // const segments = pathName.split('/');
    // segments[1] = locale;
    // return segments.join('/');
    // return (window.location.href = '/' + locale + '/report');
  };

  return (
    <div className="w-fit  2xl:w-fit lg:w-full 2xl:mr-0 mr-4 ">
      <ul className="flex   lg:flex-row space-x-6 lg:space-x-0 xl:ml-24 text-slate-900 md:ml-0 md:space-y-0 justify-between items-center w-full  md:w-fit">
        {i18n.locales.map((locale) => (
          <AnimateClick key={locale}>
            <Link
              href={
                selectedLanguage[2]
                  ? '/' + locale +'/'+ selectedLanguage[2]
                  : '/' + locale 
              }
              className="text-slate-900 "
            >
              {locale === 'en' ? (
                <div
                  onClick={() => {
                    // clearFormStep();

                    // clearFormCookies();
                    clearFormCookies();
                    // window?.location?.reload();
                    setToggle(false);
                  }}
                  className="flex items-center w-fit"
                >
                  <Image
                    className="mr-2 w-4 md:w-8"
                    src={EnglandLogo}
                    alt="Logo England"
                  />
                  <div
                    className={`${
                      pathName?.split('/')[1] === 'en'
                        ? ' font-bold text-sm flex'
                        : 'flex'
                    }`}
                  >
                    English
                  </div>
                </div>
              ) : locale === 'de' ? (
                <div
                  onClick={() => {
                    setToggle(false);

                    clearFormCookies();
                    // window?.location?.reload();
                    // clearFormStep();

                    //  clearFormCookies();
                  }}
                  className="flex md:ml-2 md:mr-14 items-center w-fit"
                >
                  <Image
                    className="mr-2 w-4 md:w-8"
                    src={GermanLogo}
                    alt="Logo Germany"
                  />
                  <div
                    className={`${
                      pathName?.split('/')[1] === 'de'
                        ? ' font-bold text-sm'
                        : 'flex text-sm '
                    }`}
                  >
                    Deutsch
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setToggle(false);

                    clearFormCookies();
                    //  window?.location?.reload();
                    // clearFormCookies();
                    // clearFormStep()
                  }}
                  className="flex  items-center w-fit mr-2 lg:mr-8 xl:pr-0"
                >
                  <Image
                    className="mr-2 w-4 md:w-8"
                    src={LeicheSpracheLogo}
                    alt="Leichte sprache logo"
                  />
                  <div
                    className={`${
                      pathName?.split('/')[1] === 'de-LS'
                        ? ' font-bold text-sm md:w-[8rem]'
                        : 'flex  md:w-[8rem] text-sm'
                    }`}
                  >
                    Leichte Sprache
                  </div>
                </div>
              )}
            </Link>
          </AnimateClick>
        ))}
      </ul>
    </div>
  );
}
