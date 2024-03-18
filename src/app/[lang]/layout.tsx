import { Locale, i18n } from '@/i18n.config';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import { FormProvider } from '../context/FormContext';
import { Providers } from '../components/captcha/providers';
import Script from 'next/script';
import { NextUIProvider } from '@nextui-org/react';
import LayoutComponent from './LayoutComponent';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'MIQ NRW',
  description: 'Report portal',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <Head>
        <meta name="description">{metadata.description}</meta>
      </Head>

      <body
        className={`${poppins.className} flex flex-col bg-white text-textColor min-h-screen`}
      >
        {/* <NextUIProvider>
          <Providers>
            <FormProvider>{children}</FormProvider>
          </Providers>
        </NextUIProvider> */}
        <LayoutComponent children={children} />
        {/* <script id="dacs" src="" defer></script> */}

        <script
          id="dacs"
          src="https://download.digiaccess.org/digiaccess"
          defer
        ></script>
      </body>
    </html>
  );
}
