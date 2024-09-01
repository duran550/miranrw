'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from './Header';
import ReportSummary from './reports-cleaner/report-summary/ReportSummary';
import ReportActions from './reports-cleaner/report-actions/ReportActions';
import CategorizeDataForm from './reports-cleaner/form/CategorizeDataForm';
import { usePathname } from 'next/navigation';
import { reportsCardTableUncategorized } from '../../../dashboard/reports/reportsCardDatas';
import {
  ReportSummaryType,
  ReportType,
} from '../../../dashboard/reports/reportSummaryType';
import { useFindReport } from '@/app/hooks/useFindReport';
import { getAllUsers } from '@/services/userService';
import { useAuth } from '@/app/hooks/useAuth';
import { Role } from '@/utils/utils';
import ReportService from '@/services/reportService';
import { ReportAndCategoryType, reportType, reportType2 } from '@/utils/shared-types';
// import ReportSummaryCleanData from './reports-cleaner/report-summary/ReportSummaryCleanData';
import { AdminContext } from '../../context/AdminContext';
import { Spinner } from '@nextui-org/react';
import { AuthContext } from '@/app/context/AuthContext';
import { CategorizeContext } from '@/app/context/CategorizeContext';
import { getCatServer } from '@/utils/getCat';
import { getUserCookies, removeUserCookies } from '@/cookies/cookies';
import toast, { Toaster } from 'react-hot-toast';
import CategoryService from '@/services/categoryService';

const ReportSingle = () => {
  const { reports, setReports, IshowHandler, isShow } = useContext(AuthContext);
  const { fillReportCategory, addId, addDefaulCat, resetHandler } =
    useContext(CategorizeContext);
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const hasMounted = useRef(false);

  const { uncategorizedData } = useFindReport();
  const { user } = useAuth();
  const [reports1, setReport] = useState<reportType2 | undefined>();
  const [reports2, setReport2] = useState<reportType2 | undefined>();
  const [arrayCategorize, setArrayCategirize] = useState<
    ReportAndCategoryType[]
  >([]);
  const [refreshCurrent, setRefreshCurrent] = useState(false);

  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateReport = (status: string) => {
    reports1?.status2 && delete reports1.status2;
    reports1?.description2 && delete reports1.description2;
    reports1?.category2 && delete reports1.category2;
    const array = reports.map((items) => {
      if (items._id == reports1?._id) {
        return {
          ...reports1,
          status2: status,
          description2: undefined,
          category2: [],
        };
      } else {
        return items;
      }
    });
    setReports(array);
    setReport({
      ...reports1,
      status2: status,
      description2: undefined,
      category2: [],
    });
    setReport2(undefined);
  };
  const CleanReport = (description: string) => {
    reports1?.status2 && delete reports1.status2;
    reports1?.description2 && delete reports1.description2;
    reports1?.category2 && delete reports1.category2;
    const array = reports.map((items) => {
      if (items._id == reports1?._id) {
        return {
          ...reports1,
          status2: 'cleaned',
          description2: description,
          category2: [],
        };
      } else {
        return items;
      }
    });
    setReports(array);
    setReport2({
      ...reports1,
      status2: 'cleaned',
      description2: description,
      category2: [],
    });
  };
  const categorizeReport = (id: string, action: string) => {
    let array: reportType2[] = reports;
    if (action == 'delete') {
      array = reports.map((items) => {
        if (items._id == reports1?._id) {
          const line = items.categoryandreports?.filter(
            (item) => item._id != id
          );
          items.categoryandreports = line;
        }
        return items;
      });
    }

    if (action == 'add') {
      array = reports.map((items) => {
        if (items._id == reports1?._id) {
          items.categoryandreports?.push({ _id: id });
        }
        return items;
      });
    }

    setReports(array);
    // setReport({
    //   ...reports1,
    //   status2: 'cleaned',
    //   description2: description,
    //   category2: categorise,
    // });
  };
  // const refreshHandler = () => {
  //   setRefresh(true);
  //   setRefreshRaw(false);
  // };

  // const refreshCurrentHandler = () => {
  //   setRefreshCurrent(true);
  //   setRefreshRaw(true);
  // };
  useEffect(() => {
    const getHandler = () => {
       const response = new ReportService()
         .getAllReport()
         .then((result) => {
           const report1 = result.data.filter(
             (item) => item._id == urlSplit[urlSplit.length - 1]
           );
           setError2(report1.length == 0);

           if (
             report1[0] &&
             report1[0].updatereport &&
             report1[0].updatereport.length > 0 &&
             report1[0].updatereport[0].status &&
             report1[0].updatereport[0].status == 'cleaned' &&
             user?.role == 3
           ) {
             const report = { ...report1[0] };
             delete report1[0].updatereport;

             setReport2({
               ...report1[0],
               status2:
                 report.updatereport && report.updatereport[0].status
                   ? report.updatereport[0].status
                   : 'pending',
               description2:
                 report.updatereport && report.updatereport[0].description
                   ? report.updatereport[0].description
                   : undefined,
               category2:
                 report.updatereport && report.updatereport[0].category
                   ? [...report.updatereport[0].category]
                   : undefined,
             });
           } else {
             setReport2(undefined);
           }
           const report = { ...report1[0] };

           setReport({
             ...report1[0],
             status2:
               report.updatereport &&
               report.updatereport.length > 0 &&
               report.updatereport[0].status
                 ? report.updatereport[0].status
                 : 'pending',
             description2:
               report.updatereport &&
               report.updatereport.length > 0 &&
               report.updatereport[0].description
                 ? report.updatereport[0].description
                 : undefined,
             category2:
               report.updatereport &&
               report.updatereport.length > 0 &&
               report.updatereport[0].category
                 ? [...report.updatereport[0].category]
                 : [],
           });
            if (user?.role == 2) {
              const response2 = new CategoryService()
                .getCategoryByReport(urlSplit[urlSplit.length - 1])
                .then((result) => {
                  if (result.status == 200 || result.status == 201) {
                    if (result.data.data.length > 0) {
                      console.log(
                        result.data.data.filter(
                          (item) =>
                            item.report &&
                            item.report._id == urlSplit[urlSplit.length - 1]
                        ),
                        'logloglog'
                      );

                      setArrayCategirize(
                        result.data.data.filter(
                          (item) =>
                            item.report &&
                            item.report._id == urlSplit[urlSplit.length - 1]
                        )
                      );
                      // result.data.data.filter(
                      //   (item) =>
                      //     item.report &&
                      //     item.report._id == urlSplit[urlSplit.length - 1]
                      // ).map((items) => (
                      //   addId(items.category._id!)
                      // ))
                      fillReportCategory(
                        result.data.data.filter(
                          (item) =>
                            item.report &&
                            item.report._id == urlSplit[urlSplit.length - 1]
                        )
                      );
                    }
                    //  const response3 = new CategoryService().showDefaultCat(
                    //    urlSplit[urlSplit.length - 1]
                    //  ).then((result3) => {
                    //    addDefaulCat(result3.data)

                    //  }).catch((error) => { }).finally(() => {

                    setRefreshCurrent(false);
                    setLoad(false);
                    //  });
                  }
                })
                .catch((error) => {
                  setRefreshCurrent(false);
                  setLoad(false);
                });
            } else {
              setRefreshCurrent(false);
              setLoad(false);
            }
         })
         .catch((error: any) => {
           console.log(error);
           setLoad(false);
           setError(true);
           if (error.response.data.message == 'Access Denied. Invalid Token.') {
             toast.error(error.response.data.message);
             removeUserCookies();
             window.location.href = '/login';
           } else {
             setErrorMessage(error.response.data.message);
           }
         });
    }
         const find = async () => {
           const show: any[] = await getCatServer(
             getUserCookies().token,
             urlSplit[urlSplit.length - 1]
           );
           console.log('show=======', show);
           if (show.length > 0) {
             if (typeof show[0] == 'object') {
               addDefaulCat(show);
             }
           }
         };
    if (!hasMounted.current) {
      resetHandler();
      isShow && IshowHandler();
      find();

getHandler()
      //   setLoad(true);
     
      
    
      hasMounted.current = true;
    }

 
  }, []);

    useEffect(() => {
      if (refreshCurrent) {
        setLoad(true);
        const response2 = new CategoryService()
          .getCategoryByReport(reports1?._id!)
          .then((result) => {
            if (result.status == 200 || result.status == 201) {
              if (result.data.data.length > 0) {
                setArrayCategirize(
                  result.data.data.filter(
                    (item) => item.report && item.report._id == reports1?._id!
                  )
                );
                fillReportCategory(
                  result.data.data.filter(
                    (item) => item.report && item.report._id == reports1?._id!
                  )
                );
              }
            }
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          })
          .finally(() => {
            setRefreshCurrent(false);
            setLoad(false);
          });
      }
    }, [refreshCurrent]);

  return (
    <div className="pb-[2rem] sm:h-screen h-[calc(100vh-80px)] overflow-x-auto ">
      {user && user.role == 3 && (
        <Header href="/clean-data" title="Data Info" />
      )}
      {user && user.role == 1 && <Header href="/reports" title="Data Info" />}
      {user && user.role == 2 && (
        <Header href="/cleaned-data" title="Data Info" />
      )}
      {user && user.role == 4 && (
        <Header href="/dangerous-reports" title="Data Info" />
      )}
      <Toaster position="top-center" />
      {!load && !error && !error2 && (
        <div className="flex lg:flex-row   flex-col-reverse gap-6 ">
          <ReportSummary
            report={reports1}
            incidentDescription={
              uncategorizedData?.summary?.incidentDescription
            }
            color={reports2 ? true : false}
            array={arrayCategorize}
          />
          {(user?.role === Role.CLEANER || user?.role === Role.RISK_MANAGER) &&
            reports1 &&
            !error2 && (
              <ReportActions
                text={
                  !reports2?.description
                    ? reports1?.description
                    : reports2.description
                }
                WhatHappened={uncategorizedData?.summary.incidentDescription}
                report={reports2}
                action={reports1.status2 ? reports1.status2 : 'pending'}
                updateReport={updateReport}
                cleanReport={CleanReport}
              />
            )}
          {user?.role == Role.VIEWER && !error2 && (
            <>
              <CategorizeDataForm
                report={reports1}
                categoriseReport={categorizeReport}
                refreshCurrent={() => setRefreshCurrent(true)}
              />
            </>
          )}
        </div>
      )}

      {load && (
        <div className="text-center text-2xl h-[70vh] flex place-items-center w-full justify-center">
          <Spinner label="Loading . . . " color="primary" size="lg" />
        </div>
      )}
      {error && !load && (
        <p className="flex text-red-500 font-bold items-center justify-center text-3xl h-full">
          {errorMessage + ' waite a few moments for refresh the page'}
        </p>
      )}
    </div>
  );
};

export default ReportSingle;
