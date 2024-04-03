'use client';
import ReportContainCard from '@/app/components/dashboard/reports/ReportContainCard';
import React, { useEffect, useState } from 'react';

import { Button } from '@/app/components/button/Button';
import imgcatActive from '../../../../../../../public/images/Checkmark Starburst (1).svg';
import imgcatDesactive from '../../../../../../../public/images/Checkmark Starburst (1).svg';
import imgUncatDesactive from '../../../../../../../public/images/Square Dismiss.svg';
import imgUncatActive from '../../../../../../../public/images/Square Dismiss (1).svg';

import { Category } from '../report-card/reportCard.d';
import {
  reportsDataDangerous,
  reportsDataManaged,
} from '../../../dashboard/reports/reportsDataDangerous';
import axios from 'axios';
import { reportType } from '@/utils/shared-types';
import AuthService from '@/services/authService';
import { useAuth } from '@/app/hooks/useAuth';
import ReportCard from '../report-card/ReportCard';

const ReportsRiskManager = () => {
  const [status, setStatut] = useState(Category.Dangerous);
   const { user } = useAuth();
   const [token, setToken] = useState<string | undefined>();
   const [refresh, setRefresh] = useState(true);

   // const [status, setStatut] = useState(Category.Raw);
   const [reports, setReport] = useState<reportType[]>([]);
   // const { report, setReports } = UseReport();
   // const ctx = useContext(AuthContext);
  //  useEffect(() => {
  //    const response = new AuthService().refreshToken().catch((error) => {
  //      console.log('error', error);
  //      // removeUserCookies();
  //    });
  //  }, []);
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
           const report = result.data.reports.filter((item: reportType) => {
             if (
               item &&
               (item.status == 'Dangerous' ||
                 item.status == 'Managed')
             ) {
               return item;
             }
           });
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
               if (status == Category.Dangerous) {
                 if (
                   item &&
                   item.status == 'Dangerous'
                 ) {
                   return (
                     <ReportCard
                       key={item._id}
                       title={item._id ? item._id : 'PT0124'}
                       date={item.createdAt ? item.createdAt : ''}
                       href={`/dashboard/dangerous-reports/${item._id}`}
                       reportType={Category.Dangerous}
                     />
                   );
                 }
               } else {
                 if (
                   item &&
                   item.status !== 'Dangerous'
                 ) {
                   return (
                     <ReportCard
                       key={item._id}
                       title={item._id ? item._id : 'PT0124'}
                       date={item.createdAt ? item.createdAt : ''}
                       href={`/dashboard/dangerous-reports/${item._id}`}
                       reportType={Category.Managed}
                     />
                   );
                 }
               }
             })}
         </div>

         {/* {status == Category.Dangerous ? (
          <ReportContainCard
            href="/dashboard/dangerous-reports"
            data={reportsDataDangerous}
          />
        ) : (
          <ReportContainCard
            href="/dashboard/dangerous-reports"
            data={reportsDataManaged}
          />
        )} */}
       </div>

       <div className="flex w-fit fixed bottom-8  mt-14 ">
         <Button
           icon={
             status == Category.Dangerous ? imgUncatActive : imgUncatDesactive
           }
           className={`w-auto ${
             status == Category.Dangerous
               ? 'bg-black rounded-xl text-white font-semibold'
               : 'text-[#828B8C]  bg-transparent'
           }`}
           onClick={() => {
             setStatut(Category.Dangerous);
           }}
         >
           {Category.Dangerous}
         </Button>
         <Button
           icon={status == Category.Managed ? imgcatActive : imgcatDesactive}
           className={`w-auto ${
             status == Category.Managed
               ? 'bg-black rounded-xl text-white font-semibold'
               : 'text-[#828B8C] bg-transparent'
           }`}
           onClick={() => {
             setStatut(Category.Managed);
           }}
         >
           {Category.Managed}
         </Button>
       </div>
     </div>
   );
};

export default ReportsRiskManager;
