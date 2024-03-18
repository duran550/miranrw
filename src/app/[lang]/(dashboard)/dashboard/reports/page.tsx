'use client'
import ReportContainCard from '@/app/components/dashboard/reports/ReportContainCard';
import React, { useState } from 'react';
import { reportsCardTableCategorized, reportsCardTableUncategorized } from './reportsCardDatas';
import { Button } from '@/app/components/button/Button';
import imgcatActive from '../../../../../../public/images/Checkmark Starburst.svg'
import imgcatDesactive from '../../../../../../public/images/Checkmark Starburst (1).svg';
import imgUncatDesactive from '../../../../../../public/images/Square Dismiss.svg';
import imgUncatActive from '../../../../../../public/images/Square Dismiss (1).svg';




const Page = () => {
  const [status, setStatut] = useState('Uncategorised');
  return (
    <div className="w-full relative h-screen">
      <div>
        {status == 'Uncategorised' ? (
          <ReportContainCard data={reportsCardTableUncategorized} />
        ) : (
          <ReportContainCard data={reportsCardTableCategorized} />
        )}
      </div>

      <div className="flex w-fit  mt-14 ">
        <Button
          icon={status == 'Uncategorised' ? imgUncatActive : imgUncatDesactive}
          className={`w-auto ${
            status == 'Uncategorised'
              ? 'bg-black rounded-xl text-white font-semibold'
              : 'text-[#828B8C]  bg-transparent'
          }`}
          onClick={() => {
            setStatut('Uncategorised');
          }}
        >
          Uncategorised
        </Button>
        <Button
          icon={status == 'Categorised' ? imgcatActive : imgcatDesactive}
          className={`w-auto ${
            status == 'Categorised'
              ? 'bg-black rounded-xl text-white font-semibold'
              : 'text-[#828B8C] bg-transparent'
          }`}
          onClick={() => {
            setStatut('Categorised');
          }}
        >
          Categorised
        </Button>
      </div>
    </div>
  );
};

export default Page;
