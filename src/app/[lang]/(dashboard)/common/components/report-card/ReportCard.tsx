import React from 'react';
import { Category, ReportCardProps } from './reportCard.d';
import Link from 'next/link';

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

const ReportCard: React.FC<ReportCardProps> = ({
  date,
  reportType,
  title,
  href,
}) => {
  let colors: string[] = getColorByReportType(reportType);
  return (
    <Link
      href={href ? `${href}` : ''}
      className="border bg-white h-fit flex items-center  justify-between xl:p-3 p-2 rounded-xl  border-gray-300 2xl:w-[450px] xl:w-[500px] lg:w-[360px] sm:w-[300px] w-full  gap-3"
    >
      <div className=" sm:max-w-none max-w-[130px]">
        <h1 className="font-bold mb-2 2xl:text-base s truncate lg:text-sm  text-xs">
          {title}
        </h1>
        <p className="text-gray-500 2xl:text-sm text-xs truncate">{date}</p>
      </div>
      <span
        style={{ backgroundColor: `${colors[1]}`, color: `${colors[0]}` }}
        className="rounded-full  2xl:px-3 px-2 py-2 2xl:text-sm text-xs"
      >
        {reportType}
      </span>
    </Link>
  );
};

export default ReportCard;
