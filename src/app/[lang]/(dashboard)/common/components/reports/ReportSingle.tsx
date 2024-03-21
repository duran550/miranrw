'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import ReportSummary from './reports-cleaner/report-summary/ReportSummary';
import ReportActions from './reports-cleaner/report-actions/ReportActions';
import CategorizeDataForm from './reports-cleaner/form/CategorizeDataForm';
import { usePathname } from 'next/navigation';
import { reportsCardTableUncategorized } from '../../../dashboard/reports/reportsCardDatas';
import { ReportSummaryType, ReportType } from '../../../dashboard/reports/reportSummaryType';
import { useFindReport } from '@/app/hooks/useFindReport';

const ReportSingle = () => {

  const { uncategorizedData } = useFindReport (); 

  return (
    <div>
      <Header href="/cleaned-data" title="Data Info" />
      <div className="flex  gap-x-6">
        <ReportSummary />
        {/* <ReportActions /> */}
        <CategorizeDataForm />
      </div>
    </div>
  );
};

export default ReportSingle;
