'use client';
import { useAuth } from '@/app/hooks/useAuth';
import { Role } from '@/utils/utils';
import React from 'react';
import HomeViewerAndAdmin from './HomeViewerAndAdmin';
import HomeCleaner from './HomeCleaner';
import HomeRiskManager from './HomeRiskManager';

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      {user?.role === Role.ADMIN ? (
        <HomeViewerAndAdmin />
      ) : user?.role === Role.VIEWER ? (
        <HomeViewerAndAdmin />
      ) : user?.role === Role.CLEANER ? (
        <HomeCleaner />
      ) : (
        user && <HomeRiskManager />
      )}
    </>
  );
};

export default Home;
