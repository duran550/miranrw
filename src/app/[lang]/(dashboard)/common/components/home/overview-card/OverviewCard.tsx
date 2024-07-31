import React from 'react';
import { OverviewCardProps } from './OverviewCard.d';
import Image from 'next/image';

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, title, value }) => {
  return (
    <div className="sm:p-6 p-2 w-full rounded-xl border bg-white">
      <div className="flex justify-between items-center">
        <h1 className="font-bold sm:text-base text-xs">{title}</h1>
        <Image src={icon} alt="Statistic icons" />
      </div>
      <h1 className="font-bold text-xl mt-2">{value}</h1>
    </div>
  );
};

export default OverviewCard;
