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
import { reportType, reportType2 } from '@/utils/shared-types';
import ReportSummaryCleanData from './reports-cleaner/report-summary/ReportSummaryCleanData';
import { AdminContext } from '../../context/AdminContext';

const ReportSingle = () => {
  const pathname = usePathname();
  const urlSplit = pathname.split('/');

  const { uncategorizedData } = useFindReport();
  const { user } = useAuth();
  const [reports, setReport] = useState<reportType2 | undefined>();
  const [reports2, setReport2] = useState<reportType2 | undefined>();

  const [refresh, setRefresh] = useState(false);
  const [refreshRaw, setRefreshRaw] = useState(false);

  const [refreshCurrent, setRefreshCurrent] = useState(false);


  const [load, setLoad] = useState(true);

  const refreshHandler = () => {
    setRefresh(true);
    setRefreshRaw(false);
  };

  const refreshCurrentHandler = () => {
    setRefreshCurrent(true);
    setRefreshRaw(true);
  };
  useEffect(() => {
    if (!reports || refreshCurrent) {
      setLoad(true);
      const response = new ReportService()
        .getAllReport()
        .then((result) => {
          const report1 = result.data.filter(
            (item) => item._id == urlSplit[urlSplit.length - 1]
          );

          if (
            report1[0] &&
            report1[0].updatereport &&
            report1[0].updatereport.length > 0 &&
            report1[0].updatereport[0].status &&
            report1[0].updatereport[0].status == 'cleaned' &&
            user?.role == 3
          ) {
            const report = { ...report1[0] };
            delete report1[0].updatereport;

            setReport2({
              ...report1[0],
              status2:
                report.updatereport && report.updatereport[0].status
                  ? report.updatereport[0].status
                  : 'pending',
              description2:
                report.updatereport && report.updatereport[0].description
                  ? report.updatereport[0].description
                  : undefined,
              category2:
                report.updatereport && report.updatereport[0].category
                  ? [...report.updatereport[0].category]
                  : undefined,
            });
            console.log('reports2', {
              ...report1[0],
              status2:
                report.updatereport && report.updatereport[0].status
                  ? report.updatereport[0].status
                  : 'pending',
              description2:
                report.updatereport && report.updatereport[0].description
                  ? report.updatereport[0].description
                  : undefined,
              category2:
                report.updatereport && report.updatereport[0].category
                  ? [...report.updatereport[0].category]
                  : undefined,
            });
          } else {
            setReport2(undefined);
          }
          const report = { ...report1[0] };

          setReport({
            ...report1[0],
            status2:
              report.updatereport &&
              report.updatereport.length > 0 &&
              report.updatereport[0].status
                ? report.updatereport[0].status
                : 'pending',
            description2:
              report.updatereport &&
              report.updatereport.length > 0 &&
              report.updatereport[0].description
                ? report.updatereport[0].description
                : undefined,
            category2:
              report.updatereport &&
              report.updatereport.length > 0 &&
              report.updatereport[0].category
                ? [...report.updatereport[0].category]
                : [],
          });
          setRefreshCurrent(false);
          setLoad(false);
        })
        .then((error) => {
          console.log(error);
          setLoad(false);
        });
    }

    if (refresh) {
      setLoad(true);

      const response = new ReportService()
        .getAllReport()
        .then((result) => {
          const report1 = result.data.filter(
            (item) => item._id == urlSplit[urlSplit.length - 1]
          );
          const report = { ...report1[0] };
          report1[0].updatereport && delete report1[0].updatereport;

          setReport2({
            ...report1[0],
            status2:
              report.updatereport && report.updatereport[0].status
                ? report.updatereport[0].status
                : 'pending',
            description2:
              report.updatereport && report.updatereport[0].description
                ? report.updatereport[0].description
                : undefined,
            category2:
              report.updatereport && report.updatereport[0].category
                ? [...report.updatereport[0].category]
                : undefined,
          });
          setRefresh(false);
          setLoad(false);
        })
        .then((error) => {
          console.log(error);
          setLoad(false);
        });
    }
  }, [reports, refresh, refreshCurrent, refreshRaw]);



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

      {!load && (
        <div className="flex  gap-x-6 h-full">
          <ReportSummary
            report={reports}
            incidentDescription={
              uncategorizedData?.summary?.incidentDescription
            }
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
              action={reports.status2 ? reports.status2 : 'pending'}
            />
          )}
          {user?.role == Role.ADMIN && (
            <CategorizeDataForm
              report={reports}
              refreshCurrent={refreshCurrentHandler}
            />
          )}
        </div>
      )}

      {load && (
        <p className="flex items-center justify-center text-5xl">loading...</p>
      )}
    </div>
  );
};

export default ReportSingle;
