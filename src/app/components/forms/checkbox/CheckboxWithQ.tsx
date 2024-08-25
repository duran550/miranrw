import React, { useEffect, useRef, useState } from 'react';
import questionMark from '@/../public/icons/questionmark.svg';
import Image from 'next/image';

type CheckboxWithQProps = {
  name: string;
  id: string;
  value: string;
  label?: string;
  checked?: boolean;
  props: any;
};

const CheckboxWithQ: React.FC<CheckboxWithQProps> = ({
  name,
  id,
  value,
  label,
  checked,
  props,
}) => {
  return (
    <div key={id} className="p-2">
      <div className="flex items-center mr-4 mb-2">
        <input
          key={id}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          {...props}
          className="opacity-0 absolute h-6 w-6"
        />
        <div className="bg-white border border-primaryColor w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <svg
            className="fill-current hidden w-3 h-3 text-primaryColor pointer-events-none"
            fill="#000000"
            height="800px"
            width="800px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490 490"
          >
            <polygon
              points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
	489.292,457.678 277.331,245.004 489.292,32.337 "
            />
          </svg>
        </div>
        <label htmlFor={id} className="select-none ml-2 font-normal">
            <div className='flex gap-2'>
                {label}
                <Image src={questionMark} alt='questionmark' />
            </div>
        </label>
      </div>
    </div>
  );
};

export default CheckboxWithQ;
