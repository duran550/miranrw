'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import ReportSummary from './reports-cleaner/report-summary/ReportSummary';
import ReportActions from './reports-cleaner/report-actions/ReportActions';
import CategorizeDataForm from './reports-cleaner/form/CategorizeDataForm';
import { usePathname } from 'next/navigation';
import { reportsCardTableUncategorized } from '../../../dashboard/reports/reportsCardDatas';
import { ReportSummaryType, ReportType } from '../../../dashboard/reports/reportSummaryType';
import { useFindReport } from '@/app/hooks/useFindReport';

const ReportSingle = () => {

  const { uncategorizedData } = useFindReport (); 

  return (
    <div>
      <Header href="/cleaned-data" title="Data Info" />
      <div className="flex  gap-x-6">
        <ReportSummary  
          personAffected={ uncategorizedData?.summary?.personAffected }
          genderIdentity={ uncategorizedData?.summary?.genderIdentity }
          age={ uncategorizedData?.summary?.age }
          date={ uncategorizedData?.summary?.date }
          placeOfIncident={ uncategorizedData?.summary?.placeOfIncident }
          incidentDescription={ uncategorizedData?.summary?.incidentDescription }
          characteristic={ uncategorizedData?.summary?.characteristic }
          otherMesures={ uncategorizedData?.summary?.otherMesures }
        />
        {/* <ReportActions /> */}
        <CategorizeDataForm />
      </div>
    </div>
  );
};

export default ReportSingle;
