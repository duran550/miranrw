'use client';

import { setShow } from '@/cookies/cookies';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const HiddeComponen = () => {
  const [code, setCode] = useState('');
  const pat = usePathname();
  useEffect(() => {
    if (code.length == 10 && code == 'at#4|IJj%2') {
      setShow('true');
      window.location.href =  '/';
    }
  }, [code]);
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-3">
      <h1 className="font-bold lg:text-xl">
        Put the code of 10 characters here to access the website
      </h1>
      <input
        type="text"
        className="h-14 md:w-full w-96 border-2 rounded-xl ms:text-sm  px-5 text-center"
        onChange={(e: any) => {
          setCode(e.target.value);
        }}
      />
      {code.length > 0 && code != 'at#4|IJj%2' && (
        <p className="text-red-900 text-sm">code incorrect</p>
      )}
    </div>
  );
};
export default HiddeComponen;
