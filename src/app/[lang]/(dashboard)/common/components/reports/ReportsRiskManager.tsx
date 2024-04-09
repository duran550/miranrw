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
import { reportType, reportType2 } from '@/utils/shared-types';
import AuthService from '@/services/authService';
import { useAuth } from '@/app/hooks/useAuth';
import ReportCard from '../report-card/ReportCard';

const ReportsRiskManager = () => {
  const [status, setStatut] = useState(Category.Dangerous);
  const { user } = useAuth();
  const [token, setToken] = useState<string | undefined>();
  const [refresh, setRefresh] = useState(true);


  const [reports, setReport] = useState<reportType2[]>([]);
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
      let report1: reportType2[] = [];

      await axios
        .request(options)
        .then((result) => {
          console.log('report', result.data);
          const report = result.data.filter((item: reportType) => {
            if (
              item.updatereport &&
              item.updatereport.length > 0 &&
              (item.updatereport[0].status?.toLocaleLowerCase() ==
                'dangerous' ||
                item.updatereport[0].status?.toLocaleLowerCase() == 'managed')
            ) {
              const item2 = {...item};
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
          setReport(report1.reverse());
       
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };
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
                  item.status2 &&
                  item.status2.toLocaleLowerCase() == 'dangerous'
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
                  item.status2 &&
                  item.status2.toLocaleLowerCase() !== 'dangerous'
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
