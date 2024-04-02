import React from 'react';
import OverviewCard from './overview-card/OverviewCard';
import ReportCard from '../report-card/ReportCard';
import Header from './header/Header';

import TotalReportsIcon from '../../../../../../../public/icons/dashboard/totalReportsIcon.svg';
import NewReportsIcon from '../../../../../../../public/icons/dashboard/newReportsIcon.svg';
import RecentActivitiesIcon from '../../../../../../../public/icons/dashboard/recentActivitiesIcon.svg';
import { Category } from '../report-card/reportCard.d';
import { reportType } from '@/utils/shared-types';

const HomeRiskManager: React.FC<{ report?: reportType[] }> = ({ report }) => {
  return (
    <div>
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
          {report &&
            report.map((item) => (
              <ReportCard
                key={item._id}
                title={item._id ? item._id : 'PT0124'}
                date={item.createdAt ? item.createdAt : ''}
                href={`/dashboard/dangerous-reports/${item._id}`}
                reportType={
                  item.status == 'Dangerous'
                    ? Category.Dangerous
                    : Category.Managed
                }
              />
            ))}
          {/* <ReportCard
            reportType={Category.Dangerous}
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            reportType={Category.Dangerous}
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            reportType={Category.Dangerous}
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            reportType={Category.Dangerous}
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default HomeRiskManager;
