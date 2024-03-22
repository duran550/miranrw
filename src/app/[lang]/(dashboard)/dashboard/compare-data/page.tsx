'use client';
import React, { useState } from 'react';
import Loading from './loading';

const Page = () => {
  const [loading, setIsLoading] = useState(true);
  const handleIframeLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="mt-8">
      <h1 className="font-bold text-2xl mb-4">Compare data</h1>
      {loading && (
        <div className="w-full">
          <Loading />
        </div>
      )}
      <iframe
        onLoad={handleIframeLoaded}
        loading="lazy"
        src="https://winniemafouo.shinyapps.io/antid_miq/_w_716b033d/#!/compare"
        className="w-full h-screen"
      />
    </div>
  );
};

export default Page;
