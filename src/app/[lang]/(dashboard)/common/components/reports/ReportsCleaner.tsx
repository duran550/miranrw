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
  reportsDataCleaned,
  reportsDataRaw,
} from '../../../dashboard/reports/reportsDataCleanedAndRaw';
import ReportService from '@/services/reportService';
import ReportCard from '../report-card/ReportCard';
import { reportType } from '@/utils/shared-types';
import Link from 'next/link';
import { UseReport } from '@/app/hooks/useReports';

const ReportsCleaner = () => {
  const [status, setStatut] = useState(Category.Raw);
  const [reports, setReport] = useState<reportType[]>([]);
  const{report,setReports}= UseReport()
  useEffect(() => {
   if (report.length==0) {
     const response = new ReportService()
       .getAllReport()
       .then((result) => {
         console.log('report', result.data.reports);
         setReports(result.data.reports);
        //  setReports();
       })
       .then((error) => {
         console.log(error);
       });
   }
    console.log(report);
    
  }, [report]);
  return (
    <div className="w-full relative  h-fit">
      <h1 className="text-2xl font-bold my-8">All reports</h1>
      <h2 className="font-bold  opacity-80">{`${status} Data`}</h2>
      <p className="text-sm opacity-70">Click to view data details</p>
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-5 max-h-[60vh] overflow-y-auto overscroll-none no-scrollbar">
          {' '}
          {report.length > 0 &&
            report.map((item, index) => (
             
                <ReportCard
                  key={item._id}
                  title={item._id ? item._id : 'PT0124'}
                  date={item.createdAt ? item.createdAt : ''}
                  href={`/en/dashboard/clean-data/${item._id}`}
                  reportType={item.status=='pending' ? Category.Raw : Category.Cleaned}
                />
             
            ))}
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
