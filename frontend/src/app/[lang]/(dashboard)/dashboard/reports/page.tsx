import React, { Suspense, useState } from 'react';
import Reports from '../../common/components/reports/Reports';

const Page = () => {
  return (
    <Suspense>
      <Reports />
    </Suspense>
  );
};

export default Page;
