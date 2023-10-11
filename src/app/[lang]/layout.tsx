import { Locale, i18n } from '@/i18n.config';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from '../components/header/header';
import Head from 'next/head';
import { FormProvider } from '../context/FormContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '500',
});

export const metadata: Metadata = {
  title: 'MIQ NRW',
  description: 'Generated by create next app',
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
        {/* <Header lang={params.lang} /> */}
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
