'use client';

import { ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfPtBgpAAAAALDREjJBsdKLLhjQiawhFYP8aPDY">
      {children}
    </GoogleReCaptchaProvider>
  );
}
