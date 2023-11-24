import React, { useEffect, useState } from 'react';
import CompletedAnimatedIcon from '../../../../../public/icons/completedIcon.gif';
import CompletedStaticIcon from '../../../../../public/icons/completedIconStatic.svg';
import Image from 'next/image';

const CompletedIconAnimated = () => {
  const [animate, setAnimate] = useState<boolean>(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAnimate(false);
    }, 1300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [animate]);

  return (
    <>
      {animate ? (
        <Image
          className="w-8"
          src={CompletedAnimatedIcon}
          alt="Completed animated icon"
        />
      ) : (
        <Image
          className="transition-all w-8 ease-in-out duration-300"
          src={CompletedStaticIcon}
          alt="Completed static icon"
        />
      )}
    </>
  );
};

export default CompletedIconAnimated;
