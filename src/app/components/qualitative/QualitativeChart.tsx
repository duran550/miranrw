import React, { useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';

const QualitativeChart = () => {
    const [loading, setIsLoading] = useState(true);
    const { user } = useAuth();
  
    const handleIframeLoaded = () => {
      setIsLoading(false);
    };
  console.log(user);
  return (
    <div>
         <iframe
        onLoad={handleIframeLoaded}
        loading="lazy"
        src={"https://dashboard.kaeyros.org/#!/qualitative?token="+user?.token}
        className="w-full h-screen"
      />
    </div>
  )
}

export default QualitativeChart