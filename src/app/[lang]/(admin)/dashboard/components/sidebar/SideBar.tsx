import React from 'react';
import Link from 'next/link';
import NavItem from '../nav-item/NavItem';
import Image from 'next/image';
import Logo from '../../../../../../../public/logo.svg';

export default function App() {
  const items = [];

  return (
    <div className="flex flex-col px-4 border h-screen border-gray-100 bg-white">
      <Link href="/">
        <Image width="200" src={Logo} alt="Logo" className='mt-2'/>
      </Link>
      <div className="flex flex-col mt-32">
        <div className="py-4">
          <NavItem href="/dashboard">Dashboard</NavItem>
        </div>
        <div className="py-4">
          <NavItem href="/admin/blog">Blog</NavItem>
        </div>
        <div className="py-4">
          <NavItem href="/admin/users">Users</NavItem>
        </div>
      </div>
    </div>
  );
}
