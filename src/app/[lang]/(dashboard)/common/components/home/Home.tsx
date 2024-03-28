'use client';
import { useAuth } from '@/app/hooks/useAuth';
import { Role } from '@/utils/utils';
import React, { useEffect } from 'react';
import HomeViewerAndAdmin from './HomeViewerAndAdmin';
import HomeCleaner from './HomeCleaner';
import HomeRiskManager from './HomeRiskManager';
import { getAllUsers } from '@/services/userService';
import AuthService from '@/services/authService';
import { Result } from 'postcss';
import ReportService from '@/services/reportService';

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
  //   const users = getAllUsers()
    //  console.log(users);
    
    const response = new ReportService().getAllReport().then((result) => {
      console.log('report',result);
      
    }).then((error) => {
      console.log(error);
      
    })
   
  },[])
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
