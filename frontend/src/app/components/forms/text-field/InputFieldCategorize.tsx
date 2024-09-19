import Image from 'next/image';
import React from 'react';

type InputFieldProps = {
  type?: string;
  title?: string;
  id?: string;
  placeholder?: string;
  name: string;
  icon?: any;
  props?: any;
  value?: any;
  disabled?: boolean;
  img?: any;
  isValid?: boolean;
  min?: string;
  max?: string;
  change?: any;
};

const InputFieldCategorize: React.FC<InputFieldProps> = ({
  type,
  icon,
  title,
  name,
  id,
  placeholder,
  props,
  value,
  disabled,
  img,
  isValid,
  min,
  max,
  change,
}) => {
  return (
    <div className="">
      {!change && (
        <>
          <label className="text-sm font-medium h-9 mb-2 overflow-hidden" htmlFor={id}>
            {title ? title : ''}
          </label>
                  <div className="relative w-full border border-[#BABCD4] rounded-[4px] ">
                      {icon && <Image src={icon} alt='' className='absolute h-5 top-2 left-2'/>}
            <input
              name={name}
              type={type}
              {...props}
              id={id}
              disabled={disabled}
              value={value}
              className={` ${
                isValid ? 'border-red-600 bg-red-100' : 'boder-[#E9ECEF]  '
              } ${icon ? "pl-8" : "pl-2"}  text-base h-full focus:outline-none focus:ring-1 sm:text-sm focus:ring-primary  text-gray-900 rounded-lg block w-full  p-2.5 placeholder:text-sm 	`}
              placeholder={placeholder}
              // required
              min={min ? min : ''}
              max={max ? max : ''}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default InputFieldCategorize;
