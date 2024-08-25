import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../../loaders/spinner/Spinner';
import CompletedIconAnimated from '../../loaders/completedIcon/CompletedIconAnimated';

type CaptchaCheckbox = {
  name: string;
  id: string;
  value: string;
  label?: string;
  checked?: boolean;
  loading: boolean;
  props: any;
};

const CaptchaCheckbox: React.FC<CaptchaCheckbox> = ({
  name,
  id,
  value,
  label,
  checked,
  loading,
  props,
}) => {
  return (
    <div key={id} className="p-4 flex items-center">
      <div className="flex items-center mr-4">
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
        {checked ? (
          <div className="bg-white  w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 ">
            {loading ? <Spinner /> : <CompletedIconAnimated />}
          </div>
        ) : (
          <div className="bg-white border border-primaryColor w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
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
        )}

        <label htmlFor={id} className="select-none ml-2">
          {label}
        </label>
      </div>
    </div>
  );
};

export default CaptchaCheckbox;
