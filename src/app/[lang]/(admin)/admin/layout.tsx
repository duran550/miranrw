'use client';
import { Locale, i18n } from '@/i18n.config';
import type { Metadata } from 'next';
import AdminHeader from './components/header/header';
import SideBar from './components/sidebar/SideBar';
import { AdminProvider } from './context/AdminContext';

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
      <div className="w-full flex">
        <SideBar />
        <div className="bg-slate-100 w-full">
          <AdminHeader />
          <main className=" p-16">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
