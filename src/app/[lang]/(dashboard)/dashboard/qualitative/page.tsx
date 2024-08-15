'use client';
import React, { useState } from 'react';
import QuantitiveChart from '@/app/components/quantiative/QuantitiveChart';

const Page = () => {

  return (
    <div className="mt-8">
      <QuantitiveChart />
      {/* {loading && (
        <div className="w-full">
          <Loading />
        </div>
      )} */}
    </div>
  );
};

export default Page;
