'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { useState } from 'react';
import Image from 'next/image';
import GermanLogo from '../../../../../public/images/germany-flag.svg';
import EnglandLogo from '../../../../../public/images/england-flag.svg';
import DownIcon from '../../../../../public/icons/downIcon.svg';
import AnimateClick from '../../animate-click/AnimateClick';

export default function LocaleSwitcher() {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathName = usePathname();
  const selectedLanguage: any = pathName.split('/')[1];
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div>
      <div className="flex flex-col relative items-center">
        <AnimateClick>
          <div
            className="flex justify-between space-x-1 px-2 py-1 rounded-md bg-white "
            onClick={() => setToggle(!toggle)}
          >
            <div>
              {selectedLanguage === 'en' ? (
                <Image
                  className="w-8 md:w-10 mr-2"
                  src={EnglandLogo}
                  alt="Logo England"
                />
              ) : (
                <Image
                  className="w-8 md:w-10 mr-2"
                  src={GermanLogo}
                  alt="Logo Germany"
                />
              )}
            </div>
            <Image className="w-4" src={DownIcon} alt="down icon" />
          </div>
        </AnimateClick>
        {toggle ? (
          <ul className="flex absolute rounded-md px-3 w-[4.5rem] py-1 top-8 z-10 right-0  h-fit bg-white  shadow-lg flex-col gap-x-3">
            {i18n.locales.map((locale) => {
              return (
                <li key={locale}>
                  <Link
                    href={redirectedPathName(locale)}
                    className="py-2 text-slate-900"
                  >
                    {locale === 'en' ? (
                      <div
                        onClick={() => setToggle(false)}
                        className="flex items-center w-6 my-2 mr-2"
                      >
                        <Image
                          className="mr-2"
                          src={EnglandLogo}
                          alt="Logo England"
                        />
                        {locale}
                      </div>
                    ) : (
                      <div
                        onClick={() => setToggle(false)}
                        className="flex items-center w-6 my-2 mr-2"
                      >
                        <Image
                          className="mr-2"
                          src={GermanLogo}
                          alt="Logo Germany"
                        />
                        {locale}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
