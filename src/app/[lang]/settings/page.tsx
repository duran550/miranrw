import CookieConsent from '@/app/components/banners/CookieConsent';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/header';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import DeleteUser from '@/app/components/settings/DeleteUser';
import EditUser from '@/app/components/settings/EditUser';
import AddUser from '@/app/components/settings/AddUser';

export default async function settings({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="space-y-5 p-5">
      <AddUser />
      <EditUser />
      <DeleteUser lang={lang} />
    </div>
  );
}
