'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  name: string;
  href: string;
  icon?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ name, href, icon }) => {
  const pathname = usePathname();
  return (
    <Link
      key={name}
      href={href}
      className={clsx(
        'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-4 text-sm font-medium hover:bg-red-50 hover:text-primaryColor md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-primaryColor text-white': pathname === `${href}`,
        }
      )}
    >
      {/* <LinkIcon className="w-6" /> */}
      <p className="hidden md:block">{name}</p>
    </Link>
  );
};

export default NavLink;
