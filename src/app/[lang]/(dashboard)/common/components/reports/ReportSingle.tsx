'use client';
import React, { useContext, useEffect, useState } from 'react';
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
import ReportSummaryCleanData from './reports-cleaner/report-summary/ReportSummaryCleanData';
import { AdminContext } from '../../context/AdminContext';

const ReportSingle = () => {
  const pathname = usePathname();
  const urlSplit = pathname.split('/');

  const { uncategorizedData } = useFindReport();
  const { user } = useAuth();
  const [reports, setReport] = useState<reportType | undefined>();
  const [reports2, setReport2] = useState<reportType | undefined>();

  const [refresh, setRefresh] = useState(false);
  const [refreshRaw, setRefreshRaw] = useState(false);

  const [refreshCurrent, setRefreshCurrent] = useState(false);
  const { state, dispatch } = useContext(AdminContext);

  const [send, setsend] = useState(false);

  const refreshHandler = () => {
    // alert('ok')
    setRefresh(true);
    setRefreshRaw(false);
  };

  const refreshCurrentHandler = () => {
    setRefreshCurrent(true);
    setRefreshRaw(true);

    // alert('ok');
  };
  useEffect(() => {
    if (!reports || refreshCurrent) {
      const response = new ReportService()
        .getAllReport()
        .then((result) => {
          // console.log('report', result.data.reports);
          const report = result.data.reports.filter(
            (item) => item._id == urlSplit[urlSplit.length - 1]
          );
          // if (report[0].status!=='pending') {
          //   window.location.href='dashboard/clean-data'
          // }
          if (report[0].updatereport && report[0].updatereport.status == 'cleaned') {
            setReport2(report[0]);
          } else {
            setReport2(undefined);
          }
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
          // console.log('report', result.data.reports);
          //  console.log(pathname.split('/'));

          const report = result.data.reports.filter(
            (item) => item._id == urlSplit[urlSplit.length - 1]
          );
          // console.log('report', report);

          setReport2(report[0]);
          setRefresh(false);
          //  setReports(result.data.reports);
          //  setReports();
        })
        .then((error) => {
          console.log(error);
        });
    }
   
  }, [reports, refresh, refreshCurrent,refreshRaw]);
  // console.log('refreshRaw',refreshRaw);

  const irrelevant = state.isIrrelevant;
  const dangerous = state.isDangerous;
  const cleanDataboolean = state.cleanData;
  console.log(irrelevant, 'irrelevant');
  console.log(dangerous, 'dangerous');
  console.log(cleanDataboolean, 'report status');

  return (
    <div className="mb-[2rem]">
      {user && user.role == 3 && (
        <Header href="/clean-data" title="Data Info" />
      )}
      {user && user.role == 1 && <Header href="/reports" title="Data Info" />}
      {user && user.role == 2 && (
        <Header href="/cleaned-data" title="Data Info" />
      )}
      {user && user.role == 4 && (
        <Header href="/dangerous-reports" title="Data Info" />
      )}

      <div className="flex  gap-x-6 h-full">
        <ReportSummary
          report={reports}
          incidentDescription={uncategorizedData?.summary?.incidentDescription}
          // update={refreshRaw}
          // role={user?.role}
          color={reports2 ? true : false}
        />
        {user?.role === Role.CLEANER && reports && (
          <ReportActions
            text={
              !reports2?.description
                ? reports?.description
                : reports2.description
            }
            WhatHappened={uncategorizedData?.summary.incidentDescription}
            report={reports2}
            refresh={refreshHandler}
            refreshCurrent={refreshCurrentHandler}
            action={reports.updatereport ? reports.updatereport.status : 'pending'}
          />
        )}
        {user?.role == Role.ADMIN && <CategorizeDataForm report={reports} />}
        {/* : (
        <CategorizeDataForm />) */}
      </div>
    </div>
  );
};

export default ReportSingle;
