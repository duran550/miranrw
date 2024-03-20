'use client';
import { useAuth } from '@/app/hooks/useAuth';
import { Role } from '@/utils/utils';
import React from 'react';
import ReportsViewerAndAdmin from './ReportsViewerAndAdmin';
import ReportsCleaner from './ReportsCleaner';
import ReportsRiskManager from './ReportsRiskManager';

const Reports = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.role === Role.ADMIN ? (
        <ReportsViewerAndAdmin />
      ) : user?.role === Role.VIEWER ? (
        <ReportsViewerAndAdmin />
      ) : user?.role === Role.CLEANER ? (
        <ReportsCleaner />
      ) : (
        <ReportsRiskManager />
      )}
    </>
  );
};

export default Reports;
