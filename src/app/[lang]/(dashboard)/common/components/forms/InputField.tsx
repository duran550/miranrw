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

const InputField: React.FC<InputFieldProps> = ({
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
    <div className="mt-3">
      {change && (
        <>
          <label className="text-sm font-bold text-gray-700 mb-2" htmlFor={id}>
            {title ? title : ''}
          </label>
          <div className="relative w-full ">
            {icon ? (
              <div className="absolute mr-10 text-gray-400 inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
                {icon}
              </div>
            ) : (
              ''
            )}

            {!icon && img ? (
              <Image
                className="absolute h-[80%] top-[10%] left-[3%] mr-10 "
                src={img}
                alt=""
              />
            ) : (
              ''
            )}

            <input
              name={name}
              type={type}
              {...props}
              id={id ? id : name}
              disabled={disabled}
              value={value}
              className={` ${
                isValid
                  ? 'border-red-600 bg-red-100'
                  : 'boder-[#E9ECEF] bg-[#E9ECEF] '
              } pl-12 sm:py-4 py-3 text-base focus:outline-none focus:ring-1 sm:text-sm focus:ring-emerald-500 text-gray-900 rounded-xl block w-full  p-2.5 placeholder:text-sm sm:placeholder:text-lg appearance-none	`}
              placeholder={placeholder}
              // required
              min={min ? min : ''}
              max={max ? max : ''}
              onChange={change}
            />
          </div>
        </>
      )}

      {!change && (
        <>
          <label className="text-sm font-bold text-gray-700 mb-2" htmlFor={id}>
            {title ? title : ''}
          </label>
          <div className="relative w-full ">
            {icon ? (
              <div className="absolute mr-10 text-gray-400 inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
                {icon}
              </div>
            ) : (
              ''
            )}

            {!icon && img ? (
              <Image
                className="absolute h-[80%] top-[10%] left-[3%] mr-10 "
                src={img}
                alt=""
              />
            ) : (
              ''
            )}

            <input
              name={name}
              type={type}
              {...props}
              id={id}
              disabled={disabled}
              value={value}
              className={` ${
                isValid
                  ? 'border-red-600 bg-red-100'
                  : 'boder-[#E9ECEF] bg-[#E9ECEF] '
              } pl-12 sm:py-4 py-3 text-base focus:outline-none focus:ring-1 sm:text-sm focus:ring-primary text-gray-900 rounded-xl block w-full  p-2.5 placeholder:text-sm sm:placeholder:text-lg appearance-none	`}
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

export default InputField;
