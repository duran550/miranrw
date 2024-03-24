'use client';
import React from 'react';
import Header from './Header';
import ReportSummary from './reports-cleaner/report-summary/ReportSummary';
import ReportActions from './reports-cleaner/report-actions/ReportActions';

const ReportSingle = () => {
  return (
    <div>
      <Header href="/cleaned-data" title="Data Info" />

      <div className="flex  gap-x-6">
        <ReportSummary />
        {/* <ReportActions /> */}
      </div>
    </div>
  );
};

export default ReportSingle;
