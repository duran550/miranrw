import { Locale, i18n } from '@/i18n.config';
import { AdminProvider } from '../common/context/AdminContext';
import Sidebar from '../common/sidebar/Sidebar';
import { Suspense } from 'react';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <AdminProvider>
      <div className="w-full flex ">
        <Suspense fallback={<>Loading</>}>
          <Sidebar />
        </Suspense>

        <div className="h-screen overflow-clip pt-8  w-5/6 ml-auto">
          <main className="h-fit mx-12">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
