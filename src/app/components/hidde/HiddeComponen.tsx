'use client';

import { setShow } from '@/cookies/cookies';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const HiddeComponen = () => {
  const [code, setCode] = useState('');
  const pat = usePathname();
  useEffect(() => {
    if (code == 'mi*$at#4|IJjQar%2') {
      setShow('true');
      window.location.href = '/';
    }
  }, [code]);
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-3 sm:w-[500px] w-full">
      <h1 className="font-bold lg:text-xl text-center">Password</h1>
      <input
        type="text"
        className="h-14 w-full border-2 rounded-xl ms:text-sm  px-5 text-center"
        onChange={(e: any) => {
          setCode(e.target.value);
        }}
      />
      {code.length > 0 && code != 'mi*$at#4|IJjQar%2' && (
        <p className="text-red-900 text-sm">code incorrect</p>
      )}
    </div>
  );
};
export default HiddeComponen;
