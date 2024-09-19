'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { CookieConsentProps } from './cookieConsent';
import { Button } from '../button/Button';
import Image from 'next/image';
import LockIcon from '../../../../public/icons/lock-icon.svg';

const USER_CONSENT_COOKIE_KEY = 'cookie_consent_is_true';
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365;

const CookieConsent: React.FC<CookieConsentProps> = ({
  cookieConsentTranslation,
  lang,
}) => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true';
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    return null;
  }

  return (
    <section className="fixed bg-white border  bottom-0 left-0 w-full py-4 md:py-4">
      <div className="flex px-5 items-center">
        <h1 className=" font-bold md:text-xl ">
          {cookieConsentTranslation?.title}
        </h1>
        <span>
          <Image className="w-3 ml-2" src={LockIcon} alt="Lock icon" />
        </span>
      </div>

      <div className="flex flex-col items-center  px-5 py-3 space-y-2  md:flex-row md:space-y-0 md:items-center md:space-x-2">
        <div className="flex items-center flex-grow text-gray-900">
          <div className="text-sm font-medium">
            {cookieConsentTranslation?.content}
            <Link
              target="_blank"
              className="text-sm ml-2 underline hover:text-lightAccent"
              href={`/${lang}/datenschutz`}
            >
              {cookieConsentTranslation?.datenschutz}
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="primary"
            className="text-sm mt-0 font-bold text-white uppercase  whitespace-nowrap"
            onClick={onClick}
          >
            {cookieConsentTranslation?.accept}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CookieConsent;
