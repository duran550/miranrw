import React from 'react';
import { ReportCardProps } from './reportCard.d';

const ReportCard: React.FC<ReportCardProps> = ({ date, reportType, title }) => {
  return (
    <div className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-300">
      <div>
        <h1 className="font-bold mb-2">{title}</h1>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
      <div className="rounded-full bg-gray-200 px-3 py-2 text-sm">
        {'Uncategorized'}
      </div>
    </div>
  );
};

export default ReportCard;
