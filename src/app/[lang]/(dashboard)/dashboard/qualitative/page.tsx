'use client';
import React, { useState } from 'react';
import Loading from './loading';
import { useAuth } from '@/app/hooks/useAuth';

const Page = () => {
  const [loading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const handleIframeLoaded = () => {
    setIsLoading(false);
  };
console.log(user);

  return (
    <div className="mt-8">
      {/* {loading && (
        <div className="w-full">
          <Loading />
        </div>
      )} */}
      <iframe
        onLoad={handleIframeLoaded}
        loading="lazy"
        src={"https://dashboard.kaeyros.org/#!/qualitative?token="+user?.token}
        className="w-full h-screen"
      />
    </div>
  );
};

export default Page;
