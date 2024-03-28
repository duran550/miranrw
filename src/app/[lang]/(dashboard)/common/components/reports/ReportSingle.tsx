'use client';
import React, { useEffect } from 'react';
import Header from './Header';
import ReportSummary from './reports-cleaner/report-summary/ReportSummary';
import ReportActions from './reports-cleaner/report-actions/ReportActions';
import { useAuth } from '@/app/hooks/useAuth';

const ReportSingle = () => {
  const { user } = useAuth()
  useEffect(()=>{},[])
  return (
    <div>
      <Header href="/cleaned-data" title="Data Info" />

      <div className="flex  gap-x-6">
        <ReportSummary />
        {user?.role == 3 && <ReportActions />}
      </div>
    </div>
  );
};

export default ReportSingle;
