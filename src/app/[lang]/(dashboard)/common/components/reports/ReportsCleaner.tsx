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
import { removeUserCookies, setUserCookies } from '@/cookies/cookies';
import AuthService from '@/services/authService';
import axios from 'axios';
import { useAuth } from '@/app/hooks/useAuth';
import { DecodeToken } from '../../../login/components/DecodeToken';

const ReportsCleaner = () => {
  const { user } = useAuth();

  const [refresh, setRefresh] = useState(true);

  const [status, setStatut] = useState(Category.Raw);
  const [reports, setReport] = useState<reportType2[]>([]);
 
  const [token, setToken] = useState('');

  const ctx = useContext(AuthContext);

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
               

                const item2 = { ...item };
               

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
       

          setReport(report1.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (token.length == 0 && refresh) {
      const response = new AuthService()
        .refreshToken()
        .then((result) => {
          if (result.status === 201) {
            const user = DecodeToken(result.headers.authorization);
            setToken(result.headers.authorization);

            user.then((result1) => {
              if (typeof result1 == 'object') {
                setUserCookies({
                  ...result1,
                  token: result.headers.authorization,
                });
              }
            });
          }
        })
        .catch((error) => {
          removeUserCookies();
          window.location.href = '/en/login';
        });
    }
    if (refresh && token.length > 0) {
      getReport(token);
      setRefresh(false);
    }
    if (!refresh && token.length > 0) {
      setTimeout(() => {
        setRefresh(true);
      }, 10000);
    }
  }, [refresh, token]);
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
