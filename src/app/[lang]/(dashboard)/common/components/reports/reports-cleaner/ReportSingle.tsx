import Link from 'next/link';
import React from 'react';
import Header from '../Header';
import ReportSummary from './report-summary/ReportSummary';
import ReportActions from './report-actions/ReportActions';

const ReportSingle = () => {
  return (
    <div>
      <Header href="/clean-data" title="Data Info" />

      <div className="flex  gap-x-6">
        <ReportSummary />
        <ReportActions />
      </div>
    </div>
  );
};

export default ReportSingle;
