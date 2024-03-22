'use client';
import React, { useContext, useEffect, useState } from 'react';
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
import { AdminContext } from '../../context/AdminContext';

const ReportSingle = () => {
  const { uncategorizedData } = useFindReport();
  const { user } = useAuth();
  const { state } = useContext(AdminContext);

  return (
    <div className="mb-[2rem]">
      <Header href="/cleaned-data" title="Data Info" />
      <div className="flex  gap-x-6 h-full">
        {/* <ReportSummary
          personAffected={uncategorizedData?.summary?.personAffected}
          genderIdentity={uncategorizedData?.summary?.genderIdentity}
          age={uncategorizedData?.summary?.age}
          date={uncategorizedData?.summary?.date}
          placeOfIncident={uncategorizedData?.summary?.placeOfIncident}
          incidentDescription={uncategorizedData?.summary?.incidentDescription}
          characteristic={uncategorizedData?.summary?.characteristic}
          otherMesures={uncategorizedData?.summary?.otherMesures}
        /> */}
        <ReportSummary incidentDescription={state.cleanerDesc} />
        {user?.role === Role.CLEANER ? (
          <ReportActions
            WhatHappened={uncategorizedData?.summary.incidentDescription}
          />
        ) : (
          <CategorizeDataForm />
        )}
      </div>
    </div>
  );
};

export default ReportSingle;
