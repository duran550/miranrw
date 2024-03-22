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
      {loading && (
        <div className="w-full">
          <Loading />
        </div>
      )}
      <iframe
        onLoad={handleIframeLoaded}
        loading="lazy"
        src="https://winniemafouo.shinyapps.io/antid_miq/_w_716b033d/#!/qualitative"
        className="w-full h-screen"
      />
    </div>
  );
};

export default Page;
