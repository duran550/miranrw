import { Locale, i18n } from '@/i18n.config';
import { AdminProvider } from '../common/context/AdminContext';
import Sidebar from '../common/sidebar/Sidebar';

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
        <Sidebar />
        <div className="bg-white w-full">
          <main className=" p-16">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
