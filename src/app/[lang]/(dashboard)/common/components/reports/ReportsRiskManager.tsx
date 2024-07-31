'use client';
import ReportContainCard from '@/app/components/dashboard/reports/ReportContainCard';
import React, { useContext, useEffect, useRef, useState } from 'react';

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
import { AuthContext } from '@/app/context/AuthContext';

const ReportsRiskManager = () => {
  const { reports, setReports, IshowHandler, isShow } = useContext(AuthContext);
  const hasMounted = useRef(false);

  const [status, setStatut] = useState(Category.Dangerous);
  const { user } = useAuth();
  const [token, setToken] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [load, setLoad] = useState(reports.length == 0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const [reports, setReport] = useState<reportType2[]>([]);

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
              (item.updatereport[0].status?.toLocaleLowerCase() ==
                'dangerous' ||
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
          setReports(report1.reverse());
          setLoad(false);
          setError(false);
          setTimeout(async () => {
            setRefresh((preview) => preview + 1);
          }, 60000);
        })
        .catch((error) => {
          console.log(error);
          setLoad(false);
          setError(true);
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (!hasMounted.current) {
      console.log('Effect executed');
      // Votre requête ici
      isShow && IshowHandler();
      const response = new AuthService()
        .refreshToken()
        .then(async (result) => {
          if (result.status === 201) {
            const user = DecodeToken(result.headers.authorization);
            setToken(result.headers.authorization);
            await getReport(result.headers.authorization);

            user.then((result1) => {
              if (typeof result1 == 'object') {
                setUserCookies({
                  ...result1,
                  token: result.headers.authorization,
                });
                setRefresh(1);
              }
            });
          }
        })
        .catch((error) => {
          if (typeof error.response.data.message == 'string') {
            if (error.response.data.message !== 'Too Many Requests.') {
              removeUserCookies();
              window.location.href = '/en/login';
            }
          }
        });
      hasMounted.current = true;
    }
  }, []);
  useEffect(() => {
    if (refresh >= 2) {
      getReport(token);
    }
  }, [refresh]);
  return (
    <div className="w-full relative  h-fit">
      <h1 className="text-2xl font-bold sm:my-8">All reports</h1>

      <h2 className="font-bold  opacity-80">{`${status} Data`}</h2>
      <p className="text-sm opacity-70">Click to view data details</p>
      <div className="mt-8">
        {!load && !error && (
          <div className="flex  flex-wrap gap-5 md:h-[calc(100vh-350px)] h-[calc(100vh-310px)] mb-5 overflow-y-auto  no-scrollbar ">
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
          <div className="flex  flex-wrap gap-5 md:h-[calc(100vh-350px)] h-[calc(100vh-310px)] mb-5 overflow-y-auto  no-scrollbar ">
            {/* <p>chargement patientez...</p> */}
            <Spinner label="Loading . . . " color="primary" size="lg" />
          </div>
        )}
        {error && !load && (
          <p className="flex  flex-wrap gap-5 md:h-[calc(100vh-350px)] h-[calc(100vh-310px)] mb-5 overflow-y-auto  no-scrollbar ">
            {errorMessage + ' waite a few moments for retry'}
          </p>
        )}
      </div>

      <div className="flex w-fit h-16 sm:text-sm text-xs   ">
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
