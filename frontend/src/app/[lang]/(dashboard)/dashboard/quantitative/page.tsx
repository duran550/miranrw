import React, { useState } from 'react';
import QuantitiveChart from '@/app/components/quantiative/QuantitiveChart';

const Page = () => {

  return (
    <div className="mt-8">
      <h1 className="font-bold text-2xl mb-4">Quantitative data</h1>
      <QuantitiveChart />
      {/* {(loading && (
        <div className="w-full">
          <Loading />
        </div>
      )) || (
        
      )} */}
    </div>
  );
};

export default Page;
