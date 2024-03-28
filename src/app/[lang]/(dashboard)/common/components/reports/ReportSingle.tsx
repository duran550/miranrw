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
import ReportService from '@/services/reportService';
import { reportType } from '@/utils/shared-types';

const ReportSingle = () => {
  const pathname = usePathname()
     const urlSplit = pathname.split('/');
  
  const { uncategorizedData } = useFindReport();
  const { user } = useAuth();
  const [reports, setReport] = useState<reportType | undefined>();
  const [reports2, setReport2] = useState<reportType | undefined>();
  
  const [refresh, setRefresh] = useState(false)
   const [send, setsend] = useState(false);
    useEffect(() => {
      if (!reports) {
        const response = new ReportService()
          .getAllReport()
          .then((result) => {
            console.log('report', result.data.reports);
            const report = result.data.reports.filter((item) => item._id == urlSplit[urlSplit.length-1]);
            setReport(report[0]);
            //  setReports(result.data.reports);
            //  setReports();
          })
          .then((error) => {
            console.log(error);
          });
      }

      if (refresh) {
         const response = new ReportService()
           .getAllReport()
           .then((result) => {
             console.log('report', result.data.reports);
             console.log(pathname.split('/'));
             
             const report = result.data.reports.filter(
               (item) => item._id == pathname.split('/')[pathname.length-1]
             );
             setReport2(report[0]);
             setRefresh(false)
             //  setReports(result.data.reports);
             //  setReports();
           })
           .then((error) => {
             console.log(error);
           });
      }
      console.log(reports);
    }, [reports,refresh]);

  return (
    <div className="mb-[2rem]">
      <Header href="/cleaned-data" title="Data Info" />
      <div className="flex  gap-x-6 h-full">
        <ReportSummary
          report={reports}
          incidentDescription={uncategorizedData?.summary?.incidentDescription}
        />
        {user?.role === Role.CLEANER ? (
          <ReportActions
            WhatHappened={uncategorizedData?.summary.incidentDescription}
            report={reports2}
            refresh={()=>{setRefresh(true)}}
          />
        ) : (
          <CategorizeDataForm />
        )}
      </div>
    </div>
  );
};

export default ReportSingle;
