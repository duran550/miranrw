'use client';

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { Providers } from '../components/captcha/providers';
import { Locale } from '@/i18n.config';
import { FormProvider } from '../context/FormContext';

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <Providers>
        <FormProvider>{children}</FormProvider>
      </Providers>
    </NextUIProvider>
  );
};

export default LayoutComponent;
