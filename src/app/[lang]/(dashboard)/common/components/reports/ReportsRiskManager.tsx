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
import { DecodeToken } from '../../../login/components/DecodeToken';
import { removeUserCookies, setUserCookies } from '@/cookies/cookies';
import { Spinner } from '@nextui-org/react';

const ReportsRiskManager = () => {
  const [status, setStatut] = useState(Category.Dangerous);
  const { user } = useAuth();
  const [token, setToken] = useState('');
  const [refresh, setRefresh] = useState(true);
const [load, setLoad] = useState(true);
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

const [reports, setReport] = useState<reportType2[]>([]);

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
            item.updatereport &&
            item.updatereport.length > 0 &&
            (item.updatereport[0].status?.toLocaleLowerCase() == 'dangerous' ||
              item.updatereport[0].status?.toLocaleLowerCase() == 'managed')
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
        setReport(report1.reverse());
         setLoad(false);
         setError(false);
      })
      .catch((error) => {
        console.log(error);
         setLoad(false);
         setError(true);
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
          setError(false)
        }
      })
      .catch((error) => {
        setLoad(false);
        setErrorMessage(error.response.data.message);
        setError(true);

        if (typeof error.response.data.message == 'string') {
          if (error.response.data.message !== 'Too Many Requests.') {
            removeUserCookies();
            window.location.href = '/en/login';
          }
        }
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
        {!load && !error && (
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
                        date={item.updatedAt ? item.updatedAt : ''}
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
                        date={item.updatedAt ? item.updatedAt : ''}
                        href={`/dashboard/dangerous-reports/${item._id}`}
                        reportType={Category.Managed}
                      />
                    );
                  }
                }
              })}
          </div>
        )}
        {load && (
          <div className="text-center text-2xl h-[70vh] flex place-items-center w-full justify-center">
            {/* <p>chargement patientez...</p> */}
            <Spinner label="Loading . . . " color="primary" size="lg" />
          </div>
        )}
        {error && !load && (
          <p className="flex items-center justify-center text-5xl h-full">
            {errorMessage + ' waite a few moments for retry'}
          </p>
        )}
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
