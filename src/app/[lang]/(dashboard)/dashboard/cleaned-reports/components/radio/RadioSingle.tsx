import React from 'react';

type RadioSingleProps = {
  id: number;
  props: any;
  value?: string;
  label: string;
  name: string;
};

const RadioSingle: React.FC<RadioSingleProps> = ({
  name,
  id,
  label,
  props,
  value,
}) => {
  return (
    <div key={id} className="flex items-center">
      <input
        {...props}
        id={`${id}`}
        type="radio"
        value={value}
        name={name}
        className={` w-6 h-6 text-primaryColor bg-gray-100 focus:ring-PrimaryColor  dark:ring-offset-gray-800 focus:ring-2`}
      />
      {label && (
        <label
          htmlFor={id.toString()}
          className="w-full py-3 ml-4 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioSingle;
