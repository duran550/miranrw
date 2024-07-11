import { Locale, i18n } from '@/i18n.config';
import { AdminProvider } from '../common/context/AdminContext';
import Sidebar from '../common/sidebar/Sidebar';
import { Suspense } from 'react';
import NextTopLoader from 'nextjs-toploader';
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function AdminLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <AdminProvider>
      <div className="w-full flex ">
        <Suspense fallback={<>Loading</>}>
          <Sidebar lang={lang} />
        </Suspense>

        <div className="h-screen overflow-clip pt-8  w-5/6 ml-auto">
          {/* <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          /> */}
          <main className="h-full mx-12">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
