'use client';
import ReportContainCard from '@/app/components/dashboard/reports/ReportContainCard';
import React, { useEffect, useState } from 'react';

import { Button } from '@/app/components/button/Button';
import imgcatActive from '../../../../../../../public/images/Checkmark Starburst (1).svg';
import imgcatDesactive from '../../../../../../../public/images/Checkmark Starburst (1).svg';
import imgUncatDesactive from '../../../../../../../public/images/Square Dismiss.svg';
import imgUncatActive from '../../../../../../../public/images/Square Dismiss (1).svg';
import {
  reportsCardTableCategorized,
  reportsCardTableUncategorized,
} from '../../../dashboard/reports/reportsCardDatas';
import { Category } from '../report-card/reportCard.d';
import { reportType } from '@/utils/shared-types';
import { useAuth } from '@/app/hooks/useAuth';
import AuthService from '@/services/authService';
import axios from 'axios';
import ReportCard from '../report-card/ReportCard';

const ReportsViewerAndAdmin = () => {
  const [status, setStatut] = useState(Category.Uncategorized);
  const { user } = useAuth();
  const [token, setToken] = useState<string | undefined>();
  const [refresh, setRefresh] = useState(true);

  // const [status, setStatut] = useState(Category.Raw);
  const [reports, setReport] = useState<reportType[]>([]);
  // const { report, setReports } = UseReport();
  // const ctx = useContext(AuthContext);
  useEffect(() => {
    const response = new AuthService().refreshToken().catch((error) => {
      console.log('error', error);
      // removeUserCookies();
    });
  }, []);
  const getReport = async (token: string) => {
    const options = {
      method: 'GET',
      url: '/api/report',

      headers: {
        Authorization: `${token}`,
        'content-type': 'application/json',
      },
    };

    try {
      await axios
        .request(options)
        .then((result) => {
          console.log('report', result.data.reports);
          const report = result.data.reports.filter(
            (item: reportType) => item.status == 'cleaned'
          );
          setReport(report.reverse());
          //  setReports(result.data.reports);
          //  setReports();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (refresh) {
      //  console.log(1);
      getReport(user?.token!);
      setRefresh(false);
      //  getReport();
    }
    if (!refresh) {
      setTimeout(() => {
        setRefresh(true);
      }, 10000);
    }
  }, [refresh]);
  return (
    <div className="w-full relative  h-fit">
      <h1 className="text-2xl font-bold my-8">All reports</h1>
      <h2 className="font-bold  opacity-80">{`${status} Data`}</h2>
      <p className="text-sm opacity-70">Click to view data details</p>
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-5 max-h-[60vh] overflow-y-auto overscroll-none no-scrollbar">
          {reports.length > 0 &&
            reports.map((item, index) => {
              if (status == Category.Uncategorized) {
                if (item.category && item.category.length == 0) {
                  return (
                    <ReportCard
                      key={item._id}
                      title={item._id ? item._id : 'PT0124'}
                      date={item.createdAt ? item.createdAt : ''}
                      href={
                        `/dashboard/cleaned-reports/${item._id}`
                          
                      }
                      reportType={
                        item.category?.length == 0
                          ? Category.Uncategorized
                          : Category.Categorized
                      }
                    />
                  );
                }
              } else {
                if (item.category && item.category.length > 0) {
                  return (
                    <ReportCard
                      key={item._id}
                      title={item._id ? item._id : 'PT0124'}
                      date={item.createdAt ? item.createdAt : ''}
                      href={
                        user && user?.role == 1
                          ? `/dashboard/cleaned-reports/${item._id}`
                          : '#'
                      }
                      reportType={
                        item.category?.length == 0
                          ? Category.Uncategorized
                          : Category.Categorized
                      }
                    />
                  );
                }
              }
            })}
        </div>
        {/* {status == Category.Uncategorized ? (
          <ReportContainCard
            href="/dashboard/cleaned-reports"
            data={reportsCardTableUncategorized}
          />
        ) : (
          <ReportContainCard
            href="/dashboard/cleaned-reports"
            data={reportsCardTableCategorized}
          />
        )} */}
      </div>

      <div className="flex w-fit fixed bottom-8  mt-14 ">
        <Button
          icon={
            status == Category.Uncategorized
              ? imgUncatActive
              : imgUncatDesactive
          }
          className={`w-auto ${
            status == Category.Uncategorized
              ? 'bg-black rounded-xl text-white font-semibold'
              : 'text-[#828B8C]  bg-transparent'
          }`}
          onClick={() => {
            setStatut(Category.Uncategorized);
          }}
        >
          {Category.Uncategorized}
        </Button>
        <Button
          icon={status == Category.Categorized ? imgcatActive : imgcatDesactive}
          className={`w-auto ${
            status == Category.Categorized
              ? 'bg-black rounded-xl text-white font-semibold'
              : 'text-[#828B8C] bg-transparent'
          }`}
          onClick={() => {
            setStatut(Category.Categorized);
          }}
        >
          {Category.Categorized}
        </Button>
      </div>
    </div>
  );
};

export default ReportsViewerAndAdmin;
