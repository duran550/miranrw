'use client';
import { useAuth } from '@/app/hooks/useAuth';
import { Role } from '@/utils/utils';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { removeUserCookies, setUserCookies } from '@/cookies/cookies';
import axios from 'axios';
import { DecodeToken } from '../../../login/components/DecodeToken';
import { Spinner } from '@nextui-org/react';
import { AuthContext } from '@/app/context/AuthContext';

const Home = () => {
  const {
    reports,
    setReports,
    total,
    totalWeek,
    setNumbers,
    isShow,
    IshowHandler,
  } = useContext(AuthContext);
  const hasMounted = useRef(false);
  const [load, setLoad] = useState(true);
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const [get, setGet] = useState(false);
  const [token, setToken] = useState('');
  const [report, setReport] = useState<reportType2[]>(reports.slice(0, 5));
  // const [dangerous, setDangerous] = useState(0);

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
      let total = 0;
      let total_week = 0;

      await axios
        .request(options)
        .then(function (response) {
          const { data } = response;

          let report1: reportType2[] = [];
          if (user?.role === 3 && data.length > 0) {
            const report = data.reverse().filter((item: reportType) => {
              const differenceDate =
                new Date().getTime() - new Date(item.createdAt!).getTime();
              if (
                item.updatereport &&
                item.updatereport.length > 0 &&
                item.updatereport[0].status &&
                item.updatereport[0].status == 'pending'
              ) {
                total++;
                // console.log(Math.round(differenceDate / (1000 * 3600 * 24)));

                if (Math.round(differenceDate / (1000 * 3600 * 24)) <= 7) {
                  total_week++;
                }
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
              } else {
                if (
                  !item.updatereport ||
                  (item.updatereport && item.updatereport.length === 0)
                ) {
                  delete item.updatereport;
                  report1.push({ ...item });

                  total++;
                  // console.log(Math.round(differenceDate / (1000 * 3600 * 24)));

                  if (Math.round(differenceDate / (1000 * 3600 * 24)) <= 7) {
                    total_week++;
                  }
                }
              }
            });

            if (report1.length < 6 && report1.length > 0) {
              setReport(report1);
            } else {
              setReport(report1.slice(0, 5));
            }
          }

          if (user?.role == 2 && data.length > 0) {
            const report = data.reverse().filter((item: reportType) => {
              const differenceDate =
                new Date().getTime() - new Date(item.updatedAt!).getTime();

              if (
                item.updatereport &&
                item.updatereport.length > 0 &&
                item.updatereport[0].status &&
                item.updatereport[0].status == 'cleaned' &&
                item.categoryandreports && item.categoryandreports.length==0
              ) {
                // console.log(Math.round(differenceDate / (1000 * 3600 * 24)));

                total++;
                if (Math.round(differenceDate / (1000 * 3600 * 24)) <= 7) {
                  total_week++;
                }
              }

              if (
                item.updatereport &&
                item.updatereport.length > 0 &&
                item.updatereport[0].status &&
                item.updatereport[0].status == 'cleaned' &&
                (!item.updatereport[0].category ||
                  (item.updatereport[0].category &&
                    item.updatereport[0].category.length == 0))
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
              const differenceDate =
                new Date().getTime() - new Date(item.updatedAt!).getTime();

              if (
                item.updatereport &&
                item.updatereport.length > 0 &&
                item.updatereport[0].status &&
                item.updatereport[0].status == 'Dangerous'
              ) {
                // console.log(Math.round(differenceDate / (1000 * 3600 * 24)));

                if (Math.round(differenceDate / (1000 * 3600 * 24)) <= 7) {
                  total_week++;
                }
                total++;

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
            setReports(report1);
            // if (report1.length < 6 && report1.length > 0) {
            //   setReports(report1);
            // } else {
            setReport(report1.slice(0, 5));
            // }
          }
          setNumbers(total, total_week);
          setTimeout(() => {
            setRefresh((preview) => preview + 1);
          }, 60000);
          // setTotal(total);
          // setTotalWeek(total_week);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
    } finally {
      setLoad(false);
    }

    // setRefresh(false);
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
    <div className="w-full overflow-x-hidden overflow-y-hidden h-screen">
      {load ? (
        <div className="text-center text-2xl h-[70vh] flex place-items-center w-full justify-center">
          {/* <p>chargement patientez...</p> */}
          <Spinner label="Loading . . . " color="primary" size="lg" />
        </div>
      ) : user?.role === Role.ADMIN ? (
        <HomeViewerAndAdmin
          report={report}
          total={total}
          total_week={totalWeek}
        />
      ) : user?.role === Role.VIEWER ? (
        <HomeViewerAndAdmin
          report={report}
          total={total}
          total_week={totalWeek}
        />
      ) : user?.role === Role.CLEANER ? (
        <HomeCleaner report={report} total={total} total_week={totalWeek} />
      ) : (
        user && (
          <HomeRiskManager
            report={report}
            total={total}
            total_week={totalWeek}
          />
        )
      )}
    </div>
  );
};

export default Home;
