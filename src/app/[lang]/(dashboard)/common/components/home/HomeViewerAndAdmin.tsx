import React from 'react';
import OverviewCard from './overview-card/OverviewCard';
import ReportCard from '../report-card/ReportCard';
import Header from './header/Header';

import TotalReportsIcon from '../../../../../../../public/icons/dashboard/totalReportsIcon.svg';
import NewReportsIcon from '../../../../../../../public/icons/dashboard/newReportsIcon.svg';
import RecentActivitiesIcon from '../../../../../../../public/icons/dashboard/recentActivitiesIcon.svg';
import { Category } from '../report-card/reportCard.d';

const HomeViewerAndAdmin = () => {
  return (
    <div className="mt-8">
      <Header />
      <div className="flex gap-4">
        <OverviewCard
          icon={TotalReportsIcon}
          title="Total cleaned"
          value="300"
        />
        <OverviewCard
          icon={NewReportsIcon}
          title="Last cleaned (Last 7 days)"
          value="50"
        />
        <OverviewCard
          icon={RecentActivitiesIcon}
          title="Recent activities (Last 7 days)"
          value="+15%"
        />
      </div>

      <div className="mt-8">
        <h1 className="text-xl mb-4 font-bold">Recent reports</h1>
        <div className="w-full gap-y-4 flex flex-col">
          <ReportCard
            href="/en/dashboard/cleaned-reports/PT1024"
            reportType={Category.Uncategorized}
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            href="/en/dashboard/cleaned-reports/PT1025"
            reportType={Category.Uncategorized}
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            href="/en/dashboard/cleaned-reports/PT1026"
            reportType={Category.Uncategorized}
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            href="/en/dashboard/cleaned-reports/PT1027"
            reportType={Category.Uncategorized}
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeViewerAndAdmin;
