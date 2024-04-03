'use client'
import React, { useEffect, useState } from 'react';
import ReportSummary from '../../../common/components/reports/reports-cleaner/report-summary/ReportSummary';
import CategorizeDataForm from '../../../common/components/reports/reports-cleaner/form/CategorizeDataForm';
import ReportService from '@/services/reportService';
import { usePathname } from 'next/navigation';
import { useFindReport } from '@/app/hooks/useFindReport';
import { useAuth } from '@/app/hooks/useAuth';
import { reportType } from '@/utils/shared-types';

const Page = () => {
   const pathname = usePathname();
   const urlSplit = pathname.split('/');

   const { uncategorizedData } = useFindReport();
   const { user } = useAuth();
   const [reports, setReport] = useState<reportType | undefined>();
   const [reports2, setReport2] = useState<reportType | undefined>();

   const [refresh, setRefresh] = useState(false);
   const [refreshRaw, setRefreshRaw] = useState(false);

   const [refreshCurrent, setRefreshCurrent] = useState(false);

   const [send, setsend] = useState(false);
   const refreshHandler = () => {
     setRefresh(true);
   };

   const refreshCurrentHandler = () => {
     setRefreshCurrent(true);
     // alert('ok');
   };
   useEffect(() => {
     if (!reports || refreshCurrent) {
       const response = new ReportService()
         .getAllReport()
         .then((result) => {
           console.log('report', result.data.reports);
           const report = result.data.reports.filter(
             (item) => item._id == urlSplit[urlSplit.length - 1]
           );
           // if (report[0].status!=='pending') {
           //   window.location.href='dashboard/clean-data'
           // }
          //  if (report[0].status == 'cleaned') {
          //    setReport2(report[0]);
          //  } else {
          //    setReport2(undefined);
          //  }
           setReport(report[0]);
           setRefreshCurrent(false);
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
           //  console.log(pathname.split('/'));

           const report = result.data.reports.filter(
             (item) => item._id == urlSplit[urlSplit.length - 1]
           );
           console.log('report', report);

           setReport2(report[0]);
           setRefresh(false);
           //  setReports(result.data.reports);
           //  setReports();
         })
         .then((error) => {
           console.log(error);
         });
     }
   }, [reports, refresh, refreshCurrent]);
  return (
    <div>
      <ReportSummary report={reports} />
      {/* <CategorizeDataForm /> */}
    </div>
  );
};

export default Page;
