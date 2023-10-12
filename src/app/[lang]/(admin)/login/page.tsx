'use client';

import LoginForm from './components/form/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../../../public/logo.svg';

const login = () => {
  return (
    <div className="pt-0 h-screen bg-slate-300 flex flex-col items-center justify-center">
      <Link href="/">
        <Image width="250" src={Logo} alt="Logo" />
      </Link>
      <LoginForm />
    </div>
  );
};

export default login;
