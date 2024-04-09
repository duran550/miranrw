'use client';
import ReportContainCard from '@/app/components/dashboard/reports/ReportContainCard';
import React, { useContext, useEffect, useState, Suspense } from 'react';
// import { Suspense } from 'react';
import { headers } from 'next/headers';
import { Button } from '@/app/components/button/Button';
import imgcatActive from '../../../../../../../public/images/Checkmark Starburst (1).svg';
import imgcatDesactive from '../../../../../../../public/images/Checkmark Starburst (1).svg';
import imgUncatDesactive from '../../../../../../../public/images/Square Dismiss.svg';
import imgUncatActive from '../../../../../../../public/images/Square Dismiss (1).svg';

import { Category } from '../report-card/reportCard.d';
import {
  reportsDataCleaned,
  reportsDataRaw,
} from '../../../dashboard/reports/reportsDataCleanedAndRaw';
import ReportService from '@/services/reportService';
import ReportCard from '../report-card/ReportCard';
import { reportType, reportType2 } from '@/utils/shared-types';
import Link from 'next/link';
import { UseReport } from '@/app/hooks/useReports';
import { AuthContext } from '@/app/context/AuthContext';
import { removeUserCookies } from '@/cookies/cookies';
import AuthService from '@/services/authService';
import axios from 'axios';
import { useAuth } from '@/app/hooks/useAuth';

const ReportsCleaner = () => {
  const { user } = useAuth();
  const [token, setToken] = useState<string | undefined>();
  const [refresh, setRefresh] = useState(true);

  const [status, setStatut] = useState(Category.Raw);
  const [reports, setReport] = useState<reportType2[]>([]);
  const { report, setReports } = UseReport();
  const ctx = useContext(AuthContext);
  // useEffect(() => {
  //   const response = new AuthService().refreshToken().catch((error) => {
  //     console.log('error', error);
  //     // removeUserCookies();
  //   });
  // }, []);
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
      let report1: reportType2[] = [];
      await axios
        .request(options)
        .then((result) => {
          // console.log('report', result);
          const report = result.data.filter((item: reportType) => {
            if (
              !item.updatereport ||
              (item.updatereport && item.updatereport.length == 0)
            ) {
              delete item.updatereport;
              report1.push({ ...item });
            } else {
              if (
                item.updatereport.length > 0 &&
                (item.updatereport[0].status?.toLocaleLowerCase() ==
                  'pending' ||
                  item.updatereport[0].status?.toLocaleLowerCase() ==
                    'cleaned' ||
                  item.updatereport[0].status?.toLocaleLowerCase() ==
                    'irrelevant')
              ) {
                 console.log('item', item._id);
                // console.log('ok', item.updatereport[0].status);

                // console.log();

                const item2 = {...item} ;
                // console.log('item2',item2?.updatereport);
                
                delete item.updatereport;
                report1.push({
                  ...item,
                  status2:
                    item2.updatereport &&
                    item2.updatereport.length > 0 &&
                    item2.updatereport[0].status
                      ? item2.updatereport[0].status
                      : undefined,

                  description2:
                    item2.updatereport &&
                    item2.updatereport.length > 0 &&
                    item2.updatereport[0].description
                      ? item2.updatereport[0].description
                      : undefined,
                  category2:
                    item2.updatereport &&
                    item2.updatereport.length > 0 &&
                    item2.updatereport[0].category
                      ? [...item2.updatereport[0].category]
                      : undefined,
                });
              
              }
            }
          });
          // console.log('report1', report1);

          setReport(report1.reverse());
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
          {' '}
          {reports.length > 0 &&
            reports.map((item, index) => {
              if (status == Category.Raw) {
                if (
                  !item.status2 ||
                  (item.status2 && item.status2 == 'pending')
                ) {
                  return (
                    <ReportCard
                      key={item._id}
                      title={item._id ? item._id : 'PT0124'}
                      date={item.createdAt ? item.createdAt : ''}
                      href={`/en/dashboard/clean-data/${item._id}`}
                      reportType={Category.Raw}
                    />
                  );
                }
              } else {
                if (item.status2 && item.status2 !== 'pending') {
                  return (
                    <ReportCard
                      key={item._id}
                      title={item._id ? item._id : 'PT0124'}
                      date={item.createdAt ? item.createdAt : ''}
                      href={`/en/dashboard/clean-data/${item._id}`}
                      reportType={
                        item.status2 == 'cleaned'
                          ? Category.Cleaned
                          : Category.Irrelevant
                      }
                    />
                  );
                }
              }
            })}
        </div>

        {/* {status == Category.Raw ? (
          <ReportContainCard
            href="/dashboard/clean-data"
            data={reportsDataRaw}
          />
        ) : (
          <ReportContainCard
            href="/dashboard/clean-data"
            data={reportsDataCleaned}
          />
        )} */}
      </div>

      <div className="flex w-fit fixed bottom-8  mt-14 ">
        <Button
          icon={status == Category.Raw ? imgUncatActive : imgUncatDesactive}
          className={`w-auto ${
            status == Category.Raw
              ? 'bg-black rounded-xl text-white font-semibold'
              : 'text-[#828B8C]  bg-transparent'
          }`}
          onClick={() => {
            setStatut(Category.Raw);
          }}
        >
          {Category.Raw} Data
        </Button>
        <Button
          icon={status == Category.Cleaned ? imgcatActive : imgcatDesactive}
          className={`w-auto ${
            status == Category.Cleaned
              ? 'bg-black rounded-xl text-white font-semibold'
              : 'text-[#828B8C] bg-transparent'
          }`}
          onClick={() => {
            setStatut(Category.Cleaned);
          }}
        >
          {Category.Cleaned} Data
        </Button>
      </div>
    </div>
  );
};

export default ReportsCleaner;
