import React from 'react';
import OverviewCard from './overview-card/OverviewCard';
import ReportCard from '../report-card/ReportCard';
import Header from './header/Header';

import TotalReportsIcon from '../../../../../../../public/icons/dashboard/totalReportsIcon.svg';
import NewReportsIcon from '../../../../../../../public/icons/dashboard/newReportsIcon.svg';
import RecentActivitiesIcon from '../../../../../../../public/icons/dashboard/recentActivitiesIcon.svg';
import { Category } from '../report-card/reportCard.d';
import { reportType, reportType2 } from '@/utils/shared-types';

const HomeCleaner: React.FC<{
  report?: reportType2[];
  total: number;
  total_week: number;
}> = ({ report, total, total_week }) => {
  return (
    <div>
      <Header />
      <div className="flex gap-4">
        <OverviewCard
          icon={TotalReportsIcon}
          title="Total Reports"
          value={total.toString()}
        />
        <OverviewCard
          icon={NewReportsIcon}
          title="New reports (Last 7 days)"
          value={total_week.toString()}
        />
        <OverviewCard
          icon={RecentActivitiesIcon}
          title="Recent activities (Last 7 days)"
          value=""
        />
      </div>

      <div className="mt-8 h-[calc(100vh-400px)] overflow-y-auto">
        <h1 className="text-xl mb-4 font-bold">Recent reports</h1>
        <div className="w-full gap-y-4 flex flex-col">
          {report &&
            report.map((item) => (
              <ReportCard
                key={item._id}
                title={item._id ? item._id : 'PT0124'}
                date={item.updatedAt ? item.updatedAt : ''}
                href={`/en/dashboard/clean-data/${item._id}`}
                reportType={Category.Raw}
              />
            ))}
      
        </div>
      </div>
    </div>
  );
};

export default HomeCleaner;
