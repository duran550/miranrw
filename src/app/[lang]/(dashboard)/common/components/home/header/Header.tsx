'use client';
import { useAuth } from '@/app/hooks/useAuth';
import React from 'react';

const Header = () => {
  const { user } = useAuth();

  return (
    <h1 className="text-2xl flex font-bold mb-8">
      Good morning, <h1 className="text-primary ml-2">{user?.fullname}</h1>
    </h1>
  );
};

export default Header;
