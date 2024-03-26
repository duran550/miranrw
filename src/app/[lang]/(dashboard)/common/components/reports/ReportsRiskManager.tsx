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
  reportsDataDangerous,
  reportsDataManaged,
} from '../../../dashboard/reports/reportsDataDangerous';

const ReportsRiskManager = () => {
  const [status, setStatut] = useState(Category.Dangerous);
  return (
    <div className="w-full relative  h-fit">
      <h1 className="text-2xl font-bold my-8">All reports</h1>
      <h2 className="font-bold  opacity-80">{`${status} Data`}</h2>
      <p className="text-sm opacity-70">Click to view data details</p>
      <div className="mt-8">
        {status == Category.Dangerous ? (
          <ReportContainCard
            href="/dashboard/dangerous-reports"
            data={reportsDataDangerous}
          />
        ) : (
          <ReportContainCard
            href="/dashboard/dangerous-reports"
            data={reportsDataManaged}
          />
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
