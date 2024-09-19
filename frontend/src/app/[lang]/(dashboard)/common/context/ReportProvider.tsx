import { reportType } from '@/utils/shared-types';
import React from 'react';

const ReportContext = React.createContext({
  reports: [],
//   amount: 0,
  fillReport: (item:reportType[]) => {},
//   removeItem: (key) => {},
});
export default ReportContext;
