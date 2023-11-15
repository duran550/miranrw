import React, { ReactNode } from 'react';
import CookieConsent from '../../banners/CookieConsent';

type GeneralLayoutProps = {
  lang: string;
  generalLayoutTranslation: any;
  children: ReactNode;
};
const GeneralLayout: React.FC<GeneralLayoutProps> = async ({
  lang,
  generalLayoutTranslation,
  children,
}) => {
  return (
    <>
      {children}
      <CookieConsent
        cookieConsentTranslation={generalLayoutTranslation}
        lang={lang}
      />
    </>
  );
};

export default GeneralLayout;
