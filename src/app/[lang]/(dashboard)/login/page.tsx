'use client';

import LoginForm from './components/form/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../../../public/logo.svg';

const login = () => {
  return (
    < >
      {/* <Link href="/">
        <Image width="250" src={Logo} alt="Logo" />
      </Link> */}
      <LoginForm />
    </>
  );
};

export default login;
