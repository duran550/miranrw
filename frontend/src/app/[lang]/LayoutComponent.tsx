'use client';

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { Providers } from '../components/captcha/providers';
import { Locale } from '@/i18n.config';
import { FormProvider } from '../context/FormContext';
import { AuthProvider } from '../context/AuthContext';
import { CategoryProvider } from '../context/CategorizeContext';

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <Providers>
        <FormProvider>
          <AuthProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </AuthProvider>
        </FormProvider>
      </Providers>
    </NextUIProvider>
  );
};

export default LayoutComponent;
