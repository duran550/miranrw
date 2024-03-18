import React from 'react';
import { OverviewCardProps } from './OverviewCard.d';
import Image from 'next/image';

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, title, value }) => {
  return (
    <div className="p-6 w-full rounded-xl border">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">{title}</h1>
        <Image src={icon} alt="Statistic icons" />
      </div>
      <h1 className="font-bold text-xl mt-2">{value}</h1>
    </div>
  );
};

export default OverviewCard;
