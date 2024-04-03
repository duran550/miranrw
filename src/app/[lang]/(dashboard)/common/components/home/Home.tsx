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
import { reportType } from '@/utils/shared-types';
import { error } from 'console';
import { removeUserCookies } from '@/cookies/cookies';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const [refresh,setRefresh]=useState(true)
  const [report, setReport] = useState<reportType[]>([])
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
            console.log('data', data.reports);
             if (user?.role === 3 && data.reports.length > 0) {
               const report = data.reports
                 .reverse()
                 .filter((item: reportType) => {
                   if (
                     !item.updatereport ||
                     (item.updatereport &&
                       item.updatereport.status == 'pending')
                   ) {
                     return item;
                   }
                 });
               console.log('report.reverse()', report);

               if (report.length < 6 && report.length > 0) {
                 setReport(report);
               } else {
                 setReport(report.slice(0, 5));
               }
             }

             if (
               (user?.role === 1 || user?.role == 2) &&
               data.reports.length > 0
             ) {
               const report = data.reports
                 .reverse()
                 .filter((item: reportType) => {
                   if (
                     item.updatereport &&
                     item.updatereport.status == 'cleaned'
                   ) {
                     return item;
                   }
                 });
               if (report.length < 6 && report.length > 0) {
                 setReport(report);
               } else {
                 setReport(report.slice(0, 5));
               }
             }

             if (user?.role === 4 && data.reports.length > 0) {
               const report = data.reports
                 .reverse()
                 .filter((item: reportType) => {
                   if (
                     item.updatereport &&
                     item.updatereport.status == 'Dangerous'
                   ) {
                     return item;
                   }
                 });
               if (report.length < 6 && report.length > 0) {
                 setReport(report);
               } else {
                 setReport(report.slice(0, 5));
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
   
    setRefresh(false)
   
  }

  // useEffect(() => {
  //   const response = new AuthService().refreshToken().catch((error) => {
  //     console.log('error', error);
  //     //  removeUserCookies()

      
  //   })
 

  // },[])
 
  useEffect(() => {
    if (refresh) {
    
       getReport(user?.token!)
  setRefresh(false)
  
    }
    if (!refresh) {
      setTimeout(() => {
        setRefresh(true)
      }, 10000)
    }
   
   
   
  },[refresh])
  return (
    <>
      {user?.role === Role.ADMIN ? (
        <HomeViewerAndAdmin report={report} />
      ) : user?.role === Role.VIEWER ? (
        <HomeViewerAndAdmin report={report}/>
      ) : user?.role === Role.CLEANER ? (
        <HomeCleaner report={report} />
      ) : (
        user && <HomeRiskManager report={report}/>
      )}
    </>
  );
};

export default Home;
