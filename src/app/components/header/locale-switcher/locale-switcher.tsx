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
          <ul className="flex space-x-12 mr-16">
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
                        className="flex items-center w-10"
                      >
                        <Image
                          className="mr-2"
                          src={EnglandLogo}
                          alt="Logo England"
                        />
                        <div>EN</div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setToggle(false)}
                        className="flex items-center w-10"
                      >
                        <Image
                          className="mr-2"
                          src={GermanLogo}
                          alt="Logo Germany"
                        />
                        <div>DE</div>
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </AnimateClick>
      </div>
    </div>
  );
}
