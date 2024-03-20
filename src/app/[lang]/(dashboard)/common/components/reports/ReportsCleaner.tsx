'use client';
import ReportContainCard from '@/app/components/dashboard/reports/ReportContainCard';
import React, { useState } from 'react';

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

const ReportsCleaner = () => {
  const [status, setStatut] = useState(Category.Raw);
  return (
    <div className="w-full relative  h-fit">
      <h1 className="text-2xl font-bold my-8">All reports</h1>
      <h2 className="font-bold  opacity-80">{`${status} Data`}</h2>
      <p className="text-sm opacity-70">Click to view data details</p>
      <div className="mt-8">
        {status == Category.Raw ? (
          <ReportContainCard
            href="/dashboard/clean-data"
            data={reportsDataRaw}
          />
        ) : (
          <ReportContainCard
            href="/dashboard/clean-data"
            data={reportsDataCleaned}
          />
        )}
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
