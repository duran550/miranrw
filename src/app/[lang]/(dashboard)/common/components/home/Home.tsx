'use client';
import { useAuth } from '@/app/hooks/useAuth';
import React from 'react';
import OverviewCard from './overview-card/OverviewCard';
import ReportCard from '../report-card/ReportCard';

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl flex font-bold mb-8">
        Good morning, <h1 className="text-primary ml-2">{user?.fullname}</h1>
      </h1>
      <div className="flex gap-4">
        <OverviewCard icon="" title="Total cleaned" value="300" />
        <OverviewCard icon="" title="Last cleaned" value="50" />
        <OverviewCard icon="" title="Recent activities" value="+15%" />
      </div>

      <div className="mt-8">
        <h1 className="text-xl mb-4 font-bold">Recent reports</h1>
        <div className="w-full gap-y-4 flex flex-col">
          <ReportCard
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
          <ReportCard
            date="Tuesday, 7 September 2023, 20h45 "
            title="Data 001100111"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
