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
    <div className="w-full">
      <ul className="flex flex-col md:flex-row space-y-6 ml-24 md:ml-0 md:space-y-0 justify-between items-center  w-full">
        {i18n.locales.map((locale) => (
          <AnimateClick key={locale}>
            <Link href={redirectedPathName(locale)} className="text-slate-900">
              {locale === 'en' ? (
                <div
                  onClick={() => setToggle(false)}
                  className="flex items-center w-full"
                >
                  <Image
                    className="mr-2 w-8"
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
                    EN
                  </div>
                </div>
              ) : locale === 'de' ? (
                <div
                  onClick={() => setToggle(false)}
                  className="flex md:ml-2 md:mr-14 items-center w-full"
                >
                  <Image
                    className="mr-2 w-8"
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
                    DE
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setToggle(false)}
                  className="flex items-center w-full"
                >
                  <div
                    className={`${
                      pathName?.split('/')[1] === 'de-LS'
                        ? ' font-bold text-sm md:w-[8.2rem]'
                        : 'flex  md:w-[8.2rem] text-sm'
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
