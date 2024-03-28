'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import ReportSummary from './reports-cleaner/report-summary/ReportSummary';
import ReportActions from './reports-cleaner/report-actions/ReportActions';
import CategorizeDataForm from './reports-cleaner/form/CategorizeDataForm';
import { usePathname } from 'next/navigation';
import { reportsCardTableUncategorized } from '../../../dashboard/reports/reportsCardDatas';
import {
  ReportSummaryType,
  ReportType,
} from '../../../dashboard/reports/reportSummaryType';
import { useFindReport } from '@/app/hooks/useFindReport';
import { getAllUsers } from '@/services/userService';
import { useAuth } from '@/app/hooks/useAuth';
import { Role } from '@/utils/utils';

const ReportSingle = () => {
  const { uncategorizedData } = useFindReport();
  const { user } = useAuth();

  return (
    <div className="mb-[2rem]">
      <Header href="/cleaned-data" title="Data Info" />
      <div className="flex  gap-x-6 h-full">
        <ReportSummary
          incidentDescription={uncategorizedData?.summary?.incidentDescription}
        />
        {user?.role === Role.CLEANER ? (
          <ReportActions
            WhatHappened={uncategorizedData?.summary.incidentDescription}
          />
        ) : (
          <CategorizeDataForm />
        )}
      </div>
    </div>
  );
};

export default ReportSingle;
