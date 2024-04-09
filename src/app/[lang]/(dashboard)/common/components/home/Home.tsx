'use client';
import { useAuth } from '@/app/hooks/useAuth';
import { Role } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import HomeViewerAndAdmin from './HomeViewerAndAdmin';
import HomeCleaner from './HomeCleaner';
import HomeRiskManager from './HomeRiskManager';
import { getAllUsers } from '@/services/userService';
import AuthService from '@/services/authService';
import { Result } from 'postcss';
import ReportService, { getAllReport } from '@/services/reportService';
import { ReportType } from '../../../dashboard/reports/reportSummaryType';
import { reportType, reportType2 } from '@/utils/shared-types';
import { error } from 'console';
import { removeUserCookies } from '@/cookies/cookies';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(true);
  const [report, setReport] = useState<reportType2[]>([]);
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
        .then(function (response) {
          const { data } = response;
          console.log('data', data);
          let report1: reportType2[] = [];
          if (user?.role === 3 && data.length > 0) {
            const report = data.reverse().filter((item: reportType) => {
              if (
                item.updatereport &&
                item.updatereport.length > 0 &&
                item.updatereport[0].status
                &&
                item.updatereport[0].status == 'pending'
              ) {
                
                const item2 = { ...item };
                delete item.updatereport
                report1.push({
                  ...item,
                  status2: item2.updatereport && item2.updatereport[0].status
                    ? item2.updatereport[0].status
                    : 'pending',
                  description2: item2.updatereport && item2.updatereport[0].description
                    ? item2.updatereport[0].description
                    : undefined,
                  category2: item2.updatereport && item2.updatereport[0].category
                    ? [...item2.updatereport[0].category]
                    : undefined,
                });
              } else {
                if (!item.updatereport || (item.updatereport && item.updatereport.length===0)) {
                    delete item.updatereport;
                    report1.push({ ...item });
                }
              
              }
            
            });
            console.log('report.reverse()', report1);

            if (report1.length < 6 && report1.length > 0) {
              setReport(report1);
            } else {
              setReport(report1.slice(0, 5));
            }
          }

          if (
            (user?.role === 1 || user?.role == 2) &&
            data.length > 0
          ) {
            const report = data.reverse().filter((item: reportType) => {
              if (
                item.updatereport &&
                item.updatereport.length > 0 &&
                item.updatereport[0].status &&
                item.updatereport[0].status == 'cleaned' &&
                (!item.updatereport[0].category ||
                  (item.updatereport[0].category &&
                    item.updatereport[0].category.length==0))
              ) {
                console.log('okir', item._id);

                const item2 = { ...item };
                delete item.updatereport;
                report1.push({
                  ...item,
                  status2:
                    item2.updatereport && item2.updatereport[0].status
                      ? item2.updatereport[0].status
                      : 'pending',
                  description2:
                    item2.updatereport && item2.updatereport[0].description
                      ? item2.updatereport[0].description
                      : undefined,
                  category2:
                    item2.updatereport && item2.updatereport[0].category
                      ? [...item2.updatereport[0].category]
                      : [],
                });
              }
          
            });
            if (report1.length < 6 && report1.length > 0) {
              setReport(report1);
            } else {
              setReport(report1.slice(0, 5));
            }
          }

          if (user?.role === 4 && data.length > 0) {
            const report = data.reverse().filter((item: reportType) => {
              if (
                item.updatereport &&
                item.updatereport.length > 0 &&
                item.updatereport[0].status &&
                item.updatereport[0].status == 'Dangerous'
              ) {
                const item2 = { ...item };
                delete item.updatereport;
                report1.push({
                  ...item,
                  status2:
                    item2.updatereport && item2.updatereport[0].status
                      ? item2.updatereport[0].status
                      : 'pending',
                  description2:
                    item2.updatereport && item2.updatereport[0].description
                      ? item2.updatereport[0].description
                      : undefined,
                  category2:
                    item2.updatereport && item2.updatereport[0].category
                      ? [...item2.updatereport[0].category]
                      : undefined,
                });
              }
            });
           if (report1.length < 6 && report1.length > 0) {
             setReport(report1);
           } else {
             setReport(report1.slice(0, 5));
           }
          }
        })
        .catch(function (error) {
          console.error(error);
          //  setIsLoad(false);
        });
    } catch (error) {
      // setIsLoad(false);
    }

    setRefresh(false);
  };

  // useEffect(() => {
  //   const response = new AuthService().refreshToken().catch((error) => {
  //     console.log('error', error);
  //     //  removeUserCookies()

  //   })

  // },[])

  useEffect(() => {
    if (refresh) {
      getReport(user?.token!);
      setRefresh(false);
    }
    if (!refresh) {
      setTimeout(() => {
        setRefresh(true);
      }, 10000);
    }
  }, [refresh]);
  return (
    <>
      {user?.role === Role.ADMIN ? (
        <HomeViewerAndAdmin report={report} />
      ) : user?.role === Role.VIEWER ? (
        <HomeViewerAndAdmin report={report} />
      ) : user?.role === Role.CLEANER ? (
        <HomeCleaner report={report} />
      ) : (
        user && <HomeRiskManager report={report} />
      )}
    </>
  );
};

export default Home;
