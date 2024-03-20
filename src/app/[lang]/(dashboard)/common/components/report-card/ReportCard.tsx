import React from 'react';
import { Category, ReportCardProps } from './reportCard.d';

export const getColorByReportType = (reportType: string) => {
  switch (reportType) {
    case Category.Cleaned:
      return ['#199A46', 'rgba(25, 154, 70, 0.2)'];
    case Category.Raw:
      return ['#E00034', 'rgba(224, 0, 52, 0.2)'];
    case Category.Irrelevant:
      return ['#F36D38', 'rgba(243, 109, 56, 0.2)'];
    case Category.Dangerous:
      return ['#FF0505', 'rgba(255, 5, 5, 0.2)'];
    case Category.Uncategorized:
      return ['#E00034', 'rgba(224, 0, 52, 0.2)'];
    case Category.Categorized:
      return ['#199A46', 'rgba(25, 154, 70, 0.2)'];
    case Category.Managed:
      return ['#199A46', 'rgba(25, 154, 70, 0.2)'];

    default:
      return [''];
  }
};

const ReportCard: React.FC<ReportCardProps> = ({ date, reportType, title }) => {
  let colors: string[] = getColorByReportType(reportType);
  return (
    <div className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-300">
      <div>
        <h1 className="font-bold mb-2">{title}</h1>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
      <div
        style={{ backgroundColor: `${colors[1]}`, color: `${colors[0]}` }}
        className="rounded-full  px-3 py-2 text-sm"
      >
        {reportType}
      </div>
    </div>
  );
};

export default ReportCard;
