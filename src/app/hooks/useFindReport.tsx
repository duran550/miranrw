'use client';

import { useState } from 'react';
import { ReportType } from '../[lang]/(dashboard)/dashboard/reports/reportSummaryType';
import { reportsCardTableUncategorized } from '../[lang]/(dashboard)/dashboard/reports/reportsCardDatas';
import { usePathname } from 'next/navigation';

export const useFindReport = () => {
  const pathName = usePathname();
  const [reportCarData] = useState(reportsCardTableUncategorized);
  const uncategorizedData: ReportType | any = reportCarData.find(
    (report) =>
      report?.id === pathName.split('/')[pathName.split('/').length - 1]
  );
  return { uncategorizedData };
};
